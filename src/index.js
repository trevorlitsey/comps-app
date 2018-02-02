import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './css/style.css';

import Landing from './components/pages/Landing';
import Request from './components/pages/Request';
import SignUp from './components/pages/SignUp';

const Root = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/venue/:venueId" component={Request}/>
			</Switch>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('main'));