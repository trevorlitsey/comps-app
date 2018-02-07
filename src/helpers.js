import { auth, provider, database } from './base'
import firebase from 'firebase';

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

export function	logIn(user) {
		if (firebase.auth().currentUser) {
			return firebase.auth().currentUser;
		}
		auth.signInWithPopup(provider)
			.then(result => {
				return result.user;				
			});
}

export function logOut() {
	auth.signOut()
	.then(() => {
			return null
	});
}