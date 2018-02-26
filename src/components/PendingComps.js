import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, message } from 'antd';

import { formatDateFromEpoch } from '../helpers';

import EventFilterOptions from './EventFilterOptions';

class PendingComps extends React.Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			sortState: "eventDate-asc",
			filter: ''
		}
	}

	handleClick = sortState =>
		this.setState({ sortState })

	checkIfRoomToApprove(comp, status) {
		// stop request from going through if not enough avail
		const left = this.props.currentTotals[comp.event].limit - this.props.currentTotals[comp.event].count;
		if (comp.quant > left) return message.error('there is not enough availability for this request')

		this.props.updateComp(comp.id, status)
	}

	render() {

		let pending = this.props.comps && Object.keys(this.props.comps)
			.map(id => this.props.comps[id])
			.filter(comp => comp.status === "p");

		if (!this.props.comps) {
			// do nothing if no comps yet
		} else if (!this.state.sortState || this.state.sortState === "eventDate-asc") {
			// default
			pending.sort((compA, compB) => this.props.events[compA.event].date - this.props.events[compB.event].date)
		} else if (this.state.sortState === "eventDate-desc") {
			// sort by event, descending
			pending.sort((compA, compB) => this.props.events[compB.event].date - this.props.events[compA.event].date)
		} else {
			// filter by event
			pending = pending.filter(comp => comp.event === this.state.sortState);
		}

		return (
			<div className="form-container">
				<EventFilterOptions handleClick={this.handleClick} events={this.props.events} />
				<List
					itemLayout="horizontal"
					header="Pending"
					dataSource={pending}
					renderItem={comp => (
						<List.Item actions={comp ? [<a onClick={() => this.checkIfRoomToApprove(comp, 'a')}>approve</a>, <a onClick={() => this.props.updateComp(comp.id, 'd')}>deny</a>] : ''}>
							<List.Item.Meta
								avatar={comp ? <Avatar size="small" icon="user" /> : ''}
								title={comp ? comp.guestName : ''}
								description={comp ? `${formatDateFromEpoch(this.props.events[comp.event].date)} | ${this.props.events[comp.event].title}` : 'none yet!'}
							/>
							<div>{comp.quant} tickets ({this.props.currentTotals[comp.event].limit - this.props.currentTotals[comp.event].count} left)</div>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}

PendingComps.propTypes = {
	updateComp: PropTypes.func,
	comps: PropTypes.object,
	events: PropTypes.object,
	currentTotals: PropTypes.object,
}

export default PendingComps;