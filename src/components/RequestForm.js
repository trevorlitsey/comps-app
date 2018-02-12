import React from 'react'
import uniqid from 'uniqid';
import { Form, Input, Select, InputNumber, Button, Row } from 'antd';
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
				insertComp(values, uniqid(), this.props.venue.id)
				// todo, make thank you for submitting form
				this.props.formSubmitted(true);
			}
		});
	}

	render() {

		const { getFieldDecorator } = this.props.form;
		const events = { ...this.props.venue.events };

		const noEvents = <Option>no events are currently listed for this venue</Option>

		return (
			<div className="form-container">
				<Form onSubmit={this.handleSubmit} style={{ justify: 'space-between' }}>
					<FormItem
						margin={0}
					>
						{getFieldDecorator('guestName', {
							rules: [{ required: true, message: 'Please enter a name' }],
						})(
							<Input size="large" placeholder="Guest name" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('guestEmail')(
							<Input size="large" placeholder="Guest email (optional)" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('requesterEmail', {
							rules: [{ required: true, message: 'please enter an email' }],
						}
						)(
							<Input size="large" placeholder="Requester email" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('event', {
							rules: [{ required: true, message: 'please select an event' }],
						})(
							<Select
								size="large"
								placeholder="Select event"
							>
								{events ? Object.keys(events).map(this.renderEvent) : noEvents}
							</Select>
						)}
					</FormItem >
					<FormItem>
						<span className="ant-form-text">Number of tickets:</span>
						{getFieldDecorator('quant', {
							rules: [{ required: true, message: 'please input a number' }],
							initialValue: 2
						})(
							<InputNumber size="large" min={1} max={10} />
						)}

					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Submit
          </Button>
					</FormItem>
				</Form>
			</div >
		)
	}
}

RequestForm = Form.create()(RequestForm);

export default RequestForm;