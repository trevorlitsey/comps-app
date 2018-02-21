import React from 'react'
import { Link } from 'react-router-dom';

import Nav from '../Nav';
import Banner from '../Banner';
import RequestForm from '../RequestForm';
import PasscodeForm from '../PasscodeForm';

import { findVenueBySlug } from '../../helpers';

class Request extends React.Component {

	constructor() {
		super();

		this.codeSuccess = this.codeSuccess.bind(this);
		this.formSubmitted = this.formSubmitted.bind(this);

		this.state = {
			venue: '',
			passcode: '',
			submitStatus: false
		}
	}

	componentWillMount() {
		const venuePromise = findVenueBySlug(this.props.match.params.venueSlug)
		venuePromise.once('value', snap => {
			if (!snap.val()) return;
			// TODO: redirect user to 'page not found'
			const venue = snap.val()[Object.keys(snap.val())[0]];
			this.setState({ venue });
		})

		// check if there user has already input passcode in localStorage
		const localStorageRef = localStorage.getItem(`request-${this.props.match.params.venueSlug}`);

		if (localStorageRef) {
			// update app component's order state
			this.setState({ passcode: JSON.parse(localStorageRef) })
		}
	}

	codeSuccess(passcode) {
		this.setState({ passcode });
		localStorage.setItem(`request-${this.props.match.params.venueSlug}`,
			JSON.stringify(passcode));
	}

	formSubmitted(submitStatus) {
		this.setState({ submitStatus })
	}

	render() {

		const { venue, passcode, submitStatus } = this.state

		if (submitStatus === true) {
			return (
				<div className="container">
					<Nav />
					<div className="container--single-column">
						<Banner text="Success" />
						<div className="form-container">
							<h4>Your request has been submitted! A confirmation email has been sent to the email provided. To make another request, click <Link to={`/${this.props.match.params.venueSlug}`} onClick={() => this.setState({ submitStatus: false })}>here</Link>.</h4>
						</div>
					</div>
				</div>
			)
		}
		else if (passcode && venue && passcode === venue.passcode) {
			return (
				<div className="container">
					<Nav />
					<div className="container--single-column">
						<Banner text="Request" />
						<RequestForm venue={venue} formSubmitted={this.formSubmitted} />
					</div>
				</div>
			)
		} else {
			return (
				<div className="container">
					<Nav />
					<div className="container--single-column">
						<Banner text={venue ? `Enter Passcode for ${venue.name}:` : `Enter Passcode: `} />
						<PasscodeForm venue={venue} codeSuccess={this.codeSuccess} />
					</div>
				</div>
			)
		}
	}
}

export default Request;