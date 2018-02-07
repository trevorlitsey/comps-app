import React from 'react'

class Nav extends React.Component {

	render() {
		return (
			<div className="nav">
				<ul>
					<li onClick={this.props.toggleLogin} className="sign-in">{this.props.user ? 'Log Out' : 'Log In'}</li>
				</ul>
			</div>
		)
	}
}

export default Nav;