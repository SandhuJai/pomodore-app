const message = require('./message');

// Learn to differentiate between object and array
function tick(usersObject) {

    // get the current time of the day
    let currTime = new Date().getTime();

    let usersArray = usersObject.users;

    usersArray.forEach(user => {
        console.log(user);
        if(user.session !== 'neutral') {
            // if user is in session mode
            if(user.status === 'session') {
                if(currTime - user.start >= user.session_length) {
                    console.log(user.id, `Session is over, time for a break of ${user.break_length/1000} seconds`);
                    message.sendMessage(user.id, `Session is over, time for a break of ${user.break_length/1000} seconds`);
                    usersObject.startBreak(user.id);
                }
            }else if(user.status === 'break') {
                if(currTime - user.start >= user.break_length) {
                    console.log(user.id, `Break is over, time for a session of ${user.session_length/1000} seconds`);
                    message.sendMessage(user.id, `Break is over, time for a session of ${user.session_length/1000} seconds`);
                    usersObject.startSession(user.id);
                }
            }
        }
    });
}

module.exports = {
    tick
};
