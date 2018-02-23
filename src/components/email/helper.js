// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const functions = require('firebase-functions');
import React from 'react';

const ReactDOMServer = require('react-dom/server');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const juice = require('juice');
const htmlToText = require('html-to-text');

const pendingHTML = ReactDOMServer.renderToStaticMarkup(
	<div className="container">
		<div className="container--single-column">
			<p>hey you did it</p>
		</div>
	</div>
);


exports.sendEmail = functions.database.ref('/venues/comps').onWrite(e => {
	const transport = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: '25',
		auth: {
			user: 'bfee238b0c6c13',
			pass: '4e01e2509d3513'
		}
	})

	export function sendEmail() {
		transport.sendMail({
			from: 'litseyt@me.com',
			to: 'litsey@me.com',
			subject: 'this is it',
			html: 'made it',
			text: 'made it'
		})
	}
})



// export function sendEmail() {
// 	sgMail.setApiKey('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');
// 	const msg = {
// 		to: 'litseyt@me.com',
// 		from: 'test@example.com',
// 		subject: 'Sending with SendGrid is Fun',
// 		text: 'you did it',
// 		html: '<p>this is it</p>',
// 	};
// 	sgMail.send(msg);
// 	console.log('sent');

// }