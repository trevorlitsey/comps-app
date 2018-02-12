import React from 'react'
import { List, Avatar } from 'antd';

import SortFilter from './SortFilter';

class PendingComps extends React.Component {

	render() {

		const pending = Object.keys(this.props.comps)
			.map(id => this.props.comps[id])
			.filter(comp => comp.status === "p")

		return (
			<div className="form-container">
				<SortFilter />
				<List
					itemLayout="horizontal"
					dataSource={pending}
					renderItem={comp => (
						<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.id, 'a')}>approve</a>, <a onClick={() => this.props.updateComp(comp.id, 'd')}>deny</a>] : ''}>
							<List.Item.Meta
								avatar={comp ? <Avatar size="small" icon="user" /> : ''}
								title={comp ? comp.guestName : ''}
								description={comp ? `${this.props.events[comp.event].date} | ${this.props.events[comp.event].title}` : ''}
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