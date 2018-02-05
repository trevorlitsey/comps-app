import React from 'react'
import { Link } from 'react-router-dom';

class Nav extends React.Component {

	render() {
		return (
			<div className="nav">
				<ul>
					<Link to="/admin"><li className="sign-in">Sign In</li></Link>
				</ul>
			</div>
		)
	}
}

export default Nav;