import React from 'react'
import { List, Avatar } from 'antd';

import { formatDateFromEpoch } from '../helpers';

class CompsList extends React.Component {
	render() {
		return (
			<List
				itemLayout="horizontal"
				header={this.props.header}
				dataSource={this.props.comps}
				renderItem={comp => (
					<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.id, 'p')}>undo</a>] : ''}>
						<List.Item.Meta
							avatar={comp ? <Avatar size="small" icon="user" /> : ''}
							title={comp ? comp.guestName : ''}
							description={comp ? `${formatDateFromEpoch(this.props.events[comp.event].date)} | ${this.props.events[comp.event].title}` : ''}
						/>
						<div>{comp.quant} tickets</div>
					</List.Item>
				)}
			/>
		)
	}
}

export default CompsList;