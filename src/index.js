import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './css/style.css';

import Main from './components/Main';
import Request from './components/Request';

const Root = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/venue/:venueId" component={Request}/>
			</Switch>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('main'));