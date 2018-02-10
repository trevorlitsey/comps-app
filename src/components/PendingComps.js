import React from 'react'
import { List, Avatar } from 'antd';

class PendingComps extends React.Component {

	render() {

		const pending = [];
		Object.keys(this.props.comps).map(key => {
			if (this.props.comps[key].status === "p") {
				pending.push({ ...this.props.comps[key] });
			}
		});

		console.log(pending);


		return (
			<div className="subcontainer--pending">
				<div className="form-container">
					<List
						itemLayout="horizontal"
						dataSource={pending}
						renderItem={comp => (
							<List.Item actions={comp ? [<a onClick={() => this.props.updateComp(comp.key, 'a')}>approve</a>, <a onClick={() => this.props.updateComp(comp.key, 'd')}>deny</a>] : ''}>
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