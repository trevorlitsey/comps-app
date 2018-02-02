import Rebase from 're-base';
import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyCBC7-pECLK7sG3tmAYz0BX-iCdp09YLfI",
	authDomain: "comps-c8b78.firebaseapp.com",
	databaseURL: "https://comps-c8b78.firebaseio.com"
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export default base;