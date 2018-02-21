import React from 'react'
import { Link } from 'react-router-dom';

import Nav from '../Nav';
import Banner from '../Banner';
import LogInForm from '../LogInForm';

import { auth } from '../../base';
import { findVenueByOwner, createRandomNewVenue, logOut } from '../../helpers';
import { Redirect } from 'react-router';

class LogIn extends React.Component {

	constructor() {
		super();

		this.updateUserandVenueState = this.updateUserandVenueState.bind(this);

		this.state = {
			user: '',
			fireRedirect: ''
		}
	}

	updateUserandVenueState = (user) => {
		if (!user) return
		this.setState({ user });
		const venue = findVenueByOwner(user);
		venue.once('value', snap => {
			if (!snap.val()) return; // no venue found for user
			const venue = snap.val()[Object.keys(snap.val())[0]];
			const fireRedirect = `/admin/${venue.id}`;
			this.setState({ fireRedirect });
		});
	}

	componentWillMount() {
		auth.onAuthStateChanged(this.updateUserandVenueState)
	}

	render() {
		const fireRedirect = this.state.fireRedirect;
		return (
			<div className="container" >
				<Nav user={this.state.user} venueId={this.state.venueId} />
				<div className="container--single-column max-width--420 margin-auto">
					<Banner text="Sign In:" />
					<LogInForm />
					<div className="container__info">
						<p>Log in to manage your band/venue. To register, click <Link to={`/admin/signup`}>here</Link>.</p>
					</div>
				</div>
				{fireRedirect && (
					<Redirect to={fireRedirect} />
				)}
			</div>
		)
	}
}

export default LogIn;