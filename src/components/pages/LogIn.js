import React from 'react'
import { Link } from 'react-router-dom';

import LogInForm from '../LogInForm';

import { auth } from '../../base';
import { togLog, findVenueByOwner } from '../../helpers';
import { Redirect } from 'react-router';

class LogIn extends React.Component {

	constructor() {
		super();

		this.toggleLogin = this.toggleLogin.bind(this);

		this.state = {
			user: '',
			fireRedirect: ''
		}

	}

	toggleLogin() {
		togLog();
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
				const venue = findVenueByOwner(this.state.user);
				venue.once('value', snap => {
					const obj = snap.val()
					const key = Object.keys(obj)[0];
					const slug = obj[key].slug;
					const fireRedirect = `/admin/${slug}`;
					this.setState({ fireRedirect });
				});
			}
		});
	}

	render() {
		const fireRedirect = this.state.fireRedirect;
		return (
			<div className="container">
				<LogInForm toggleLogin={this.toggleLogin} />
				<div className="container__info">
					<p>Log in manage band/venue comp requests. To sign up, click <Link to={`/signup`}>here</Link>.</p>
				</div>
				{fireRedirect && (
					<Redirect to={fireRedirect}/>
				)}
			</div>
		)
	}
}

export default LogIn;