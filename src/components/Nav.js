import React from 'react'
import { Link } from 'react-router-dom';

import { logIn, logOut } from '../helpers'

const Nav = props =>
	<ul className="nav">
		<Link to="/"><li>Home</li></Link>
		<li className="log" onClick={props.user ? logOut : logIn}>{props.user ? 'Logout' : 'Login'}</li>
	</ul>


export default Nav;