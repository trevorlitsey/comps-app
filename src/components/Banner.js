import React from 'react'

const Banner = props =>
	<div className="container__banner margin-auto width-420">
		<h2 className="lobster">{props.text}</h2>
	</div>

export default Banner;