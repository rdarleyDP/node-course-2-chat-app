var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    
    socket.emit('createMessage', {
        from: 'Izzy',
        text: 'I want to sit on the couch'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


// Listen for newMessage
socket.on('newMessage', function (message) {
    console.log('New Message!', message)
});