import React from 'react'
import { DatePicker, Form, Input, Button } from 'antd';

import moment from 'moment';

const FormItem = Form.Item;

class EditEventForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {

				// convert date to epoch and record title
				const dateObj = values.date._d;
				const date = dateObj.getTime();
				const title = values.title;
				this.props.addEvent({ date, title });
				this.props.form.resetFields();
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('date', {
						rules: [{ required: true, message: 'Please input a date!' }],
						initialValue: moment(this.props.event.date)
					})(
						<DatePicker
							size="large"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please include an event name!' }],
						initialValue: this.props.event.title
					})(
						<Input
							size="large"
							placeholder="Event name"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button
						htmlType="submit"
						type="primary"
					>
						Update Event
					</Button>
					<Button type="danger">Delete Event</Button>
				</FormItem>
			</Form>
		)
	}
}

EditEventForm = Form.create({})(EditEventForm);

export default EditEventForm;