import React from 'react'
import { List } from 'antd';

import EventModal from './EventModal';

import { formatDateFromEpoch } from '../helpers';

class EventList extends React.Component {

	constructor() {
		super();

		this.renderEvent = this.renderEvent.bind(this);

		this.state = {
			eventToEdit: ''
		}
	}

	updateEventToEdit(eventToEdit) {
		this.setState({ eventToEdit });
	}

	renderEvent(event) {
		const { date, title, limit, id } = event;
		return (
			<List.Item actions={event ? [<a onClick={() => this.updateEventToEdit(id)}>edit</a>] : ''}>
				<List.Item.Meta
					title={event ? `${formatDateFromEpoch(date)} | ${title} (${limit})` : ''}
					description={`Limit: ${limit}`}
				/>
			</List.Item>
		)
	}

	render() {

		const events = Object.keys(this.props.events).map(key => this.props.events[key])

		return (
			<div>
				<EventModal event={this.state.eventToEdit} />
				<List
					header={<h3>Manage events</h3>}
					dataSource={events}
					renderItem={this.renderEvent}
				/>
			</div>
		)
	}
}

export default EventList;