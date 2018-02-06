import React from 'react'

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
		const user = togLog();
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
				{fireRedirect && (
					<Redirect to={fireRedirect}/>
				)}
			</div>
		)
	}
}

export default LogIn;