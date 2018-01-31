import React from 'react'

class RequestForm extends React.Component {


	requestComp(e) {
		e.preventDefault();

		// todo, make thank you for submitting form

	}

	render() {
		return (
			<div className="container">
				<div className="form-container">
				<h2 className="lobster">Request:</h2>
				<form className="form" onSubmit={this.requestComp.bind(this)}>
					<input type="textbox" name="code" placeholder="Guest Name (First Last)" ref={ (input) => { this.guest = input } }></input>
					<input type="textbox" name="code" placeholder="Guest Email" ref={ (input) => { this.guestEmail = input } }></input>
					<input type="textbox" name="code" placeholder="Number of tickets" ref={ (input) => { this.numberOfTickets = input } }></input>
					<input type="textbox" name="code" placeholder="Requester email (optional)" ref={ (input) => { this.requesterEmail = input } }></input>
					<button className="button--submit" type="submit">submit >></button>
				</form>
			</div>
		</div>
		)
	}
}

export default RequestForm;