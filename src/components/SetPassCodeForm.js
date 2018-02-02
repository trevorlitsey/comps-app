import React from 'react'

class SetPassCodeForm extends React.Component {

	constructor() {
		super();

		this.state = {
			passcode: '',
			passcodeConfirm: '',
		}
	}

	checkValidation(e) {

		const passcode = this.passcode.value;
		const passcodeConfirm = this.passcodeConfirm.value;

		this.setState({ passcode, passcodeConfirm });

	}


	handleSubmit(e) {
		e.preventDefault();

		// todo, make thank you for submitting form

		console.log('submitting!!');

	}

	render() {

		const { passcode, passcodeConfirm } = this.state;
		const isEnabled = passcode.length > 0 && passcodeConfirm.length > 0 && (passcode === passcodeConfirm);

		return (
			<div className="container__form">
				<form className="form" onSubmit={this.handleSubmit.bind(this)} onKeyUp={this.checkValidation.bind(this)}>
					<input type="textbox" name="passcode" placeholder="Passcode" ref={ (input) => { this.passcode = input } } required></input>
					<input type="textbox" name="passcodeConfirm" placeholder="Confirm Passcode" ref={ (input) => { this.passcodeConfirm = input } } require></input>
					<button className="button--submit" type="submit" disabled={!isEnabled}>submit >></button>
				</form>
			</div>
		)
	}
}

export default SetPassCodeForm;