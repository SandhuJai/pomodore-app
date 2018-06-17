const message = require('./message');

function init(app) {
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