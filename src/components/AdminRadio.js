import React from 'react'

import { Radio } from 'antd'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdminRadio extends React.Component {
	render() {
		return (
			<RadioGroup onChange={(e) => this.props.changeView(e.target.value)} defaultValue="pending" size="large" style={{ display: 'flex', textAlign: 'center' }}>
				<RadioButton value="pending">Pending</RadioButton>
				<RadioButton value="done">Done</RadioButton>
				<RadioButton value="info">Info</RadioButton>
			</RadioGroup>
		)
	}
}

export default AdminRadio;