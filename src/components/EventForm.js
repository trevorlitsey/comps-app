import React from 'react'
import { DatePicker, Form, Input, Button, Label } from 'antd';
const FormItem = Form.Item;

<form onSubmit={this.addEvent}>

</form>

class EventForm extends React.Component {
	render() {
		return(
			<Form layout="inline" onSubmit={this.props.addEvent}>
				<FormItem>
					<DatePicker placeholder="Event date" />
				</FormItem>
				<FormItem>
					<Input placeholder="Event name" />
				</FormItem>
				<FormItem>
					<Button
						htmlType="submit"
					>
						Add Event
					</Button>
				</FormItem>
			</Form>
		)
	}
}

EventForm = Form.create({})(EventForm);

export default EventForm;