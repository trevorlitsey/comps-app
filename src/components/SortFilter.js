import React from 'react'

import { Menu, Dropdown, Icon } from 'antd';

class SortFilter extends React.Component {
	render() {
		const sort = (
			<Menu>
				<Menu.Item key="0">
					<a href="http://www.alipay.com/">By date (old-new)</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a href="http://www.taobao.com/">By date (new-old)</a>
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
			<div>
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
			</div>
		)
	}
}

export default SortFilter;