import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';

import { formatDateFromEpoch } from '../helpers';

const CompsList = props =>
	<List
		itemLayout="horizontal"
		header={props.header}
		dataSource={props.comps}
		renderItem={comp => (
			<List.Item actions={comp && [<a onClick={() => props.updateComp(comp.id, 'p')}>undo</a>]}>
				<List.Item.Meta
					avatar={comp && <Avatar size="small" icon="user" />}
					title={comp && comp.guestName}
					description={comp && props.events && `${formatDateFromEpoch(props.events[comp.event].date)} | ${props.events[comp.event].title}`}
				/>
				<div>{comp.quant} tickets</div>
			</List.Item>
		)}
	/>

CompsList.propTypes = {
	comps: PropTypes.array,
	events: PropTypes.object,
}


export default CompsList;