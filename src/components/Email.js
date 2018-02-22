// todo
// https://www.npmjs.com/package/sendemail

const sendemail = require('sendemail').email; // no api key 
const email = sendemail.email;
sendemail.set_template_directory('./relative/path/to/template/directory');

const person = {
	name: "Jenny",
	email: "your.name+test" + Math.random() + "@gmail.com",
	subject: "Welcome to DWYL :)"
}

email('welcome', person, function (error, result) {
	console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
	console.log(result);
	console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
})