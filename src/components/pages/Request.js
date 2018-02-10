import React from 'react'

import Banner from '../Banner';
import RequestForm from '../RequestForm';
import PasscodeForm from '../PasscodeForm';

import { findVenueBySlug } from '../../helpers';

class Request extends React.Component {

	constructor() {
		super();

		this.codeSuccess = this.codeSuccess.bind(this);

		this.state = {
			venue: '',
			code: '',
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
	}

	codeSuccess(code) {
		this.setState({ code });
	}


	render() {
		if (this.state.code && this.state.venue && this.state.code == this.state.venue.code) {
			return (
				<div className="container width-320 margin-auto">
					<Banner text="Request:" />
					<RequestForm venue={this.state.venue} />
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