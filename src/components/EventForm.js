import React from 'react'
import { DatePicker, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class EventForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
      if (!err) {
				
				const dateObj = values.date._d;
				const year = dateObj.getFullYear() + 1;
				const month = dateObj.getMonth();
				const day = dateObj.getDay();
				const date = `${year}/${month}/${day}`
				
				console.log(date);
				
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