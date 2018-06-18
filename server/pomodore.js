const message = require('./message');

function tick(users) {
    let currTime = new Date().getTime();
    users.forEach(user => {
        if(user.session !== 'neutral') {
            if(currTime - user.start >= user.time) {
                // The timer was for expiration of the session
                if(user.status === 'session') {
                    message.sendMessage(user.id, `Session is over, time for a break of ${user.break_length/(60*1000)} minutes`);
                    users.startBreak(user.id);
                }
                // The Timer was for expiration of break
                else { 
                    message.sendMessage(user.id, `Break is over, time for a session of ${user.session_length/(60*1000)} minutes`);
                    users.startSession(user.id);
                }
            }
        }
    });
}

module.exports = {
    tick, 
    startSession
};