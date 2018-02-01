import React from 'react'

import Banner from './Banner';
import WelcomeForm from './WelcomeForm';
import Info from './Info';


class Main extends React.Component {
	render() {
		return (
			<div className="container">
				<Banner text="CompList.org" />
				<WelcomeForm />
				<Info />
			</div>
		)
	}
}

export default Main;