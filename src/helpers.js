import { database }  from './base'

export function findVenueOwner(id = '') {	
	return database
		.child('venues')
		.orderByChild('id')
		.equalTo(id)
}