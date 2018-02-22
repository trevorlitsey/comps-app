import React from 'react'
import createBrowserHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import { message } from 'antd';
import uniqid from 'uniqid';

import Nav from '../Nav'
import Banner from '../Banner';
import SignUpForm from '../SignUpForm';

import { findVenueByOwner, makeNewVenue, registerNewVenue } from '../../helpers';
import { auth } from '../../base';

const history = createBrowserHistory();

class SignUp extends React.Component {

	constructor() {
		super()
		this.passUpVenueName = this.passUpVenueName.bind(this);

		this.state = {
			venueName: '',
			fireRedirect: ''
		}
	}

	passUpVenueName = venueName =>
		this.setState({ venueName });

	componentWillMount = () => {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
				const venue = findVenueByOwner(user);
				venue.once('value', snap => {
					if (snap.val()) {
						// if for some reason user is here by accident redirect to admin page
						const venue = snap.val()[Object.keys(snap.val())[0]];
						const fireRedirect = `/admin/${venue.id}`;
						this.setState({ fireRedirect });
					} else if (!snap.val() && this.state.venueName) {
						// create new venue
						const newVenue = makeNewVenue(this.state.venueName, uniqid(), user.uid);
						registerNewVenue(newVenue);
						history.push('/')
						const fireRedirect = `/admin/${newVenue.id}`;
						this.setState({ fireRedirect });
					} else {
						message.error('an error has occured. you may already have an account with that email')
					}
				});
			}
		});
	}

	render() {
		const { fireRedirect } = this.state;

		return (
			<div className="container">
				<Nav />
				<div className="container--single-column">
					<Banner text="Sign Up:" />
					<SignUpForm signUp={this.signUp} passUpVenueName={this.passUpVenueName} />
					{fireRedirect && (
						<Redirect to={fireRedirect} />
					)}
				</div>
			</div>
		)
	}
}

export default SignUp;