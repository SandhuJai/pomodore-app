class Users {
    constructor() {
        this.users = [];
    }

    addUser(sender_id) {
        let user = {sender_id};
        let repeated = this.users.filter((user) => {
            if(user.sender_id === sender_id);
        });
        if(!repeated[0]) {
            this.users.push(user);
        }
    }

    removeUser(id) {
        let user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

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