import React from 'react'
import { Redirect } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { database } from '../base';
import { findVenueByName, StringToXML } from '../helpers';
import { AutoComplete } from 'antd';

const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
const history = createBrowserHistory()

// hat tip to https://gist.github.com/verticalgrain/195468e69f2ac88f3d9573d285b09764 for redirection workflow

class WelcomeForm extends React.Component {

	constructor() {
		super();

		this.state = {
			fireRedirect: '',
			venues: [],
			html: '',
		}
	}

	goToVenue(e) {
		e.preventDefault();

		history.push('/');
		this.setState({ fireRedirect: `/request/${this.venue.value}` })
	}

	handleChange(e) {
		const venue = findVenueByName(this.venue.value);
		venue.on('value', snap => {
			if (!snap.val() || !this.venue.value) return this.setState({ html: '' });
			const venues = Object.keys(snap.val()).map(key => snap.val()[key]);
			console.log(venues);

			const html = venues.map(v => `<li value="${v.id}">${v.name}</li>`).join('');
			this.setState({ html });
			console.log(html);

		})

		// database.child('venues').once('value', snap => console.log(snap.val()));

		// todo: populate dropdown menu with regex filtered results

	}

	render() {

		const from = '/'
		const { fireRedirect } = this.state
		const html = htmlToReactParser.parse(this.state.html);

		return (
			<div className="form-container">
				<form className="form" onSubmit={this.goToVenue.bind(this)} onChange={this.handleChange.bind(this)}>
					<input type="textbox" name="code" placeholder="search band/venues" ref={(input) => { this.venue = input }}></input>
					<ul>
						{html}
					</ul>
				</form>
				{fireRedirect && (
					<Redirect to={from || this.state.fireRedirect} />
				)}
			</div>
		)
	}
}

export default WelcomeForm;