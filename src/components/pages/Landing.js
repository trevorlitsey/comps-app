import React from 'react';
import { Link } from 'react-router-dom';

import Banner from '../Banner';
import WelcomeForm from '../WelcomeForm';

class Landing extends React.Component {

	render() {
		return (
			<div className="container">
				<Banner text="CompList.org" />
				<WelcomeForm />
				<div className="container__info">
					<p>CompList.org is a free site for requesting and organizing comp ticket requests for bands, venues, birthday parties, anything.</p>
					<p>If you have a code, enter it above. To sign in as a band or venue, click <Link to={`/login`}>here</Link>.</p>
				</div>
			</div>
		)
	}
}

export default Landing;