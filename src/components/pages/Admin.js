import React from 'react';
import { Link } from 'react-router-dom';

import { Divider } from 'antd';
import uniqid from 'uniqid';

import AdminRadio from '../AdminRadio'
import Banner from '../Banner';
import LogInForm from '../LogInForm';
import EventInfo from '../EventInfo';
import AddEventForm from '../AddEventForm';
import EditEventForm from '../EditEventForm';
import PendingComps from '../PendingComps';
import ApprovedComps from '../ApprovedComps';

import base, { auth } from '../../base';
import { findVenueByOwner, formatDateFromEpoch } from '../../helpers';

class Admin extends React.Component {

	constructor() {
		super();

		this.renderEvent = this.renderEvent.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.removeEvent = this.removeEvent.bind(this);
		this.updateEvent = this.updateEvent.bind(this);
		this.updateVenueInfo = this.updateVenueInfo.bind(this);
		this.updateComp = this.updateComp.bind(this);
		this.changeView = this.changeView.bind(this);

		this.state = {
			venue: '',
			user: '',
			view: 'pending',
			eventToEdit: '',
			currentTotals: ''
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

		// check page last viewed
		const localStorageRef = localStorage.getItem(`view-${this.props.match.params.venueId}`);

		if (localStorageRef) {
			// update app component's order state
			this.setState({ view: JSON.parse(localStorageRef) })
		}
	}

	componentWillUpdate(nextProps, nextState) {

		// update running approved comp totals
		if (nextState.venue) {
			const currentTotals = {}
			Object.keys(nextState.venue.events).forEach(key => {
				currentTotals[key] = {
					count: 0,
					limit: nextState.venue.events[key].limit
				}
			});
			Object.keys(nextState.venue.comps)
				.forEach(key => {
					const { status, event, quant } = { ...nextState.venue.comps[key] };
					if (status === "a") currentTotals[event].count += quant;
				});
			nextState.currentTotals = currentTotals;
		}

		// store current view in local storage
		localStorage.setItem(`view-${this.props.match.params.venueId}`,
			JSON.stringify(nextState.view));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	renderLogin() {
		return (
			<div className="container">
				<Banner text="Log In:" />
				<LogInForm />
			</div>
		)
	}

	renderEvent(key) {
		const { date, title, limit } = this.state.venue.events[key];
		if (this.state.eventToEdit === key) {
			return (
				<EditEventForm key={key} event={this.state.venue.events[this.state.eventToEdit]} removeEvent={this.removeEvent} updateEvent={this.updateEvent} />
			)
		} else {
			return (
				<div className="event--container" key={key}>
					<div className="event--info">{formatDateFromEpoch(date)} | {title} ({limit})</div>
					<div className="event--button" onClick={() => this.updateEventToEdit(key)}><a>edit</a></div>
				</div>
			)
		}
	}

	updateEventToEdit(eventToEdit) {
		this.setState({ eventToEdit })
	}

	updateEvent(updatedEvent, EventId) {
		const venue = { ...this.state.venue };
		venue.events[EventId] = updatedEvent;
		const eventToEdit = '';
		this.setState({ venue, eventToEdit })
	}

	addEvent(formObj, id = uniqid()) {
		const venue = { ...this.state.venue };
		if (!venue.events) venue.events = {};
		formObj.id = id;
		venue.events[id] = formObj;
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

	updateComp(id, newStatus) {
		const venue = { ...this.state.venue };
		venue.comps[id].status = newStatus;
		this.setState({ venue });
	}

	changeView(view) {
		this.setState({ view })
	}

	render() {

		const logout = <button className="button--logout" onClick={this.logOut}>{'Log Out >>'}</button>

		// check if not logged in
		if (!this.state.user) {
			return <div>{this.renderLogin()}</div>
		}

		// check if user is owner of store
		if (this.state.venue && this.state.user.uid === this.state.venue.owner) {

			const { view } = this.state;
			const pendingCount = Object.keys(this.state.venue.comps)
				.filter(key => this.state.venue.comps[key].status === "p")
				.length;


			if (view === "pending") {
				return (
					<div className="container--admin">
						<AdminRadio defaultView={this.state.view} changeView={this.changeView} pendingCount={pendingCount} />
						<PendingComps updateComp={this.updateComp} comps={this.state.venue.comps} events={this.state.venue.events} currentTotals={this.state.currentTotals} />
					</div>
				)
			}
			else if (view === "done") {
				return (
					<div className="container--admin">
						<AdminRadio defaultView={this.state.view} changeView={this.changeView} pendingCount={pendingCount} />
						<ApprovedComps updateComp={this.updateComp} comps={this.state.venue.comps} events={this.state.venue.events} currentTotals={this.state.currentTotals} />
					</div>
				)
			}
			else if (view === "info") {
				return (
					<div className="container--admin">
						<AdminRadio defaultView={this.state.view} changeView={this.changeView} pendingCount={pendingCount} />
						<div className="form-container">
							<EventInfo venue={this.state.venue} updateVenueInfo={this.updateVenueInfo} />
							<Divider />
							<label>Manage events:</label>
							{this.state.venue.events && Object.keys(this.state.venue.events).map(this.renderEvent)}
							<div className="space-md"></div>
							<label>Add event:</label>
							<AddEventForm addEvent={this.addEvent} />
						</div>
					</div>
				)
			}
		}

		// else
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