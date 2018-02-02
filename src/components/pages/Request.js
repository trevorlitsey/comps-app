import React from 'react'

import Banner from '../Banner';
import RequestForm from '../RequestForm';


class Request extends React.Component {
	render() {
		return (
			<div className="container">
				<Banner text="Request:"/>
				<RequestForm />
			</div>
		)
	}
}

export default Request;