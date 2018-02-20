import React from 'react'
import { Link } from 'react-router-dom';

import { logOut } from '../helpers'

const Nav = props =>
	props.user ?
		<ul className="nav">
			<Link to="/"><li>Home</li></Link>
			<Link to={`/admin/${props.venueId}`}><li>Admin</li></Link>
			<Link to='/' className="log">
				<li onClick={logOut}>Logout</li>
			</Link>
		</ul>
		:
		<ul className="nav">
			<Link to="/"><li>Home</li></Link>
			<Link to="/admin/login" className="log">
				<li>Login</li>
			</Link>
		</ul>

export default Nav;