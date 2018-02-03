import React from 'react'
import { Redirect } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'


import { database } from '../base';

const history = createBrowserHistory()

// hat tip to https://gist.github.com/verticalgrain/195468e69f2ac88f3d9573d285b09764 for redirection workflow

class WelcomeForm extends React.Component {

	constructor () {
		super();
		
		this.query = this.query.bind(this);

    this.state = {
			fireRedirect: '',
    }
	}

	goToVenue(e) {
		e.preventDefault();

		history.push('/');
		this.setState({ fireRedirect: `/request/${this.venue.value}` })
	}

	query() {
		database.child('venues').once('value', snap => console.log(snap.val()));

		// todo: populate dropdown menu with regex filtered results

	}

	render() {

		const from = '/'
		const { fireRedirect } = this.state

		return (
			<div className="form-container">
				<form className="form" onSubmit={this.goToVenue.bind(this)} onKeyUp={this.query}>
					<input type="textbox" name="code" placeholder="search for your band/venue" ref={ (input) => { this.venue = input } } required></input>
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