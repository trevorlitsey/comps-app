import React from 'react'
import { List, Card } from 'antd';

import EditEventForm from './EditEventForm';

import { formatDateFromEpoch } from '../helpers';

class EventList extends React.Component {

	renderEvent(event) {
		const { date, title, limit, id } = event;
		if (this.props.eventToEdit === event.id) {
			return (
				<Card bordered={false} style={{ width: 350, padding: '10px' }}>
					<EditEventForm key={id} event={this.props.events[this.props.eventToEdit]} updateEventToEdit={this.props.updateEventToEdit} removeEvent={this.props.removeEvent} updateEvent={this.props.updateEvent} />
				</Card>
			)
		} else {
			return (
				<List.Item actions={event ? [<a onClick={() => this.props.updateEventToEdit(id)}>edit</a>] : ''}>
					<List.Item.Meta
						title={event ? `${formatDateFromEpoch(date)} | ${title}` : ''}
						description={`Limit: ${limit}`}
					/>
				</List.Item>
			)
		}
	}

	render() {

		const events = Object.keys(this.props.events).map(key => this.props.events[key])

		return (
			<div>
				<List
					header={<h3>Manage events</h3>}
					dataSource={events}
					renderItem={this.renderEvent.bind(this)}
				/>
			</div>
		)
	}
}

export default EventList;