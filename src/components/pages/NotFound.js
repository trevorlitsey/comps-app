import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Nav';

import { findVenueByOwner, formatSingleValueFromSnap } from '../../helpers';
import { auth } from '../../base';

class NotFound extends React.Component {

	constructor() {
		super()

		this.updateUserState = this.updateUserState.bind(this);

		this.state = {
			user: {},
			venue: {},
		}
	}

	async updateVenueState(user) {
		const snap = await findVenueByOwner(user).once('value');
		if (snap.val()) {
			const venue = formatSingleValueFromSnap(snap);

			this.setState({
				venue,
			});
		}
	}

	async updateUserState(user) {
		if (!user) return // don't even bother
		this.setState({
			user,
		});

		this.updateVenueState(user);
	}

	componentWillMount = () =>
		auth.onAuthStateChanged(this.updateUserState);


	render = () =>
		<div>
			<Nav user={this.state.user} venueId={this.state.venue.id} />
			<div className="container--single-column">
				<div className="container__info width-320">
					<p>Sorry, what you're looking for isn't here. Click <Link to={`/`}>here</Link> to go back to the home page.</p>
				</div>
			</div>
		</div>


}

export default NotFound;