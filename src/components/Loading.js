import React from 'react';
import { Spin } from 'antd';

import Nav from './Nav';

const Loading = () =>
	<div className="container">
		<Nav />
		<div className="spin-container"><Spin className="spin" /></div>
	</div>

// no props

export default Loading;