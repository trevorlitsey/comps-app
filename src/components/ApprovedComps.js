import React from 'react';
import PropTypes from 'prop-types';

import CompsListApproved from './CompsListApproved';
import EventFilterOptions from './EventFilterOptions';

class ApprovedComps extends React.Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			sortState: "eventDate-asc",
			filter: ''
		}
	}

	handleClick = sortState =>
		this.setState({ sortState });

	render() {

		const compsArray = this.props.comps && Object.keys(this.props.comps).map(id => this.props.comps[id]);
		let approved = compsArray && compsArray.filter(comp => comp.status === "a")
		let denied = compsArray && compsArray.filter(comp => comp.status === "d")

		if (!this.props.comps) {
			// do nothing
		} else if (this.state.sortState === "eventDate-asc") {
			approved.sort((compA, compB) => this.props.events[compA.event].date - this.props.events[compB.event].date)
			denied.sort((compA, compB) => this.props.events[compA.event].date - this.props.events[compB.event].date)
		} else if (this.state.sortState === "eventDate-desc") {
			approved.sort((compA, compB) => this.props.events[compB.event].date - this.props.events[compA.event].date)
			denied.sort((compA, compB) => this.props.events[compB.event].date - this.props.events[compA.event].date)
		} else {
			// filter by event
			approved = approved.filter(comp => comp.event === this.state.sortState);
			denied = denied.filter(comp => comp.event === this.state.sortState);
		}

		return (
			<div className="form-container">
				<EventFilterOptions handleClick={this.handleClick} events={this.props.events} />
				<CompsListApproved events={this.props.events} comps={approved} updateComp={this.props.updateComp} header="Approved" />
				<CompsListApproved events={this.props.events} comps={denied} updateComp={this.props.updateComp} header="Denied" />
			</div>
		)
	}
}

ApprovedComps.propTypes = {
	updateComp: PropTypes.func,
	comps: PropTypes.object,
	events: PropTypes.object,
}

export default ApprovedComps;