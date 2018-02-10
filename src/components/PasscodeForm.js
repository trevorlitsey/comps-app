import React from 'react'
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

class PasscodeForm extends React.Component {

	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.code != this.props.venue.code) {
					this.props.form.setFields({
						code: {
							value: '',
							errors: [new Error('passcode does not match')],
						},
					});
				} else {
					this.props.codeSuccess(values.code);
				}
			}
		});
	}

	render() {

		const { getFieldDecorator } = this.props.form;

		return (
			<div className="form-container" >
				<Form onSubmit={this.handleSubmit}>
					<FormItem label="Passcode:">
						{getFieldDecorator('code', {
							rules: [{
								required: true, message: 'Please enter the band/venue passcode',
							}],
						})(
							<Input
								type="password"
								placeholder="band/venue passcode"
							/>
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

PasscodeForm = Form.create()(PasscodeForm);

export default PasscodeForm;