import React from 'react'

import Banner from '../Banner';
import RequestForm from '../RequestForm';

class Request extends React.Component {
	render() {
		return (
			<div className="container section">
				<Banner text="Request:" />
				<RequestForm venue={this.props.match.params.venueId} />
			</div>
		)
	}
}

export default Request;