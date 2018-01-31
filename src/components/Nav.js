import React from 'react'

class Nav extends React.Component {
	render() {
		return (
			<div className="nav">
				<ul>
					<ul>
						<li>Home</li>
					</ul>
					<li className="sign-in">Sign In</li>
				</ul>
			</div>
		)
	}
}

export default Nav;