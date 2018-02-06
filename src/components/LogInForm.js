import React from 'react';

class LogInForm extends React.Component {

	render() {
		return (
			<div className="form-container">
				<button className="button--submit" onClick={this.props.toggleLogin}>Log in with Google >></button>
			</div>
		)
	}
}

export default LogInForm;