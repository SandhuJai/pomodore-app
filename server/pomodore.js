const message = require('./message');

function tick(users) {

    let currTime = new Date().getTime();

    console.log(users);

    Array.prototype.forEach.call(users, user => {
        console.log(user);
        if(user.session !== 'neutral') {
            // if user is in session mode
            if(user.status === 'session') {
                if(currTime - user.start >= user.session_length) {
                    console.log(user.id, `Session is over, time for a break of ${user.break_length/1000} seconds`);
                    message.sendMessage(user.id, `Session is over, time for a break of ${user.break_length/1000} seconds`);
                    users.startBreak(user.id);
                }
            }else if(user.status === 'break') {
                if(currTime - user.start >= user.break_length) {
                    console.log(user.id, `Break is over, time for a session of ${user.session_length/1000} seconds`);
                    message.sendMessage(user.id, `Break is over, time for a session of ${user.session_length/1000} seconds`);
                    users.startSession(user.id);
                }
            }
        }
    });
}

module.exports = {
    tick
};