import React from 'react';
import { Form } from 'antd';

import { logIn } from '../helpers'

const LogInForm = () =>
	<div className="form-container">
		<button className="button--submit" onClick={logIn}>Log in with Google >></button>
	</div>

export default LogInForm;