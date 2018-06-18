class Users {
    constructor() {
        this.users = [];
    }

    addUser(sender_id) {
        let user = {
            id: sender_id,
            start: null,
            status: 'neutral',  // different sessions : neutral, session, break
            session_length: null, // default 25 minutes
            break_length: null // default 7 minutes
        };
        this.users.push(user);
    }

    updateTime(sender_id, newTime) {
        let user = this.getUser(sender_id);
        if(user) {
            user.session_length = newTime;
        }

        return user;
    }

    updateStatus(sender_id, newStatus) {
        let user = this.getUser(sender_id);

        if(user) {
            user.status = newStatus;
        }
        return user;
    }

    // Start a new session
    startSession(sender_id, session_length) {
        let user = this.getUser(sender_id);

        if(user) {
            user.start = new Date().getTime();
            user.status = 'session';
            if(session_length) {
                user.session_length = session_length;
            }else {
                user.session_length = 25*1000;
            }
        }

        return user;
    }

    // starts the break in pomodore
    startBreak(sender_id, break_length) {
        let user = this.getUser(sender_id);

        if(user){
            user.start = new Date().getTime();
            user.status = 'break';
            if(break_length) {
                user.break_length = break_length;
            }else {
                user.break_length = 7*1000;
            }
        }
    }

    // ends a pomodore session
    endSession(sender_id) {
        let user = this.getUser(sender_id);

        if(user) {
            user.start = null;
            user.status = 'neutral';
            user.session_length = null;
            user.break_length = null;
        }
    }

    // logs out the user out of the subscriber list
    removeUser(sender_id) {
        let user = this.getUser(sender_id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== sender_id);
        }
        return user;
    }

    // gets User according to its ID
    getUser(id) {
        return (this.users.filter((user) => user.id === id))[0];
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};