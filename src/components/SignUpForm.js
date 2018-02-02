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

	handleSubmit(e) {
		e.preventDefault();

		// todo, make thank you for submitting form
		console.log('submitting!!');

		 this.ref = base.syncState(`${this.state.admin.bandName}/admin`
		, {
			context: this,
			state: 'admin'
		});
		console.log(this.ref);
		
		base.removeBinding(this.ref);
	}

	render() {

		const { bandName, email, emailConfirm, password, passwordConfirm } = this.state.admin;
		const isEnabled = bandName && email && emailConfirm && password && passwordConfirm && (email === emailConfirm) && (password === passwordConfirm);

		return (
				<div className="form-container">
				<form className="form" onSubmit={this.handleSubmit.bind(this)} onKeyUp={this.checkValidation.bind(this)}>
					<input type="textbox" 	name="bandName" 				placeholder="Band/Venue name" 	ref={ (input) => { this.bandName = input } } required></input>
					<input type="textbox" 	name="email" 						placeholder="Email" 						ref={ (input) => { this.email = input } } required></input>
					<input type="textbox" 	name="emailConfirm" 		placeholder="Confirm Email" 		ref={ (input) => { this.emailConfirm = input } } required></input>
					<input type="password" 	name="password"	 				placeholder="Password" 					ref={ (input) => { this.password = input } } required></input>
					<input type="password" 	name="passwordConfirm"	placeholder="Confirm Password" 	ref={ (input) => { this.passwordConfirm = input } } required></input>
					<button className="button--submit" type="submit" disabled={!isEnabled}>submit >></button>
				</form>
			</div>
		)
	}
}

export default SignUpForm;