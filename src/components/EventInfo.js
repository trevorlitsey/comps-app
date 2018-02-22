import React from 'react';
import { Form, Input, Button, message } from 'antd';

import { checkNameAvail, findVenueBySlug } from '../helpers';

const FormItem = Form.Item;

class EventInfo extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.updateVenueInfo(values);
				return message.success('venue info updated');
			}
			return message.error('please fix errors');
		});
	}

	confirmNameAvail = (rule, value, callback) => {
		if (value === this.props.venue.name) return callback(); // don't bother is name hasn't changed
		const names = checkNameAvail(value);
		names.once('value', snap => {
			if (snap.val()) {
				callback('sorry, that name is already taken');
			} else {
				callback()
			}
		})
	}

	confirmSlugAvail = (rule, value, callback) => {
		if (value === this.props.venue.slug) return callback(); // don't bother is slug hasn't changed
		const names = findVenueBySlug(value);
		names.once('value', snap => {
			if (snap.val()) callback('sorry, that url is already taken');
			else callback()
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { venue } = this.props;
		return (
			<Form onSubmit={this.handleSubmit}>
				<h3>Manage info</h3>
				<FormItem label="Name:" style={{ marginBottom: '0' }}>
					{getFieldDecorator('name', {
						rules: [{
							required: true, message: 'please enter a name'
						}, {
							validator: this.confirmNameAvail,
						}],
						initialValue: venue.name
					})(
						<Input
							placeholder="Venue name"
							required
						/>
					)}
				</FormItem>
				<FormItem label="URL:" style={{ marginBottom: '0' }}>
					{getFieldDecorator('slug', {
						rules: [{
							required: true, message: 'please enter a url'
						}, {
							validator: this.confirmSlugAvail,
						}],
						initialValue: venue.slug
					})(
						<Input
							placeholder={'your-url'}
							addonBefore="complist.org/request/"
							required
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