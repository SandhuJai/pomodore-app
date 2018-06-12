const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const ACCESS_TOKEN = 'EAADPMq4B3BABAL6ae7nqUsdJdPqZAqOgLSwjZCEmhD0CeodCUYipKb9VSsDRpBDJKZBrVSyrPXbgZCZCYAm5HulIQ5IVB3iWa9wgCvUtOHpdHz3ZAzzcndehZApxsF1CdTbcctyuccqgdipqTMtZAoS9lL3nSyZCkrwVJAPHPWzl18nsz2V8WvS8C';
const str = 'pomodore_app';

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot');
});

// for Facebook verification
app.get('/webhook', (req, res) => {
    if (req.query['hub.mode'] && req.query['hub.verify_token'] === str) {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      res.status(403).end();
    }
  });

/* Handling all messenges */
app.post('/webhook', (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message && event.message.text) {
                    sendMessage(event);
                }
            });
        });
        res.status(200).end();
    }
});

// Function that sends the message
function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: replyText(text)}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}

// Function that chooses the particular reply
function replyText(text) {
    if(text === 'start') {
        return 'Your New Pomodore Session has been started';
    }else {
        return 'Sorry! Can\' recognize this command';
    }
}

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});