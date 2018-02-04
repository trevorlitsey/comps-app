import { database, auth, provider }  from './base'
import firebase from 'firebase';

export function findVenueOwner(id) {	
	return database
		.child('venues')
		.orderByChild('id')
		.equalTo(id)
}