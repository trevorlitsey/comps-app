import React from 'react';
import { Link } from 'react-router-dom';

import { Divider, message } from 'antd';
import uniqid from 'uniqid';

import Nav from '../Nav';
import AdminRadio from '../AdminRadio'
import Banner from '../Banner';
import LogInForm from '../LogInForm';
import EventList from '../EventList';
import EventInfo from '../EventInfo';
import AddEventForm from '../AddEventForm';
import PendingComps from '../PendingComps';
import ApprovedComps from '../ApprovedComps';

import base, { auth } from '../../base';
import { findVenueByOwner } from '../../helpers';

class Admin extends React.Component {

	constructor() {
		super();

		this.addEvent = this.addEvent.bind(this);
		this.removeEvent = this.removeEvent.bind(this);
		this.updateEventToEdit = this.updateEventToEdit.bind(this);
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
		auth.onAuthStateChanged(user => {
			this.setState({ user });
			if (user) {
				const venue = findVenueByOwner(user);
				venue.once('value', snap => {
					if (!snap.val()) return; // no venue found for user
					const venue = snap.val()[Object.keys(snap.val())[0]];
					this.setState({ venue });
				});
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
			nextState.venue.events && Object.keys(nextState.venue.events).forEach(key => {
				currentTotals[key] = {
					count: 0,
					limit: nextState.venue.events[key].limit
				}
			});
			nextState.venue.comps && Object.keys(nextState.venue.comps)
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

	componentWillUnmount = () =>
		base.removeBinding(this.ref);

	updateEventToEdit = eventToEdit =>
		this.setState({ eventToEdit });

	updateEvent(updatedEvent, eventId) {
		// confirm current comps don't exceed
		if (updatedEvent.limit < this.state.currentTotals[eventId].count) {
			return message.error('limit must be >= to currently approved requests')
		}

		const venue = { ...this.state.venue };
		venue.events[eventId] = updatedEvent;
		const eventToEdit = '';
		this.setState({ venue, eventToEdit })
		message.success(`event info updated`);
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

	updateVenueInfo = venue =>
		this.setState({ venue });

	updateComp(id, newStatus) {
		const venue = { ...this.state.venue };
		venue.comps[id].status = newStatus;
		this.setState({ venue });
	}

	changeView = view =>
		this.setState({ view });

	render() {

		const logout = <button className="button--logout" onClick={this.logOut}>{'Log Out >>'}</button>

		// check if not logged in
		if (!this.state.user) {
			return (
				<div className="container">
					<Nav />
					<div className="container--admin">
						<Banner text="Log In:" />
						<LogInForm />
					</div>
				</div>
			)
		}

		// check if user is owner of store
		if (this.state.venue && this.state.user.uid === this.state.venue.owner) {

			const { view } = this.state;
			const pendingCount = this.state.venue.comps && Object.keys(this.state.venue.comps)
				.filter(key => this.state.venue.comps[key].status === "p")
				.length;

			if (view === "pending") {
				return (
					<div className="container">
						<Nav user={this.state.user} venueId={this.state.venue.id} />
						<div className="container--admin">
							<AdminRadio defaultView={this.state.view} changeView={this.changeView} pendingCount={pendingCount} />
							<PendingComps updateComp={this.updateComp} comps={this.state.venue.comps} events={this.state.venue.events} currentTotals={this.state.currentTotals} />
						</div>
					</div>
				)
			}
			else if (view === "done") {
				return (
					<div className="container">
						<Nav user={this.state.user} venueId={this.state.venue.id} />
						<div className="container--admin">
							<AdminRadio defaultView={this.state.view} changeView={this.changeView} pendingCount={pendingCount} />
							<ApprovedComps updateComp={this.updateComp} comps={this.state.venue.comps} events={this.state.venue.events} currentTotals={this.state.currentTotals} />
						</div>
					</div>
				)
			}
			else if (view === "info") {
				return (
					<div className="container">
						<Nav user={this.state.user} venueId={this.state.venue.id} />
						<div className="container--admin">
							<AdminRadio defaultView={this.state.view} changeView={this.changeView} pendingCount={pendingCount} />
							<div className="form-container">
								<EventInfo venue={this.state.venue} updateVenueInfo={this.updateVenueInfo} />
								<Divider />
								<EventList events={this.state.venue.events} eventToEdit={this.state.eventToEdit} updateEventToEdit={this.updateEventToEdit} removeEvent={this.removeEvent} updateEvent={this.updateEvent} />
								<Divider />
								<div className="space-md"></div>
								<AddEventForm addEvent={this.addEvent} />
							</div>
						</div>
					</div>
				)
			}
		}

		// else
		return (
			<div className="container">
				<div className="container--single-column max-width--420 margin-auto">
					<div className="container__info">
						<p>Sorry, you are not an admin of this band or venue! Click <Link to={`/`}>here</Link> to request comps.</p>
						{logout}
					</div>
				</div>
			</div>
		)
	}
}

export default Admin;