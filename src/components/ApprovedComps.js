import React from 'react'
import { List, Avatar } from 'antd';

class ApprovedComps extends React.Component {
	render() {

		const approved = Object.keys(this.props.comps).map(key => {
			if (this.props.comps[key].status === "a") {
				return {...this.props.comps[key]}
			}
		});

		const denied = Object.keys(this.props.comps).map(key => {
			if (this.props.comps[key].status === "d") {
				return {...this.props.comps[key]}
			}
		});

		return (
			<div>
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