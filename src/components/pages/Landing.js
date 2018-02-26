import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Nav';
import Banner from '../Banner';
import WelcomeForm from '../WelcomeForm';

import { auth } from '../../base';
import { findVenueByOwner } from '../../helpers';

class Landing extends React.Component {

	constructor() {
		super();

		this.state = {
			user: {},
			venueId: '',
		};
	}

	componentWillMount() {
		auth.onAuthStateChanged(user => {
			this.setState({ user });
			if (user) {
				const venue = findVenueByOwner(user);
				venue.once('value', snap => {
					if (!snap.val()) return; // no venue found
					this.setState({ venueId: snap.val()[Object.keys(snap.val())[0]].id });
				})
			}
		})
	}

	render() {
		return (
			<div className="container">
				<Nav user={this.state.user} venueId={this.state.venueId} />
				<div className="container--single-column max-width--420 margin-auto">
					<Banner text="CompList.org" />
					<WelcomeForm />
					<div className="container__info">
						<p>CompList.org is a free site for requesting and organizing comp ticket requests for bands, venues, birthday parties, anything.</p>
						<p>If you have a code, enter it above. To sign in as a band or venue, click <Link to={`/admin/login`}>here</Link>.</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Landing;