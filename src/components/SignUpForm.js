import React from 'react';

import base from '../base';

class SignUpForm extends React.Component {

	constructor() {
		super();

		this.state = {
			admin: {
				bandName: '',
				email: '',
				emailConfirm: '',
				password: '',
				passwordConfirm: ''
			}
		}
	}

	checkValidation(e) {

		const admin = {
			bandName: this.bandName.value,
			email: this.email.value,
			emailConfirm: this.emailConfirm.value,
			password: this.password.value,
			passwordConfirm: this.passwordConfirm.value
		}

		this.setState({ admin });

	}

	componentWillMount() {

		// todo, make thank you for submitting form
		console.log('submitting!!');

		 this.ref = base.syncState(`${this.state.admin.bandName}/admin`
		, {
			context: this,
			state: 'admin'
		});
		console.log(this.ref);
		
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {

		const { bandName, email, emailConfirm, password, passwordConfirm } = this.state.admin;
		const isEnabled = bandName && email && emailConfirm && password && passwordConfirm && (email === emailConfirm) && (password === passwordConfirm);

		return (
			<div className="form-container">
				<form className="form" onKeyUp={this.checkValidation.bind(this)}>
					<button className="button--submit" onClick={() => this.authenticate('google')}>Sign in with Google >></button>
				</form>
			</div>
		)
	}
}

export default SignUpForm;