import { auth, provider, database } from './base'

export function findOwnerByVenue(id) {
	return database
		.child('venues')
		.orderByChild('id')
		.equalTo(id)
}

export function findVenueByOwner(user) {
	return database
		.child('venues')
		.orderByChild('owner')
		.equalTo(user.uid)
}

export function	togLog(user) {
	if (!user) {
		auth.signInWithPopup(provider)
			.then(result => {
				return result.user;				
			});
	} else {
		auth.signOut()
		.then(() => {
				return null
		});
	}
}