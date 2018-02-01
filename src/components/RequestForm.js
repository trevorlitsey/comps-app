import React from 'react'

class RequestForm extends React.Component {

	constructor() {
		super();

		this.state = {
			guestName: '',
			guestEmail: '',
			numberOfTickets: '',
			requesterEmail: ''
		}
	}

	checkValidation(e) {

		const guestName = this.guestName.value;
		const guestEmail = this.guestEmail.value;
		const numberOfTickets = this.numberOfTickets.value;
		const requesterEmail = this.requesterEmail.value;

		this.setState({ guestName, guestEmail, numberOfTickets, requesterEmail });

	}


	handleSubmit(e) {
		e.preventDefault();

		// todo, make thank you for submitting form

		console.log('submitting!!');

	}

	render() {

		const { guestName, guestEmail, numberOfTickets, requesterEmail } = this.state;
		const isEnabled = guestName.length > 0 && guestEmail.length > 0 && numberOfTickets.length > 0 && !isNaN(parseInt(numberOfTickets));

		return (
				<div className="form-container">
				<form className="form" onSubmit={this.handleSubmit.bind(this)} onKeyUp={this.checkValidation.bind(this)}>
					<input className="required" type="textbox" name="code" placeholder="Guest Name (First Last)" ref={ (input) => { this.guestName = input } }></input>
					<input type="textbox" name="code" placeholder="Guest Email" ref={ (input) => { this.guestEmail = input } }></input>
					<input type="textbox" name="code" placeholder="Number of tickets" ref={ (input) => { this.numberOfTickets = input } }></input>
					<input type="textbox" name="code" placeholder="Requester email (optional)" ref={ (input) => { this.requesterEmail = input } }></input>
					<button className="button--submit" type="submit" disabled={!isEnabled}>submit >></button>
				</form>
			</div>
		)
	}
}

export default RequestForm;