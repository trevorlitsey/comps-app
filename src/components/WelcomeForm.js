import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

// hat tip to https://gist.github.com/verticalgrain/195468e69f2ac88f3d9573d285b09764 for redirection workflow

class WelcomeForm extends React.Component {

	constructor () {
    super();
    this.state = {
			fireRedirect: '',
    }
	}

	goToVenue(e) {
		e.preventDefault();

		history.push('/');
		this.setState({ fireRedirect: `/venue/${this.venue.value}` })
	}

	render() {

		const { from } = '/'
		const { fireRedirect } = this.state

		return (
			<div className="form-container">
				<h2 className="lobster">CompList.org</h2>
				<form className="form" onSubmit={this.goToVenue.bind(this)}>
					<input type="textbox" name="code" placeholder="enter code" ref={ (input) => { this.venue = input } }></input>
					<button className="button--submit" type="submit">submit >></button>
				</form>
				{fireRedirect && (
          <Redirect to={from || this.state.fireRedirect}/>
				)}
			</div>
		)
	}
}

export default WelcomeForm;