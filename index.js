const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";

let transporter = nodemailer.createTransport({
	service: "gmail",
	secure: false,
	port: 25,
	tls: {
		rejectUnauthorized: false
	},
	auth: {
		user: smtp_login,
		pass: smtp_password
	}
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('My portfolio');
});

app.post('/sendMessage', async function (req, res) {

	let {message, contacts, name} = req.body;

	let info = await transporter.sendMail({
		from: 'My profile portfolio',
		to: 'mityaycho@gmail.com',
		subject: 'Job', 
		html: `
		<b>Сообщение из формы обратной связи <h5>my_portfolio_react</h5>!</b>
		<div>Name: ${name}</div>
		<div>Contacts: ${contacts}</div>
		<div>Message: ${message}</div>
		`
	});

	res.send(info);
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});