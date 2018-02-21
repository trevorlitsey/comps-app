import React from 'react';
import firebase from 'firebase';
import { Form, Button, Input } from 'antd';

const FormItem = Form.Item;

class LogInForm extends React.Component {


	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(e) {
		e.preventDefault();
		const { setFields } = this.props.form;

		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { email, password } = values;
				firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
					setFields({
						submit: {
							errors: [new Error('incorrect email and/or password')],
						},
					});
				});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="form-container">
				<Form onSubmit={this.handleSubmit}>
					<FormItem style={{ marginBottom: '0' }}>
						{getFieldDecorator('email', {
							rules: [{
								required: true, message: 'please enter your email',
							}],
						})(
							<Input
								type="email"
								placeholder="email"
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{
								required: true, message: 'please enter your password',
							}],
						})(
							<Input
								type="password"
								placeholder="password"
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('submit')(
							<Button
								style={{ width: '100%' }}
								type="primary"
								htmlType="submit"
							>
								Log In
							</Button>
						)}
					</FormItem>
				</Form>
			</div>
		)
	}
}

LogInForm = Form.create()(LogInForm);

export default LogInForm;