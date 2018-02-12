import React from 'react'
import { Menu, Dropdown, Icon, List, Avatar } from 'antd';

import { formatDateFromEpoch } from '../helpers';

class PendingComps extends React.Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			sortState: "true",
			filter: ''
		}
	}

	handleClick(e) {
		this.setState({ sortState: e.key })
	}

	render() {

		const pending = Object.keys(this.props.comps)
			.map(id => this.props.comps[id])
			.filter(comp => comp.status === "p");

		if (this.state.sortState === "true") {
			pending.sort((compA, compB) => {
				return this.props.events[compA.event].date - this.props.events[compB.event].date;
			})
		} else {
			pending.sort((compA, compB) => {
				return this.props.events[compB.event].date - this.props.events[compA.event].date;
			})
		}

		const sort = (
			<Menu onClick={this.handleClick}>
				<Menu.Item key={"true"}>
					By date (present-future)
				</Menu.Item>
				<Menu.Item key={"false"}>
					By date (future-present)
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
				<List
					itemLayout="horizontal"
					dataSource={pending}
					renderItem={comp => (
						<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.id, 'a')}>approve</a>, <a onClick={() => this.props.updateComp(comp.id, 'd')}>deny</a>] : ''}>
							<List.Item.Meta
								avatar={comp ? <Avatar size="small" icon="user" /> : ''}
								title={comp ? comp.guestName : ''}
								description={comp ? `${formatDateFromEpoch(this.props.events[comp.event].date)} | ${this.props.events[comp.event].title}` : 'none yet!'}
							/>
							<div>{comp.quant} tickets (? left)</div>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}

export default PendingComps;