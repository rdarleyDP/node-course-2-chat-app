var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


// Listen for newMessage
socket.on('newMessage', function (message) {
    console.log('New Message!', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    $('#messages').append(li);
});

// Listen for newLocationMessage
socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $(`<a target="_blank">My Current Location</a>`);
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name="message"]').val()
    }, function () {
        console.log('Message created');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Sorry, you can not use this function with your crappy browser');
    }
    
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location');
    });
});