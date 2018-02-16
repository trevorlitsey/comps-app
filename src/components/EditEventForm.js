import React from 'react'
import { DatePicker, Form, Input, InputNumber, Button, Popconfirm, message } from 'antd';

import moment from 'moment';

const FormItem = Form.Item;

class EditEventForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {

				// bug that let's user input a non-number if form submitted w/ enter button
				if (typeof values.limit !== "number") return message.error('limit value must be a number')

				// convert date to epoch
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
		const { date, title, limit, id } = this.props.event;
		return (
			<Form onSubmit={this.handleSubmit}>
				<p onClick={() => this.props.updateEventToEdit('')} className="btn--close" style={{ textAlign: 'right', margin: '0' }}>x</p>
				<FormItem style={{ marginBottom: '0' }}>
					<label>Date: </label>
					{getFieldDecorator('date', {
						rules: [{ required: true, message: 'please enter a date' }],
						initialValue: moment(date)
					})(
						<DatePicker />
					)}
				</FormItem>
				<FormItem style={{ marginBottom: '0' }}>
					<label>Name: </label>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'please enter a name' }],
						initialValue: title
					})(
						<Input
							placeholder="Event name"
						/>
					)}
				</FormItem>
				<FormItem>
					<label>Limit: </label>
					{getFieldDecorator('limit', {
						rules: [{ required: true, message: 'please enter a number' }],
						initialValue: limit
					})(
						<InputNumber min={1} max={100} />
					)}
				</FormItem>
				<FormItem
					style={{ marginBottom: '5px' }}
				>
					<Button
						htmlType="submit"
						type="primary"
					>
						Save changes
					</Button>
				</FormItem>
				<FormItem style={{ marginBottom: '5px' }}>
					<Popconfirm title="are you sure you want to delete this event?" onConfirm={() => this.handleDeleteClick(id)} okText="Yes" cancelText="No">
						<Button type="danger">Delete Event</Button>
					</Popconfirm>
				</FormItem>
			</Form >
		)
	}
}

EditEventForm = Form.create({})(EditEventForm);

export default EditEventForm;