const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Izzy';
        var text = 'Give me second dinner';
        var message = generateMessage(from, text);
        
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var lat = 21;
        var long = 30;
        
        var message = generateLocationMessage(from, lat, long);
        
        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
        expect(typeof message.createdAt).toBe('number');
    });
});