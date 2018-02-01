import React from 'react'
import { Link } from 'react-router-dom';

class Info extends React.Component {
	render() {
		return (
			<div className="container__info">
				<p>CompList.org is a free site for requesting and organizing comp ticket requests for bands, venues, birthday parties, anything.</p>
				<p>If you have a code, enter it above. If you want to sign up as a band or venue, click <Link to={`/signup`}>here</Link>.</p>
			</div>
		)
	}
}

export default Info;