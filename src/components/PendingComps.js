import React from 'react'
import { List, Avatar } from 'antd';

import Banner from './Banner';

class PendingComps extends React.Component {

	render() {

		const comps = Object.keys(this.props.comps).map(key => {
			if (this.props.comps[key].status == "pending") {
				return {...this.props.comps[key]}
			}
		});

		return (
			<div className="subcontainer--pending">
				<Banner text="Pending:" />
				<div className="form-container">
					<List
						itemLayout="horizontal"
						dataSource={comps}
						renderItem={comp => (
							<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.key, 'approved')}>approve</a>, <a onClick={() => this.props.updateComp(comp.key, 'denied')}>deny</a>] : ''}>
								<List.Item.Meta
									avatar={comp ? <Avatar size="small" icon="user" /> : ''}
									title={comp ? comp.guestName : 'none yet!'}
									description={comp ? `${comp.quant} tickets for ${this.props.comps[comp.event].date} ${this.props.comps[comp.event].title}` : ''}
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