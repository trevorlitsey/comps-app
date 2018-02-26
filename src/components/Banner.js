import React from 'react';
import PropTypes from 'prop-types';

const Banner = props =>
	<div className="container__banner margin-auto width-420">
		<h2 className="lobster">{props.text}</h2>
	</div>

Banner.propTypes = {
	text: PropTypes.string,
}

export default Banner;