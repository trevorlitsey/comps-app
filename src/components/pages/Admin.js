import React from 'react';
import { Link } from 'react-router-dom';

import Banner from '../Banner';
import LogInForm from '../LogInForm';

import base, { auth, provider } from '../../base.js';

class Admin extends React.Component {

	constructor() {
		super();

		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);

		this.state = {
			owner: '',
			username: '',
			user: null,
		}
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			} 
		});
	}

	logIn() {
		console.log('running');
		
		auth.signInWithPopup(provider)
			.then((result) => {
				const user = result.user;
				console.log(user);
				
				this.setState({ user });
			});
	}

	logOut() {
		auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
	}

	renderLogin() {
		return (
			<div className="container">
				<Banner text="Sign In:"/>
				<LogInForm logIn={this.logIn} />
			</div>
		)
	}

	render() {
		const logout = <button className="button--logout" onClick={this.logOut}>{'Log Out >>'}</button>

		// check if not logged in
		if (!this.state.user) {
			return <div>{this.renderLogin()}</div>
		}

		// check if user is owner of store
		if(this.state.uid !== this.state.owner) {
			return(
			<div className="container">
				<div className="container__info">
					<p>Sorry, you are not an admin of this band or venue! Click <Link to={`/`}>here</Link> to request comps.</p>
					{logout}
				</div>
			</div>
			)
		}

		return (
			<div className="container">
				<Banner text="Admin:" />
				<div className="container__info">
					{logout}
				</div>
			</div>
		)
	}
}

export default Admin;