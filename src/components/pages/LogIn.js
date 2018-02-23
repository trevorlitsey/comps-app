import React from 'react'
import createBrowserHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Nav from '../Nav';
import Banner from '../Banner';
import LogInForm from '../LogInForm';

import { auth } from '../../base';
import { findVenueByOwner, formatSingleValueFromSnap } from '../../helpers';

const history = createBrowserHistory();

class LogIn extends React.Component {

	constructor() {
		super();

		this.updateUserandVenueState = this.updateUserandVenueState.bind(this);

		this.state = {
			user: '',
			fireRedirect: '',
		}
	}

	updateUserandVenueState = async (user) => {
		if (!user) return // don't even bother
		this.setState({ user });

		const snap = await findVenueByOwner(user).once('value');
		if (snap.val()) {
			const venue = formatSingleValueFromSnap(snap);
			history.push('/');
			this.setState({ fireRedirect: `/admin/${venue.id}` });
		}
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