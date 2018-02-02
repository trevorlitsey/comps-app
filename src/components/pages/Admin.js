import React from 'react';
import base from 're-base';

import Banner from '../Banner';
import SignUpForm from '../SignUpForm';

class Admin extends React.Component {

	constructor() {
		super();

		this.state = {
			uid: '',
			owner: ''
		}

	}

	renderLogin() {
		return (
			<div className="container">
				<Banner text="Sign Up:"/>
				<SignUpForm />
			</div>
		)
	}


	render() {

		const logout = <button onClick={this.logout}>Log Out!</button>

		// check if not logged in
		if (!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}
	
		// check if user is owner of store
		if(this.state.uid !== this.state.owner) {
			return(
				<div>
					<p>Sorry you aren't the owner of this store!</p>
					{logout}
				</div>
			)
		}

		return (
			<div>
				<Banner text="Admin:" />
				{logout}
			</div>
		)

	}



}

export default Admin;