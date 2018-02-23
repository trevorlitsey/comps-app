import Rebase from 're-base';
import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyC8nTztUR_j5N7s7XuHsGho9b3-i1rLXk8",
	authDomain: "comps2-2970e.firebaseapp.com",
	databaseURL: "https://comps2-2970e.firebaseio.com",
	projectId: "comps2-2970e",
	storageBucket: "",
	messagingSenderId: "188721454833"
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database().ref();
export default base;