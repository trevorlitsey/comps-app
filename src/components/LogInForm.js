import React from 'react';
import { logIn } from '../helpers'

class LogInForm extends React.Component {

	render() {
		return (
			<div className="form-container">
				<button className="button--submit" onClick={logIn}>Log in with Google >></button>
			</div>
		)
	}
}

export default LogInForm;