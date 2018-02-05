import React from 'react';

import Nav from '../Nav';
import Banner from '../Banner';
import WelcomeForm from '../WelcomeForm';
import Info from '../Info';

class Landing extends React.Component {


	render() {
		return (
			<div className="container">
				<Nav />
				<Banner text="CompList.org" />
				<WelcomeForm />
				<Info />
			</div>
		)
	}
}

export default Landing;