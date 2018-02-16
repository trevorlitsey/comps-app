import React from 'react'
import { Menu, Icon, Dropdown } from 'antd';

import { formatDateFromEpoch } from '../helpers';

import CompsListApproved from './CompsListApproved';

class ApprovedComps extends React.Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
		this.renderEventOption = this.renderEventOption.bind(this);

		this.state = {
			sortState: "eventDate-asc",
			filter: ''
		}
	}

	handleClick(e) {
		this.setState({ sortState: e.key })
	}

	renderEventOption = key =>
		<Menu.Item key={key}>
			{`${formatDateFromEpoch(this.props.events[key].date)} | ${this.props.events[key].title}`}
		</Menu.Item>


	render() {

		const compsArray = Object.keys(this.props.comps).map(id => this.props.comps[id]);
		let approved = compsArray.filter(comp => comp.status === "a")
		let denied = compsArray.filter(comp => comp.status === "d")

		if (this.state.sortState === "eventDate-asc") {
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

		const sort = (
			<Menu onClick={this.handleClick}>
				<Menu.Item key={"eventDate-asc"}>
					Event date (asc)
				</Menu.Item>
				<Menu.Item key={"eventDate-desc"}>
					Event date (desc)
				</Menu.Item>
			</Menu>
		);

		const filter = (
			<Menu onClick={this.handleClick}>
				<Menu.Item key="eventDate-asc">
					All
				</Menu.Item>
				{Object.keys(this.props.events).map(this.renderEventOption)}
			</Menu>
		);

		return (
			<div className="form-container">
				<Dropdown overlay={sort} trigger={['click']}>
					<a className="ant-dropdown-link">
						Sort <Icon type="down" />
					</a>
				</Dropdown>
				<Dropdown overlay={filter} trigger={['click']}>
					<a className="ant-dropdown-link" style={{ 'marginLeft': 8 }}>
						Filter <Icon type="down" />
					</a>
				</Dropdown>

				<CompsListApproved events={this.props.events} comps={approved} updateComp={this.props.updateComp} header="Approved" currentTotals={this.props.currentTotals} />
				<CompsListApproved events={this.props.events} comps={denied} updateComp={this.props.updateComp} header="Denied" currentTotals={this.props.currentTotals} />
			</div>
		)
	}
}

export default ApprovedComps;