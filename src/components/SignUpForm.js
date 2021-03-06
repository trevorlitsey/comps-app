import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Form, Input, Button } from 'antd';

import { checkNameAvail } from '../helpers';

const FormItem = Form.Item;

class SignUpForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();
		const { setFields } = this.props.form;
		const { passUpVenueName } = this.props;

		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { email, password, venueName } = values;
				passUpVenueName(venueName);
				firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
					if (err.code === "auth/email-already-in-use") {
						setFields({
							email: {
								errors: [new Error('email already in use')],
							},
						});
					}
				});
			}
		});
	}

	confirmNameAvail = (rule, value, callback) => {
		const names = checkNameAvail(value);
		names.once('value', snap => {
			if (snap.val()) {
				callback('sorry, that name is already taken');
			} else {
				callback()
			}
		})
	}

	checkPasswordLength = (rule, value, callback) => {
		if (value && value.length < 6) {
			callback('password must be at least 6 characters long');
		} else {
			callback();
		}
	}

	checkPasswordMatch = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('passwords do not match');
		} else {
			callback();
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="form-container">
				<Form onSubmit={this.handleSubmit}>
					<FormItem style={{ marginBottom: '0' }}>
						{getFieldDecorator('venueName', {
							rules: [{
								required: true, message: 'please enter a name',
							}, {
								validator: this.confirmNameAvail,
							}],
						})(
							<Input
								type="text"
								placeholder="band/venue name"
								required
							/>
						)}
					</FormItem>
					<FormItem style={{ marginBottom: '0' }}>
						{getFieldDecorator('email', {
							rules: [{
								required: true, message: 'please enter an email',
							}],
						})(
							<Input
								type="email"
								placeholder="email"
								required
							/>
						)}
					</FormItem>
					<FormItem style={{ marginBottom: '0' }}>
						{getFieldDecorator('password', {
							rules: [{
								required: true, message: 'please enter a password',
							}, {
								validator: this.checkPasswordLength,
							}],
						})(
							<Input
								type="password"
								placeholder="password"
								required
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('passwordConfirm', {
							rules: [{
								required: true, message: 'please confirm your password',
							}, {
								validator: this.checkPasswordMatch,
							}],
						})(
							<Input
								type="password"
								placeholder="confirm password"
								required
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
								Sign Up
							</Button>
						)}
					</FormItem>
				</Form>
			</div>
		)
	}
}

SignUpForm = Form.create()(SignUpForm);

SignUpForm.propTypes = {
	signUp: PropTypes.func,
	passUpVenueName: PropTypes.func,
}

export default SignUpForm;