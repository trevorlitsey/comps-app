import React from 'react';
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class EventInfo extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.updateVenueInfo(values);
				message.success('venue info updated');
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { venue } = this.props;
		return (
			<Form onSubmit={this.handleSubmit}>
				<h3>Manage info</h3>
				<FormItem label="Name:" style={{ marginBottom: '0' }}>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'please enter a name' }],
						initialValue: venue.name
					})(
						<Input
							placeholder="Venue name"
						/>
					)}
				</FormItem>
				<FormItem label="URL:" style={{ marginBottom: '0' }}>
					{getFieldDecorator('slug', {
						rules: [{ required: true, message: 'please enter a url' }],
						initialValue: venue.slug
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
					{getFieldDecorator('passcode', {
						rules: [{ required: true, message: 'please enter a passcode' }],
						initialValue: venue.passcode
					})(
						<Input
							placeholder={'Passc0de'}
							ref={(input) => { this.passcode = input }}
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