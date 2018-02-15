import React from 'react'

import { Radio, Badge } from 'antd'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdminRadio extends React.Component {
	render() {
		return (
			<div>
				<Badge count={this.props.pendingCount} className="badge"></Badge>
				<RadioGroup onChange={(e) => this.props.changeView(e.target.value)} defaultValue={this.props.defaultView} size="large" style={{ display: 'flex', textAlign: 'center' }}>
					<RadioButton value="pending">Pending</RadioButton>
					<RadioButton value="done">Done</RadioButton>
					<RadioButton value="info">Info</RadioButton>
				</RadioGroup>
			</div>
		)
	}
}

export default AdminRadio;