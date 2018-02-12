import React from 'react'
import { Link } from 'react-router-dom';

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
			code: '',
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
			this.setState({ code: JSON.parse(localStorageRef) })
		}
	}

	codeSuccess(code) {
		this.setState({ code });
		localStorage.setItem(`request-${this.props.match.params.venueSlug}`,
			JSON.stringify(code));
	}

	formSubmitted(submitStatus) {
		this.setState({ submitStatus })
	}

	render() {

		if (this.state.submitStatus === true) {
			return (
				<div className="container width-320 margin-auto">
					<Banner text="Success" />
					<div className="form-container">
						<h4>Your request has been submitted! A confirmation email has been sent to the email provided. To make another request, click <Link to={`/${this.props.match.params.venueSlug}`} onClick={() => this.setState({ submitStatus: false })}>here</Link>.</h4>
					</div>
				</div>
			)
		}
		else if (this.state.code && this.state.venue && this.state.code === this.state.venue.code) {
			return (
				<div className="container width-320 margin-auto">
					<Banner text="Request" />
					<RequestForm venue={this.state.venue} formSubmitted={this.formSubmitted} />
				</div>
			)
		} else {
			return (
				<div className="container width-320 margin-auto">
					<Banner text={this.state.venue ? `Enter Passcode for ${this.state.venue.name}:` : `Enter Passcode: `} />
					<PasscodeForm venue={this.state.venue} codeSuccess={this.codeSuccess} />
				</div>
			)
		}
	}
}

export default Request;