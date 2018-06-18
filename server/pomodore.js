const message = require('./message');

function tick(users) {
    let currTime = new Date().getTime();

    for(let i = 0; i < users.length; i++) {
        let user = users[i];
        if(user.session !== 'neutral') {
            if(currTime - user.start >= user.time) {
                // The timer was for expiration of the session
                if(user.status === 'session') {
                    message.sendMessage(user.id, `Session is over, time for a break of ${user.break_length/1000} seconds`);
                    users.startBreak(user.id);
                }
                // The Timer was for expiration of break
                else { 
                    message.sendMessage(user.id, `Break is over, time for a session of ${user.session_length/1000} seconds`);
                    users.startSession(user.id);
                }
            }
        }
    }
}

module.exports = {
    tick
};