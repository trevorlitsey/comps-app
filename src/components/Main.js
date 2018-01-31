import React from 'react'

import Nav from './Nav';
import WelcomeForm from './WelcomeForm';

class Main extends React.Component {
	render() {
		return (
			<div className="container">
				<WelcomeForm />
			</div>
		)
	}
}

export default Main;