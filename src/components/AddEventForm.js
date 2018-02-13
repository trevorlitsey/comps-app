import React from 'react'
import { DatePicker, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class AddEventForm extends React.Component {

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
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('date', {
						rules: [{ required: true, message: 'Please input a date!' }],
					})(
						<DatePicker
							size="large"
							placeholder="Event date"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please include an event name!' }],
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
						Add Event
					</Button>
				</FormItem>
			</Form>
		)
	}
}

AddEventForm = Form.create({})(AddEventForm);

export default AddEventForm;