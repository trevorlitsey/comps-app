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
	const [year, month, day] = [dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()];
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

function rando(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w-]+/g, '')       // Remove all non-word chars
		.replace(/--+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}

function getFunName() {
	const adjectives = ['adorable', 'beautiful', 'clean', 'drab', 'elegant', 'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'old-fashioned', 'plain', 'quaint', 'sparkling', 'ugliest', 'unsightly', 'angry', 'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 'obnoxious', 'panicky', 'repulsive', 'scary', 'thoughtless', 'uptight', 'worried'];

	const nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];

	return `${rando(adjectives)} ${rando(adjectives)} ${rando(nouns)}`;
}

export function makeNewVenue(name, id, owner) {
	const slug = slugify(name);
	const passcode = 'changeMe!';
	return { name, slug, passcode, owner, id };
}

export function registerNewVenue(venue) {
	database
		.child('venues')
		.child(venue.id)
		.set(venue)
}

export function makeNewRandomVenue() {
	const name = getFunName();
	const slug = slugify(name);
	const passcode = slug;
	return { name, slug, passcode };
}