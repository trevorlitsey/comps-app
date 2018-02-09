import React from 'react'
import { Form, Input, Select, InputNumber, Button } from 'antd';
import { findVenueBySlug } from '../helpers';
const FormItem = Form.Item;
const Option = Select.Option;

class RequestForm extends React.Component {

	constructor() {
		super();

		this.renderEvent = this.renderEvent.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			venue: ''
		}

	}

	componentWillMount() {
		const venuePromise = findVenueBySlug(this.props.venueSlug)
		venuePromise.once('value', snap => {
			const venue = snap.val()[Object.keys(snap.val())[0]];
			this.setState({ venue });
		})
	}

	renderEvent(key) {
		const event = this.state.venue.events[key];
		console.log(key);
		console.log(event);


		return (
			<Option key={key} value={key}>{event.date} {event.title}</Option>
		)
	}


	handleSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				// todo, enter user info into firebase


				// todo, make thank you for submitting form
			}
		});


	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const events = { ...this.state.venue.events };

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
							rules: [{ required: true, message: 'Please select an event' }],
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
						{getFieldDecorator('input-number', {
							rules: [{ required: true, message: 'Please imput a number!' }],
							initialValue: 2
						})(
							<InputNumber min={1} max={10} />
						)}
					</FormItem>
					<FormItem
						label="Requester email: "
					>
						{getFieldDecorator('requesterEmail', {
							rules: [{ required: true, message: 'Please enter an email' }],
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