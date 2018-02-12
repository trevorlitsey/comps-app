import React from 'react'
import { Menu, Icon, Dropdown, List, Avatar } from 'antd';

import SortFilter from './SortFilter';
import CompsListApproved from './CompsListApproved';

class ApprovedComps extends React.Component {
	render() {

		const compsArray = Object.keys(this.props.comps).map(id => this.props.comps[id]);
		const approved = compsArray.filter(comp => comp.status === "a")
		const denied = compsArray.filter(comp => comp.status === "d")

		return (
			<div className="form-container">
				<SortFilter />
				<CompsListApproved events={this.props.events} comps={approved} updateComp={this.props.updateComp} />
				<CompsListApproved events={this.props.events} comps={denied} updateComp={this.props.updateComp} />
			</div>
		)
	}
}

export default ApprovedComps;