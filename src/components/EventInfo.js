import React from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

class EventInfo extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {

				const venue = { ...this.props.venue };

				Object.keys(values).forEach(key => {
					if (venue[key] !== values[key]) venue[key] = values[key];
				});

				this.props.updateVenueInfo(venue);
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<FormItem label="Name:">
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please enter a name' }],
						initialValue: this.props.venue.name
					})(
						<Input
							placeholder="Please input a venue name"
						/>
					)}
				</FormItem>
				<FormItem label="URL:">
					{getFieldDecorator('slug', {
						rules: [{ required: true, message: 'Please enter a url' }],
						initialValue: this.props.venue.slug
					})(
						<Input
							placeholder={'your-url'}
							addonBefore="complist.org/request/"
							ref={(input) => { this.slug = input }}
						/>
					)}
				</FormItem>
				<FormItem
					label="Passcode"
				>
					{getFieldDecorator('code', {
						rules: [{ required: true, message: 'Please enter a passcode' }],
						initialValue: this.props.venue.code
					})(
						<Input
							placeholder={'yoUrPassC0de'}
							ref={(input) => { this.code = input }}
						/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">Update Venue Info</Button>
				</FormItem>
			</Form>
		)
	}
}

EventInfo = Form.create({})(EventInfo);

export default EventInfo;