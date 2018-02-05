import React from 'react'

class Toggle extends React.Component {
	render() {
		return (
			<div className="container--toggle">
				<div className="well active">{this.props.text1}</div>
				<div className="well">{this.props.text2}</div>
			</div>
		)
	}
}

export default Toggle;