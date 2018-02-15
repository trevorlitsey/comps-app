import React from 'react'
import { DatePicker, Form, Input, InputNumber, Button, Popconfirm, message } from 'antd';

import moment from 'moment';

const FormItem = Form.Item;

class EditEventForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				// convert date to epoch and record title
				values.date = values.date._d.getTime()
				this.props.updateEvent({ ...values }, this.props.event.id);
				this.props.form.resetFields();
			}
		});
	}

	handleDeleteClick(eventId) {
		this.props.removeEvent(eventId)
		message.success(`${this.props.event.title} was successfully deleted`);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { event } = this.props;
		return (
			<Form onSubmit={this.handleSubmit} layout="inline">
				<FormItem>
					{getFieldDecorator('date', {
						rules: [{ required: true, message: 'please input a date' }],
						initialValue: moment(event.date)
					})(
						<DatePicker
							size="large"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'please include an event name' }],
						initialValue: event.title
					})(
						<Input
							size="large"
							placeholder="Event name"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('limit', {
						rules: [{ required: true, message: 'please enter a number' }],
						initialValue: event.limit
					})(
						<InputNumber size="large" min={1} max={100} />
					)}
				</FormItem>
				<FormItem>
					<Button
						htmlType="submit"
						type="primary"
					>
						Save changes
					</Button>
				</FormItem>
				<FormItem>
					<Popconfirm title="are you sure you want to delete this event?" onConfirm={() => this.handleDeleteClick(event.id)} okText="Yes" cancelText="No">
						<Button type="danger">Delete Event</Button>
					</Popconfirm>
				</FormItem>
			</Form >
		)
	}
}

EditEventForm = Form.create({})(EditEventForm);

export default EditEventForm;