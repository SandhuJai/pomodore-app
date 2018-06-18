const message = require('./message');

function init(app, users) {
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
                        // Call Message.js to send a response
                        console.log(event);
                        if(event.message.text === 'login') {
                            users.addUser(event.sender.id);
                        }else if(event.message.text === 'logout') {
                            users.removeUser(event.sender.id);
                        }else if(event.message.text === 'start') {
                            users.startSession(event.sender.id);
                        }else if(event.message.text === 'end') {
                            users.endSession(event.sender.id);
                        }else if(event.message.text === 'status') {
                            let sessionTimeLeft = users.timeLeft(event.sender.id);
                            if(sessionTimeLeft.type === undefined) {
                                message.sendMessage(event.sender.id, 'User Not found');
                            }else if(sessionTimeLeft.type === 'session') {
                                message.sendMessage(event.sender.id, `You have ${sessionTimeLeft.time/1000} seconds left in your session`);
                            }else if(sessionTimeLeft.type === 'break'){
                                message.sendMessage(event.sender.id, `You have ${sessionTimeLeft.time/1000} seconds left in your break`);
                            }else if(sessionTimeLeft.type === 'neutral') {
                                message.sendMessage(event.sender.id, 'You are in neutral mode');
                            }else {
                                message.sendMessage(event.sender.id, 'Can\'t understand status');
                            }
                        }
                        message.sendResponse(event);
                    }
                });
            });
            res.status(200).end();
        }
    });

}

module.exports = {
    init
};