import React from 'react';
import { Link } from 'react-router-dom';

import { Divider } from 'antd';
import uniqid from 'uniqid';

// epoch?

import Nav from '../Nav';
import Banner from '../Banner';
import LogInForm from '../LogInForm';
import EventInfo from '../EventInfo';
import EventForm from '../EventForm';
import PendingComps from '../PendingComps';
import ApprovedComps from '../ApprovedComps';

import base, { auth } from '../../base';
import { findVenueByOwner } from '../../helpers';

class Admin extends React.Component {

	constructor() {
		super();

		this.renderEvent = this.renderEvent.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.updateVenueInfo = this.updateVenueInfo.bind(this);
		this.updateComp = this.updateComp.bind(this);

		this.state = {
			venue: '',
			user: '',
		}
	}

	componentWillMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
				const venue = findVenueByOwner(user);
				venue.once('value', snap => {
					this.setState({ venue: snap.val()[Object.keys(snap.val())[0]] });
				})
			}
		});

		this.ref = base.syncState(`venues/${this.props.match.params.venueId}`
			, {
				context: this,
				state: 'venue'
			});

	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	renderLogin() {
		return (
			<div className="container">
				<Nav />
				<Banner text="Log In:" />
				<LogInForm />
			</div>
		)
	}

	renderEvent(key) {
		const { date, title } = this.state.venue.events[key];
		return (
			<div className="event--container" key={key}>
				<div className="event--info">{date} {title}</div>
				<div className="event--button" onClick={() => this.removeEvent(key)}></div>
			</div>
		)
	}

	addEvent(formObj) {
		const venue = { ...this.state.venue };
		if (!venue.events) venue.events = {};
		venue.events[uniqid()] = formObj;
		this.setState({ venue });
	}

	removeEvent(key) {
		const venue = { ...this.state.venue };
		venue.events[key] = null;
		this.setState({ venue });
	}

	updateVenueInfo(venue) {
		this.setState({ venue });
	}

	updateComp(key, newStatus) {
		const venue = { ...this.state.venue };
		venue.comps[key].status = newStatus;
		this.setState({ venue });
	}

	render() {

		const logout = <button className="button--logout" onClick={this.logOut}>{'Log Out >>'}</button>

		// check if not logged in
		if (!this.state.user) {
			return <div>{this.renderLogin()}</div>
		}

		// check if user is owner of store
		if (this.state.venue && this.state.user.uid === this.state.venue.owner) {
			return (
				<div className="container--admin">
					<Nav user={this.state.user} toggleLogin={this.toggleLogin} />
					<div className="subcontainer--info">
						<Banner text="Edit Info:" />
						<div className="form-container">
							<EventInfo venue={this.state.venue} updateVenueInfo={this.updateVenueInfo} />
							<Divider />
							<label>Manage events:</label>
							{this.state.venue.events && Object.keys(this.state.venue.events).map(this.renderEvent)}
							<div className="space-md"></div>
							<EventForm addEvent={this.addEvent} />
							<Divider />
						</div>
					</div>
					<PendingComps updateComp={this.updateComp} comps={this.state.venue.comps} events={this.state.venue.events} />
					<div className="subcontainer--done">
						<Banner text="Done:" />
						<div className="form-container">
							<ApprovedComps updateComp={this.updateComp} comps={this.state.venue.comps} events={this.state.venue.events} />
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className="container">
				<div className="container__info">
					<p>Sorry, you are not an admin of this band or venue! Click <Link to={`/`}>here</Link> to request comps.</p>
					{logout}
				</div>
			</div>
		)

	}
}

export default Admin;