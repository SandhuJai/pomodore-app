// NETWORK CONSTANTS
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// LOCAL CONSTANTS
const str = 'pomodore_app';
const message = require('./server/message');
const routes = require('./server/routes');
const {Users} = require('./server/users');
const pomodore = require('./server/pomodore')

// List of users currently joined in the chat
let users = new Users();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Setting all routes
routes.init(app, users);

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});

// Set a clock
setInterval(() => {
    pomodore.tick(users);
}, 5000);