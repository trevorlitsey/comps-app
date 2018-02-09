import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './css/style.css';
import 'react-datepicker/dist/react-datepicker.css';

import Landing from './components/pages/Landing';
import SignUp from './components/pages/SignUp';
import Request from './components/pages/Request';
import Admin from './components/pages/Admin';
import LogIn from './components/pages/LogIn';

const Root = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/:venueId" component={Request} />
				<Route exact path="/login" component={LogIn} />
				<Route exact path="/admin/:venueId" component={Admin} />
				<Route exact path="/:venueSlug/admin" component={Admin} />
			</Switch>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('main'));