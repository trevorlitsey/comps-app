
import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';

import { formatDateFromEpoch } from '../helpers';

class EventFilterOptions extends React.Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}


	handleClick = e =>
		this.props.handleClick(e.key);

	renderEventOption = key =>
		<Menu.Item key={key}>
			{`${formatDateFromEpoch(this.props.events[key].date)} | ${this.props.events[key].title}`}
		</Menu.Item>

	render() {

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
			<div>
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
			</div>
		)
	}
}

export default EventFilterOptions;