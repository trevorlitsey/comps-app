import { message } from 'antd';
import { auth, database } from './base'

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

export function checkNameAvail(input) {
	return database
		.child('venues')
		.orderByChild('name')
		.equalTo(input)
}

export function findVenueBySlug(slug) {
	return database
		.child('venues')
		.orderByChild('slug')
		.equalTo(slug)
}

export function confirmSlugFormat(slug) {
	return RegExp(/[^A-Za-z-]/).test(slug);
}

export function formatSingleValueFromSnap(snap) {
	return snap.val()[Object.keys(snap.val())[0]];
}

export function formatMultipleValuesFromSnap(snap) {
	return Object.keys(snap.val()).map(key => snap.val()[key]);
}

export function insertComp(values, compId, venueId, date = Date.now()) {
	values.id = compId;
	values.status = 'p';
	values.requestDate = date;
	if (!values.guestEmail) values.guestEmail = '';
	return database.child('venues').child(venueId).child('comps').child(compId).set({
		...values
	}, err => console.error(err));
}

export function formatDateFromEpoch(epoch) {
	const dateObj = new Date(epoch)
	const [year, month, day] = [dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()];
	return `${year}.${month}.${day}`;
}

export function logOut() {
	auth.signOut()
		.then(() => {
			message.success('you are signed out');
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

export async function sendEmail(compId, venueId, status) {
	const url = `${process.env.REACT_APP_DEC_API_URL}?c=${compId}&v=${venueId}&s=${status}`
	const options = {
		method: 'POST',
		mode: 'no-cors'
	}
	fetch(url, options);
}

export function convertObjToArr({ ...obj }) {
	return Object.keys(obj)
		.map((key) => obj[key]);
}

export function prepareCompsForDownload({ ...compsObj }, { ...events }) {
	const CSVdata = Object.keys(compsObj)
		.map((key) => {
			const comp = compsObj[key];
			comp.date = formatDateFromEpoch(comp.date);
			comp.event = convertObjToArr(events[comp.event]);
			return comp;
		});
	return CSVdata;
}