import React from 'react'
import firebase from 'firebase';

import { logIn, logOut } from '../helpers'

class Nav extends React.Component {

	render() {

		return (
			<div className="nav">
				<ul>
					<li onClick={firebase.auth().currentUser ? logOut : logIn} className="sign-in">{this.props.user ? 'Log Out' : 'Log In'}</li>
				</ul>
			</div>
		)
	}
}

export default Nav;