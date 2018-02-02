import React from 'react';
import base from 're-base';

import Banner from '../Banner';
import SignUpForm from '../SignUpForm';

class SignUp extends React.Component {

	render() {
		return (
			<div className="container">
				<Banner text="Sign Up:"/>
				<SignUpForm />
			</div>
		)
	}
}

export default SignUp;