import React from 'react'

class SignUpForm extends React.Component {

	handleSubmit(e) {
		e.preventDefault();
		this.props.signUp(this.name.value)
	}

	render = () =>
		<div className="form-container">
			<form className="form" onSubmit={this.handleSubmit.bind(this)}>
				<input type="textbox" name="name" placeholder="band/venue name" ref={(input) => { this.name = input }} required></input>
				<button className="button--submit">Sign up with Google >></button>
			</form>
		</div>
}

export default SignUpForm;