import React from 'react';

class LogInForm extends React.Component {

	render() {
		return (
			<div className="form-container">
				<button className="button--submit" onClick={this.props.logIn}>Sign in with Google >></button>
			</div>
		)
	}
}

export default LogInForm;