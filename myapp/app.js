const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
var connection  = require('./database/config.js');

var registrationRouter = require('./routes/registration-route.js');
var loginRouter = require('./routes/login-route.js');
var dashboardRouter = require('./routes/dashboard-route.js');
var logoutRouter = require('./routes/logout-route.js');

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {

	let username = request.body.username;
	let password = request.body.password;

	if (username && password) {
	
		connection.query('SELECT * FROM Users WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
		
			if (error) throw error;
			
			if (results.length > 0) {
		
				request.session.loggedin = true;
				request.session.username = username;
					response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
	
		response.send('Welcome back, ' + request.session.username + '!');
	} else {

		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000,() => {
  console.log(`Server Started...listening on port 3000`)
})
