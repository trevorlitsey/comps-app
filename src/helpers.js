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

export function findVenueBySlug(slug) {
	return database
		.child('venues')
		.orderByChild('slug')
		.equalTo(slug)
}

export function insertComp(values, compId, venueId, date = Date.now()) {
	values.id = compId;
	values.status = 'p';
	values.requestDate = date;
	if (!values.guestEmail) values.guestEmail = '';
	database.child('venues').child(venueId).child('comps').child(compId).set({
		...values
	});
}

export function formatDateFromEpoch(epoch) {
	const dateObj = new Date(epoch)
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth() + 1;
	const day = dateObj.getDate();
	return `${year}.${month}.${day}`;
}

export function logIn() {
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