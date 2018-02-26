import React from 'react';
import uniqid from 'uniqid'
import {
	formatDateFromEpoch,
	findVenueById,
	findVenueByOwner,
	findVenueByName,
	checkNameAvail,
	findVenueBySlug,
	confirmSlugFormat,
	formatSingleValueFromSnap,
	formatMultipleValuesFromSnap,
	makeNewVenue,
	makeNewRandomVenue,
	convertObjToArr
} from './helpers';

describe('helpers', () => {

	// formatDateFromEpoch
	it('should format the date from epoch', () => {
		const date = formatDateFromEpoch(1519337157845);
		expect(date).toBe('2018.2.22');
	});

	// findVenueById
	it('should find venue object by venue id', async () => {
		const snap = await findVenueById('jd7wvcy9').once('value');
		const { name } = formatSingleValueFromSnap(snap);
		expect(name).toBe('a great relief');
	});

	// findVenueByOwner
	it('should find venue from user object', async () => {
		const fakeUser = {
			uid: 'nCNkhu0sWuTimpvSbiKNNR9R6xG2'
		}
		const snap = await findVenueByOwner(fakeUser).once('value');
		const { id } = formatSingleValueFromSnap(snap);
		expect(id).toBe('jd7wvcy9');
	});

	// findVenueByName
	it('should find all venue names matching input string', async () => {
		const snap = await findVenueByName('a great').once('value');
		const venues = formatMultipleValuesFromSnap(snap)
		expect(venues.length).toBeGreaterThan(0);
		expect(venues[0].name).toMatch(/a\sgreat/);
	});

	// checkNameAvail
	it('should check whether a name is taken or not', async () => {
		const snap = await checkNameAvail('a great relief').once('value');
		const { name } = formatSingleValueFromSnap(snap);
		expect(name).toBe('a great relief');
	});

	// findVenueBySlug
	it('should find a venue by its slug', async () => {
		const snap = await findVenueBySlug('a-great-relief').once('value');
		const { name } = formatSingleValueFromSnap(snap);
		expect(name).toBe('a great relief');
	});

	// confirmSlugFormat
	it('should return false if slug contains non alphanumeric or -', () => {
		const result1 = confirmSlugFormat('this-is-ok')
		expect(result1).toBe(false);

		const result2 = confirmSlugFormat('this-is-*not-ok')
		expect(result2).toBe(true);
	})

	// makeNewVenue
	it('should make a new venue obj', () => {
		const { name, slug, passcode, owner, id } = makeNewVenue('a new band', uniqid(), 'jhkjhskjfhyi');
		expect(name).toBeTruthy();
		expect(slug).toBeTruthy();
		expect(passcode).toBeTruthy();
		expect(owner).toBeTruthy();
		expect(id).toBeTruthy();
	})

	// makeNewRandomVenue
	it('should make a new random venue', () => {
		const { name, slug, passcode } = makeNewRandomVenue()
		expect(name).not.toBeFalsy();
		expect(slug).not.toBeFalsy();
		expect(passcode).not.toBeFalsy();
	});

	it('should convert object to array', () => {
		const obj = {
			one: 'ya',
			two: 87686,
			three: 'some tweet data!'
		}
		expect(convertObjToArr(obj).length).toBe(3);
	});

})
