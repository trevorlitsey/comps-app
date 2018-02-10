import React from 'react'
import { Redirect } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { database } from '../base';
import { findVenueByName } from '../helpers';
import { Icon, Button, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;

const history = createBrowserHistory()

// redirect flow from https://gist.github.com/verticalgrain/195468e69f2ac88f3d9573d285b09764

class WelcomeForm extends React.Component {

	constructor() {
		super();

		this.goToVenue = this.goToVenue.bind(this);
		this.handleSearch = this.handleSearch.bind(this);

		this.state = {
			fireRedirect: '',
			venues: [],
			html: '',
		}
	}

	goToVenue(url) {
		history.push('/');
		this.setState({ fireRedirect: `/${url}` })
	}

	handleSearch(value) {
		console.log('searching');

		const results = findVenueByName(value);
		results.on('value', snap => {
			if (!snap.val() || !value) return this.setState({ venues: [] });
			const venues = Object.keys(snap.val()).map(key => snap.val()[key]);
			this.setState({ venues })
		})
	}

	renderOption(venue) {
		return (
			<Option key={venue.slug} text={venue.name}>
				{venue.name}
			</Option>
		);
	}

	render() {

		const from = '/';
		const { venues, fireRedirect } = this.state

		return (
			<div className="form-container width-420">
				<div className="global-search-wrapper" style={{ width: 300, margin: '0 auto' }}>
					<AutoComplete
						className="global-search"
						size="large"
						style={{ width: '100%' }}
						dataSource={this.state.venues ? this.state.venues.map(this.renderOption) : []}
						onSelect={this.goToVenue}
						onSearch={this.handleSearch}
						placeholder="search bands/venues"
						optionLabelProp="text"
					>
						<Input
							suffix={(
								<Button
									className="search-btn"
									size="large"
									type="primary"
								>
									<Icon type="search" />
								</Button>
							)}
						/>
					</AutoComplete>
				</div>
				{fireRedirect && (
					<Redirect to={this.state.fireRedirect || from} />
				)}
			</div>
		)
	}
}

export default WelcomeForm;