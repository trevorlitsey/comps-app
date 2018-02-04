import React from 'react';
import { Link } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Banner from '../Banner';
import LogInForm from '../LogInForm';

import base, { auth, provider } from '../../base';
import { findVenueOwner } from '../../helpers'

class Admin extends React.Component {

	constructor() {
		super();

		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
		this.renderEvent = this.renderEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			startDate: moment(),
			venue: null,
			user: null,
		}
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			const owner = findVenueOwner(this.props.match.params.venueId);
			owner.once('value', snap => {
				
				const venue = snap.val()[Object.keys(snap.val())[0]];
				
				this.setState({
					user,
					venue
				 });
			});
			
			if (user) {

			} 
		});
	}

	logIn() {
		auth.signInWithPopup(provider)
			.then((result) => {
				const user = result.user;				
				this.setState({ user });
			});
	}

	logOut() {
		auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
	}

	renderLogin() {
		return (
			<div className="container">
				<Banner text="Sign In:"/>
				<LogInForm logIn={this.logIn} />
			</div>
		)
	}

	renderEvent(key) {
		
		const { date, title } = this.state.venue.events[key];
		console.log({ date, title });
		
		return(
			<div className="event--container">
				<div className="event--info">{date} {title}</div>
				<div className="event--button"></div>
			</div>
		)
	}

	handleChange(date) {
    this.setState({
      startDate: date
    });
  }

	render() {
		
		const logout = <button className="button--logout" onClick={this.logOut}>{'Log Out >>'}</button>

		// check if not logged in
		if (!this.state.user) {
			return <div>{this.renderLogin()}</div>
		}

		// check if user is owner of store
		if(this.state.user.uid !== this.state.venue.owner) {
			return(
			<div className="container">
				<div className="container__info">
					<p>Sorry, you are not an admin of this band or venue! Click <Link to={`/`}>here</Link> to request comps.</p>
					{logout}
				</div>
			</div>
			)
		}

		return (
			<div className="container">
				<Banner text="Edit Info:" />
				<div className="form-container">
					<label>Edit band/venue name:</label>
					<input type="textbox" value={this.state.venue.name}></input>
					<div className="space-md"></div>
					<label>Edit band/venue passcode:</label>
					<input type="textbox" placeholder="(set this to invite users)"></input>
					<div className="space-md"></div>
					<label>Manage events:</label>
					{Object.keys(this.state.venue.events).map(this.renderEvent)}
					<div className="space-md"></div>
					<label>Add new event:</label>
					<DatePicker className="new-date" selected={this.state.startDate} onChange={this.handleChange} />
					<input className="new-date" type="textbox" placeholder="hollywood bowl"></input>
					<div className="space-md"></div>
					<label>Pending comp requests:</label>
				</div>
				<div className="container__info">
					{logout}
				</div>
			</div>
		)
	}
}

export default Admin;