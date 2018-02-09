import { auth, provider, database } from './base'
import firebase from 'firebase';

export function findOwnerByVenue(id) {
	return database
		.child('venues')
		.orderByChild('id')
		.equalTo(id)
}

export function findVenueById(id) {
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

export function findVenueByName(input) {
	return database
		.child('venues')
		.orderByChild('name')
		.startAt(input)
		.endAt(input + '\uf8ff')
}

export function StringToXML(str) {
	//code for IE
	return (new DOMParser()).parseFromString(str, "text/xml");
}

export function logIn() {
	if (firebase.auth().currentUser) {
		return firebase.auth().currentUser;
	}
	auth.signInWithPopup(provider)
		.then(result => {
			console.log('here');

			return result.user;
		});
}

export function logOut() {
	auth.signOut()
		.then(() => {
			return null
		});
}