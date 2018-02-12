import React from 'react'
import { Menu, Icon, Dropdown, List, Avatar } from 'antd';

import SortFilter from './SortFilter';

class ApprovedComps extends React.Component {
	render() {

		const compsArray = Object.keys(this.props.comps).map(id => this.props.comps[id]);
		const approved = compsArray.filter(comp => comp.status === "a")
		const denied = compsArray.filter(comp => comp.status === "d")

		return (
			<div className="form-container">
				<SortFilter />
				<List
					itemLayout="horizontal"
					header="Approved"
					dataSource={approved}
					renderItem={comp => (
						<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.key, 'p')}>undo</a>] : ''}>
							<List.Item.Meta
								avatar={comp ? <Avatar size="small" icon="user" /> : ''}
								title={comp ? comp.guestName : 'none yet!'}
								description={comp ? `${this.props.events[comp.event].date} ${this.props.events[comp.event].title}` : ''}
							/>
							<div>{comp.quant} tickets</div>
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
								description={comp ? `${this.props.events[comp.event].date} ${this.props.events[comp.event].title}` : ''}
							/>
							<div>{comp.quant} tickets</div>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}

export default ApprovedComps;