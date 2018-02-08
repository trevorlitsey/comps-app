import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
const FormItem = Form.Item;

class EventInfo extends React.Component {

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
      if (!err) {
				
				const name = values.name;
				const slug = values.slug;
				const code = values.code;
				
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
					})(
						<Input 
						placeholder="Please input a venue name"
						defaultValue={this.props.venue.name} 
						/>
					)}
					</FormItem>
					<FormItem label="URL:">
						{getFieldDecorator('slug', {
							rules: [{ required: true, message: 'Please enter a url' }],
						})(
						<Input 
							placeholder={'your-url'} 
							defaultValue={this.props.venue.slug} 
							addonBefore="complist.org/request/"
							ref={ (input) => { this.slug = input } }
						/>
					)}
					</FormItem>
					<FormItem
					label="Passcode"
					>
					{getFieldDecorator('code', {
						rules: [{ required: true, message: 'Please enter a passcode' }],
					})(
					<Input 
						placeholder={'yoUrPassC0de'} 
						defaultValue={this.props.venue.code} 
						ref={ (input) => { this.code = input } }
					/>
					)}
				</FormItem>
				<FormItem>
					<Button type="default" htmlType="submit">Update Venue Info</Button>
				</FormItem>
			</Form>
		)
	}
}

EventInfo = Form.create({})(EventInfo);

export default EventInfo;