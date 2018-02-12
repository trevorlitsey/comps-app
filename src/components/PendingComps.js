import React from 'react'
import { List, Avatar } from 'antd';

import SortFilter from './SortFilter';

class PendingComps extends React.Component {

	render() {

		const pending = [];
		Object.keys(this.props.comps).map(id => {
			if (this.props.comps[id].status === "p") {
				pending.push({ ...this.props.comps[id] });
			}
		});


		return (
			<div className="subcontainer--pending">
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
									description={comp ? `${comp.quant} tickets for ${this.props.events[comp.event].date} ${this.props.events[comp.event].title}` : ''}
								/>
							</List.Item>
						)}
					/>
				</div>
			</div>
		)
	}
}

export default PendingComps;