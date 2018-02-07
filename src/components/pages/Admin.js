import React from 'react';
import { Link } from 'react-router-dom';

import { Divider } from 'antd';
import uniqid from 'uniqid';

// epoch?

import Nav from '../Nav';
import Banner from '../Banner';
import LogInForm from '../LogInForm';
import EventForm from '../EventForm';

import base, { auth } from '../../base';
import { togLog } from '../../helpers'

class Admin extends React.Component {

	constructor() {
		super();

		this.toggleLogin = this.toggleLogin.bind(this);
		this.renderEvent = this.renderEvent.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.updateVenueInfo = this.updateVenueInfo.bind(this);

		this.state = {
			venue: '',
			user: '',
		}
	}

	componentWillMount() {
		auth.onAuthStateChanged((user) => {
			this.setState({ user });
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

	toggleLogin() {
		const user = togLog(this.state.user);		
		this.setState({ user });
	}

	renderLogin() {
		return (
			<div className="container">
				<Nav />
				<Banner text="Log In:"/>
				<LogInForm toggleLogin={this.toggleLogin} />
			</div>
		)
	}

	renderEvent(key) {
		const { date, title } = this.state.venue.events[key];
		return(
			<div className="event--container" key={key}>
				<div className="event--info">{date} {title}</div>
				<div className="event--button" onClick={() => this.removeEvent(key)}></div>
			</div>
		)
	}

	addEvent(formObj) {
		const venue = {...this.state.venue};
		if (!venue.events) venue.events = {};
		venue.events[uniqid()] = formObj;
		this.setState({ venue });
	}

	removeEvent(key) {
		const venue = {...this.state.venue};
		venue.events[key] = null;
		this.setState({ venue });
	}

	updateVenueInfo(e) {
		const venue = {...this.state.venue};
		venue[e.target.name] = e.target.value;
		this.setState({ venue });
	}

	render() {
		
		const logout = <button className="button--logout" onClick={this.logOut}>{'Log Out >>'}</button>

		// check if not logged in
		if (!this.state.user) {
			return <div>{this.renderLogin()}</div>
		}
		
		// check if user is owner of store
		if(this.state.venue && this.state.user.uid === this.state.venue.owner) {
			return (
				<div className="container--admin">
					<Nav user={this.state.user} toggleLogin={this.toggleLogin}/>
					<div className="subcontainer--info">
						<Banner text="Edit Info:" />
						<div className="form-container">
							<label>Edit band/venue name:</label>
							<input type="textbox" defaultValue={this.state.venue.name} name="name" onChange={this.updateVenueInfo}></input>
							<div className="space-md"></div>
							<label>Edit band/venue passcode:</label>
							<input type="textbox" defaultValue={this.state.venue.code} name="code" onChange={this.updateVenueInfo}></input>
							<div className="space-md"></div>
							<Divider />
							<label>Manage events:</label>
							{this.state.venue.events && Object.keys(this.state.venue.events).map(this.renderEvent)}
							<div className="space-md"></div>
							<EventForm addEvent={this.addEvent}/>
							<Divider />
						</div>
					</div>
					<div className="subcontainer--pending">
						<Banner text="Pending:" />
						<div className="form-container">
							<p>none yet!</p>
						</div>
					</div>
					<div className="subcontainer--done">
						<Banner text="Done:" />
						<div className="form-container">
							<p>none yet!</p>
						</div>
					</div>
				</div>
			)
		}

		return(
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