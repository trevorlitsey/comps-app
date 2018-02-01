import React from 'react'

class Banner extends React.Component {
	render() {

		const text = this.props.text;

		return (
			<div className="container__banner">
				<h2 className="lobster">{text}</h2>
			</div>
		)
	}
}

export default Banner;