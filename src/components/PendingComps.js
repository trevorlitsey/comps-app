import React from 'react'
import { List, Avatar } from 'antd';

import Banner from './Banner';

class PendingComps extends React.Component {
	render() {


		const comps = Object.keys(this.props.pending).map(key => {
			return {...this.props.pending[key]}
		});
			

		return (
			<div className="subcontainer--pending">
						<Banner text="Pending:" />
						<div className="form-container">
							<List
								itemLayout="horizontal"
								dataSource={comps}
								renderItem={comp => (
									<List.Item actions={[<a>approve</a>, <a>deny</a>]}>
										<List.Item.Meta
											avatar={<Avatar size="small" icon="user" />}
											title={comp.guestName}
											description={`${comp.quant} tickets for ${this.props.events[comp.event].date} ${this.props.events[comp.event].title}`}
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