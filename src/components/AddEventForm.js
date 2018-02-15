import React from 'react'
import { DatePicker, Form, Input, InputNumber, Button, message } from 'antd';

const FormItem = Form.Item;

class AddEventForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {

				// bug that let's user input a non-number if form submitted w/ enter button
				if (typeof values.limit !== "number") return message.error('limit value must be a number')

				// convert date to epoch
				values.date = values.date._d.getTime();

				this.props.addEvent({ ...values });
				this.props.form.resetFields();
				message.success('event added');
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('date', {
						rules: [{ required: true, message: 'please enter a date' }],
					})(
						<DatePicker
							size="large"
							placeholder="Event date"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'please enter an event name' }],
					})(
						<Input
							size="large"
							placeholder="Event name"
						/>
					)}
				</FormItem>
				<FormItem>
					<span className="ant-form-text">Limit: </span>
					{getFieldDecorator('limit', {
						rules: [{ required: true, message: 'please enter a number' }],
						initialValue: 10
					})(
						<InputNumber size="large" min={1} max={100} />
					)}
				</FormItem>
				<FormItem>
					<Button
						htmlType="submit"
						type="primary"
					>
						Add Event
					</Button>
				</FormItem>
			</Form>
		)
	}
}

AddEventForm = Form.create({})(AddEventForm);

export default AddEventForm;