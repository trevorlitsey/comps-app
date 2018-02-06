import React from 'react'
import { DatePicker, Form, Input, Button, Label } from 'antd';
const FormItem = Form.Item;

<form onSubmit={this.addEvent}>

</form>

class EventForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
      if (!err) {
				const date = values.date._d;
				const title = values.title;
				this.props.addEvent({ date, title });	
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('date', {
						rules: [{ required: true, message: 'Please input a date!' }],
					})(
						<DatePicker placeholder="Event date" />
					)}
				</FormItem>
				<FormItem>
				{getFieldDecorator('title', {
					rules: [{ required: true, message: 'Please include an event name!' }],
				})(
					<Input placeholder="Event name" />
				)}
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