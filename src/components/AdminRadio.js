import React from 'react'

import { Radio, Badge } from 'antd'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const AdminRadio = props =>
	<div>
		<Badge count={props.pendingCount} className="badge"></Badge>
		<RadioGroup onChange={(e) => props.changeView(e.target.value)} defaultValue={props.defaultView} size="large" style={{ display: 'flex', textAlign: 'center' }}>
			<RadioButton value="pending">Pending</RadioButton>
			<RadioButton value="done">Done</RadioButton>
			<RadioButton value="info">Info</RadioButton>
		</RadioGroup>
	</div>

export default AdminRadio;