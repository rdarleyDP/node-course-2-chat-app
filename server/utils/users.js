class Users {
    constructor () {
        this.users = [];
    }
    
    addUser (id, name, room) {
        var lowerRoom = room.toLowerCase();
        var user = {id, name, room: lowerRoom};
        this.users.push(user);
        return user;
    }
    
    checkUniqueUser (id, name, room) {
        var lowerRoom = room.toLowerCase();
        var newUser = {id, name, room: lowerRoom};
        var existingUsers = this.users.filter((user) => {
            return user.room === lowerRoom;
        });
        
        var existingNames = existingUsers.map((user) => {
            return user.name;
        });
        
        if (!existingNames.includes(newUser.name)) {
            return true;
        } else {
            return false;
        }
    }
    
    removeUser (id) {
        var user = this.users.filter((user) => user.id === id)[0];
        
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
    }
    
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    
    getUserList (room) {
        var lowerRoom = room.toLowerCase();
        var users = this.users.filter((user) => {
            return user.room === lowerRoom;
        });
        
        var namesArray = users.map((user) => {
            return user.name;
        });
        
        return namesArray;
    }
}

module.exports = {
    Users
}