import React from 'react'
import { Menu, Icon, Dropdown } from 'antd';

import CompsListApproved from './CompsListApproved';

class ApprovedComps extends React.Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			sortState: "eventDate-asc",
			filter: ''
		}
	}

	handleClick(e) {
		this.setState({ sortState: e.key })
	}

	render() {

		const compsArray = Object.keys(this.props.comps).map(id => this.props.comps[id]);
		const approved = compsArray.filter(comp => comp.status === "a")
		const denied = compsArray.filter(comp => comp.status === "d")

		if (this.state.sortState === "eventDate-asc") {
			approved.sort((compA, compB) => {
				return this.props.events[compA.event].date - this.props.events[compB.event].date;
			})
			denied.sort((compA, compB) => {
				return this.props.events[compA.event].date - this.props.events[compB.event].date;
			})
		} else if (this.state.sortState === "eventDate-desc") {
			approved.sort((compA, compB) => {
				return this.props.events[compB.event].date - this.props.events[compA.event].date;
			})
			denied.sort((compA, compB) => {
				return this.props.events[compB.event].date - this.props.events[compA.event].date;
			})
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
			<Menu>
				<Menu.Item key="0">
					Event One
				</Menu.Item>
				<Menu.Item key="1">
					Event 2
				</Menu.Item>
			</Menu>
		);

		return (
			<div className="form-container">
				<Dropdown overlay={sort} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						Sort <Icon type="down" />
					</a>
				</Dropdown>
				<Dropdown overlay={filter} trigger={['click']}>
					<a className="ant-dropdown-link" href="#" style={{ 'marginLeft': 8 }}>
						Filter <Icon type="down" />
					</a>
				</Dropdown>

				<CompsListApproved events={this.props.events} comps={approved} updateComp={this.props.updateComp} header="Approved" />
				<CompsListApproved events={this.props.events} comps={denied} updateComp={this.props.updateComp} header="Denied" />
			</div>
		)
	}
}

export default ApprovedComps;