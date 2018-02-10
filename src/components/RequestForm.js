import React from 'react'
import uniqid from 'uniqid';
import { Form, Input, Select, InputNumber, Button } from 'antd';
import { insertComp } from '../helpers';

const FormItem = Form.Item;
const Option = Select.Option;



class RequestForm extends React.Component {

	constructor() {
		super();

		this.renderEvent = this.renderEvent.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	renderEvent(key) {
		const event = this.props.venue.events[key];

		return (
			<Option key={key} value={key}>{event.date} {event.title}</Option>
		)
	}


	handleSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				// enter comp info into firebase
				values.status = "p";

				insertComp(values, uniqid(), this.props.venue.id)

				// todo, make thank you for submitting form
			}
		});


	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const events = { ...this.props.venue.events };

		const noEvents = <Option>no events are currently listed for this venue</Option>

		return (
			<div className="form-container">
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						label="Guest name: "
						margin={0}
					>
						{getFieldDecorator('guestName', {
							rules: [{ required: true, message: 'Please enter a name!' }],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
						label="Guest email (optional): "
					>
						{getFieldDecorator('guestEmail')(
							<Input />
						)}
					</FormItem>
					<FormItem
						label="Event: "
					>
						{getFieldDecorator('event', {
							rules: [{ required: true, message: 'please select an event' }],
						})(
							<Select
								placeholder="Select event"
							>
								{events ? Object.keys(events).map(this.renderEvent) : noEvents}
							</Select>
						)}
					</FormItem>
					<FormItem
						label="Number of Tickets: "
					>
						{getFieldDecorator('quant', {
							rules: [{ required: true, message: 'please imput a number' }],
							initialValue: 2
						})(
							<InputNumber min={1} max={10} />
						)}
					</FormItem>
					<FormItem
						label="Requester email: "
					>
						{getFieldDecorator('requesterEmail', {
							rules: [{ required: true, message: 'please enter an email' }],
						}
						)(
							<Input />
						)}
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit">
							Submit
          </Button>
					</FormItem>
				</Form>
			</div>
		)
	}
}

RequestForm = Form.create()(RequestForm);

export default RequestForm;