const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var params = {
            name: 23,
            room: 'Valid Room Name'
        };
        
        var checkName = isRealString(params.name);
        var checkRoom = isRealString(params.room);
        
        expect(checkName).toBeFalsy();
        expect(checkRoom).toBeTruthy();
    });
    
    it('should reject string with only spaces', () => {
        var params = {
            name: '              ',
            room: 'Valid Room Name'
        };
        
        var checkName = isRealString(params.name);
        var checkRoom = isRealString(params.room);
        
        expect(checkName).toBeFalsy();
        expect(checkRoom).toBeTruthy();
    });
    
    it('should allow string with non-space characters', () => {
        var params = {
            name: '  Robin     ',
            room: 'Valid Room Name'
        };
        
        var checkName = isRealString(params.name);
        var checkRoom = isRealString(params.room);
        
        expect(checkName).toBeTruthy();
        expect(checkRoom).toBeTruthy();
    });
});