import React from 'react';
import { Link } from 'react-router-dom';

import { DatePicker, Input } from 'antd';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Nav from '../Nav';
import Banner from '../Banner';
import LogInForm from '../LogInForm';

import { auth, provider } from '../../base';
import { findOwnerByVenue, togLog } from '../../helpers'

class Admin extends React.Component {

	constructor() {
		super();

		this.toggleLogin = this.toggleLogin.bind(this);
		this.renderEvent = this.renderEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			startDate: moment(),
			venue: '',
			user: '',
		}
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			this.setState({ user });
		});
		const owner = findOwnerByVenue(this.props.match.params.venueId);
		owner.once('value', snap => {
			const venue = snap.val()[Object.keys(snap.val())[0]];
			this.setState({ venue });
		});
	}

	toggleLogin() {
		const user = togLog(this.state.user);		
		this.setState({ user });
	}

	renderLogin() {
		const text = '';
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
		if(this.state.venue && this.state.user.uid === this.state.venue.owner) {
			return (
				<div className="container--admin">
					<Nav user={this.state.user} toggleLogin={this.toggleLogin}/>
					<div className="subcontainer--info">
						<Banner text="Edit Info:" />
						<div className="form-container">
							<label>Edit band/venue name:</label>
							<input type="textbox" defaultValue={this.state.venue.name}></input>
							<div className="space-md"></div>
							<label>Edit band/venue passcode:</label>
							<input type="textbox" placeholder="(set this to invite users)"></input>
							<div className="space-md"></div>
							<label>Manage events:</label>
							{Object.keys(this.state.venue.events).map(this.renderEvent)}
							<div className="space-md"></div>
							<label>Add new event:</label>
							<DatePicker size="large" className="new-date" selected={this.state.startDate} onChange={this.handleChange} />
							<Input size="large" className="new-date" type="textbox" placeholder="Name of event"></Input>
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