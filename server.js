// NETWORK CONSTANTS
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// LOCAL CONSTANTS
const str = 'pomodore_app';
const message = require('./server/message');
const {Users} = require('./server/users');
const routes = require('./server/routes');

// List of Users
let users = new Users();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Setting all routes
routes.init(app);

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});