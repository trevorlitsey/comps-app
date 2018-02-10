import React from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

import createBrowserHistory from 'history/createBrowserHistory';

import { database, auth, provider } from '../../base'
import firebase from 'firebase';

import Banner from '../Banner';
import SignUpForm from '../SignUpForm';

const history = createBrowserHistory()

class SignUp extends React.Component {

	constructor() {
		super()
		this.signUp = this.signUp.bind(this);
		this.queryVenues = this.queryVenues.bind(this);

		this.state = {
			alert: '',
			fireRedirect: ''
		}

	}

	queryVenues(uid, name) {
		database
			.child('venues')
			.orderByChild('owner')
			.equalTo(uid)
			.once('value', snap => {

				const venue = snap.val();

				// if venue already owned
				if (venue) {
					const venueId = Object.keys(venue)[0];
					const venueName = venue[venueId].name;
					const alert = <p className="alert">Looks you are already signed up with that account. <br />
						Click <Link to={`admin/${venueId}`}>here</Link> to visit the admin page for <strong>{venueName}</strong></p>;
					return this.setState({ alert });
				}
				// else if venue NOT already owned, log info a redirect user to admin page
				else {
					const venueId = uniqid();
					database.child('venues').child(venueId).set({
						name,
						owner: uid
					}).then(() => {
						history.push('/signup');
						this.setState({
							fireRedirect: `admin/${venueId}`
						});
					});
				}
			});

	}


	signUp(name) {
		// check if user is signed up already
		if (firebase.auth().currentUser) {
			const user = firebase.auth().currentUser;
			const { uid } = user;
			this.queryVenues(uid, name);
		}
		else {
			auth.signInWithPopup(provider)
				.then((result) => {
					const user = result.user;
					const { uid } = user;
					this.queryVenues(uid, name);
				});
		}
	}


	render() {
		const { fireRedirect } = this.state;

		return (
			<div className="container">
				<Banner text="SignUp:" />
				<SignUpForm signUp={this.signUp} />
				{this.state.alert}
				{fireRedirect && (
					<Redirect to={fireRedirect} />
				)}
			</div>
		)
	}
}

export default SignUp;