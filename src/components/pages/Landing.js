import React from 'react';
import { Link } from 'react-router-dom';

import Banner from '../Banner';
import WelcomeForm from '../WelcomeForm';

const Landing = () =>
	<div className="container margin-auto width-420">
		<Banner text="CompList.org" />
		<WelcomeForm />
		<div className="container__info width-420">
			<p>CompList.org is a free site for requesting and organizing comp ticket requests for bands, venues, birthday parties, anything.</p>
			<p>If you have a code, enter it above. To sign in as a band or venue, click <Link to={`/admin/login`}>here</Link>.</p>
		</div>
	</div>

export default Landing;