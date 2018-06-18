// NETWORK CONSTANTS
const request = require('request');

// LOCAL CONSTANTS
const ACCESS_TOKEN = 'EAADPMq4B3BABAL6ae7nqUsdJdPqZAqOgLSwjZCEmhD0CeodCUYipKb9VSsDRpBDJKZBrVSyrPXbgZCZCYAm5HulIQ5IVB3iWa9wgCvUtOHpdHz3ZAzzcndehZApxsF1CdTbcctyuccqgdipqTMtZAoS9lL3nSyZCkrwVJAPHPWzl18nsz2V8WvS8C';

// sends message as a response
function sendResponse(event) {
    let sender = event.sender.id;
    let text = event.message.text;

    if(text === 'login') {
        sendMessage(sender, 'Logged in to the Pomodore Session');
    }else if(text === 'start') {
        sendMessage(sender, 'Your new pomodore session has been started');
    }else if(text === 'logout') {
        sendMessage(sender, 'Logged out of the Pomodore Session');
    }else if(text === 'end') {
        sendMessage(sender, 'Your Task is completed. Noted');
    }else {
        sendMessage(sender, 'Can\'t understand your command');
    }
}

// function that replies to the user with text
function sendMessage(sender_id, text) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender_id},
            message: {text: text}
        }
    }, (err, res) => {
        if(err) {
            console.log('Error Sending Messages: ', err);
        }else if(res.body.err) {
            console.log('Error: ', res.body.err);
        }
    });
}

module.exports = {
    sendResponse,
    sendMessage
};