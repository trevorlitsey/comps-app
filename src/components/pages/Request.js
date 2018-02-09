import React from 'react'

import Banner from '../Banner';
import RequestForm from '../RequestForm';

import getEventsBySlug from '../../helpers';

class Request extends React.Component {
	render() {
		return (
			<div className="container width-320 margin-auto">
				<Banner text="Request:" />
				<RequestForm venueSlug={this.props.match.params.venueSlug} />
			</div>
		)
	}
}

export default Request;