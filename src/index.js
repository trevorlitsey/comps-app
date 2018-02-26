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
import NotFound from './components/pages/NotFound';

require('dotenv').config()

const Root = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/admin/signup" component={SignUp} />
				<Route exact path="/admin/login" component={LogIn} />
				<Route exact path="/admin/:venueId" component={Admin} />
				<Route exact path="/:venueSlug" component={Request} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('main'));