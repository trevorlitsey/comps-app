import React from 'react';
import Banner from '../Banner';

import renderer from 'react-test-renderer';

it('sums numbers', () => {
	expect(1 + 2).toEqual(3);
});

it('renders link', () => {
	const banner = renderer
		.create(<Banner />)
		.toJSON();
	expect(banner).toMatchSnapshot();
})