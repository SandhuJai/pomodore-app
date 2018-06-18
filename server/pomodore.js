const message = require('./message');

function tick(users) {
    let currTime = new Date().getTime();

    for(let i = 0; i < users.length; i++) {
        let user = users[i];
        if(user.session !== 'neutral') {
            // if user is in session mode
            if(user.status === 'session') {
                if(currTime - user.start >= user.session_length) {
                    message.sendMessage(user.id, `Session is over, time for a break of ${user.break_length/1000} seconds`);
                    users.startBreak(user.id);
                }
            }else if(user.status === 'break') {
                if(currTime - user.start >= user.break_length) {
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