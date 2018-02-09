import React from 'react'
import { Menu, Icon, Dropdown, List, Avatar } from 'antd';

class ApprovedComps extends React.Component {
	render() {

		const approved = Object.keys(this.props.comps).map(key => {
			if (this.props.comps[key].status === "a") {
				return { ...this.props.comps[key] }
			}
		});

		const denied = Object.keys(this.props.comps).map(key => {
			if (this.props.comps[key].status === "d") {
				return { ...this.props.comps[key] }
			}
		});

		const sort = (
			<Menu>
				<Menu.Item key="0">
					<a href="http://www.alipay.com/">By date (old-new)</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a href="http://www.taobao.com/">By date (new-old)</a>
				</Menu.Item>
				<Menu.Item key="3">3rd menu item</Menu.Item>
			</Menu>
		);

		const filter = (
			<Menu>
				<Menu.Item key="0">
					<a href="http://www.alipay.com/">Date 1</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a href="http://www.taobao.com/">Date 2</a>
				</Menu.Item>
				<Menu.Item key="3">3rd menu item</Menu.Item>
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
				<List
					itemLayout="horizontal"
					header="Approved"
					dataSource={approved}
					renderItem={comp => (
						<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.key, 'p')}>undo</a>] : ''}>
							<List.Item.Meta
								avatar={comp ? <Avatar size="small" icon="user" /> : ''}
								title={comp ? comp.guestName : 'none yet!'}
								description={comp ? `${comp.quant} tickets for ${this.props.events[comp.event].date} ${this.props.events[comp.event].title}` : ''}
							/>
						</List.Item>
					)}
				/>
				<List
					itemLayout="horizontal"
					header="Denied"
					dataSource={denied}
					renderItem={comp => (
						<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.key, 'p')}>undo</a>] : ''}>
							<List.Item.Meta
								avatar={comp ? <Avatar size="small" icon="user" /> : ''}
								title={comp ? comp.guestName : 'none yet!'}
								description={comp ? `${comp.quant} tickets for ${this.props.events[comp.event].date} ${this.props.events[comp.event].title}` : ''}
							/>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}

export default ApprovedComps;