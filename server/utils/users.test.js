const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Robin',
            room: 'A'
        },
        {
            id: '2',
            name: 'Ryan',
            room: 'B'
        },
        {
            id: '3',
            name: 'Izzy',
            room: 'A'
        }];
    });
    
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Robin',
            room: 'Test room'
        };
        
        var resUser = users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });
    
    it('should return names for room A', () => {
        var people = users.getUserList('A');
        
        expect(people).toEqual(['Robin', 'Izzy']);
    });
    
    it('should return names for room B', () => {
        var people = users.getUserList('B');
        
        expect(people).toEqual(['Ryan']);
    });
    
    it('should remove a user', () => {
        // take id, remove
        var user = users.removeUser('1');
        
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove user', () => {
        // pass in invalid id, array should not change
        var user = users.removeUser('7');
        
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
    
    it('should get a user', () => {
        // pass in valid id and get user back
        var user = users.getUser('1');
        
        expect(user.id).toBe('1');
    });
    
    
    it('should not find user', () => {
        // pass in invalid id and not get a user back
        var user = users.getUser('4');
        
        expect(user).toBeUndefined();
    });
});