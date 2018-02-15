import React from 'react'
import { Menu, Dropdown, Icon, List, Avatar } from 'antd';

import { formatDateFromEpoch } from '../helpers';

class PendingComps extends React.Component {

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

	renderEventOption(key) {
		return (
			<Menu.Item key={key}>
				{`${formatDateFromEpoch(this.props.events[key].date)} | ${this.props.events[key].title}`}
			</Menu.Item>
		)
	}

	checkIfRoomToApprove(id, status) {
		this.props.updateComp(id, status)
	}

	render() {

		let pending = Object.keys(this.props.comps)
			.map(id => this.props.comps[id])
			.filter(comp => comp.status === "p");

		if (!this.state.sortState || this.state.sortState === "eventDate-asc") {
			// default
			pending.sort((compA, compB) => this.props.events[compA.event].date - this.props.events[compB.event].date)
		} else if (this.state.sortState === "eventDate-desc") {
			// sort by event, descending
			pending.sort((compA, compB) => this.props.events[compB.event].date - this.props.events[compA.event].date)
		} else {
			// filter by event
			pending = pending.filter(comp => comp.event === this.state.sortState);
		}

		const sort = (
			<Menu onClick={this.handleClick}>
				<Menu.Item key={"eventDate-asc"}>
					By date (present-future)
				</Menu.Item>
				<Menu.Item key={"eventDate-desc"}>
					By date (future-present)
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
				<List
					itemLayout="horizontal"
					header="Pending"
					dataSource={pending}
					renderItem={comp => (
						<List.Item actions={comp ? [<a onClick={() => this.checkIfRoomToApprove(comp.id, 'a')}>approve</a>, <a onClick={() => this.props.updateComp(comp.id, 'd')}>deny</a>] : ''}>
							<List.Item.Meta
								avatar={comp ? <Avatar size="small" icon="user" /> : ''}
								title={comp ? comp.guestName : ''}
								description={comp ? `${formatDateFromEpoch(this.props.events[comp.event].date)} | ${this.props.events[comp.event].title}` : 'none yet!'}
							/>
							<div>{comp.quant} tickets ({this.props.currentTotals[comp.event].limit - this.props.currentTotals[comp.event].count} left)</div>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}

export default PendingComps;