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
    
    var messageTextBox = $('input[name=message]')
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Sorry, you can not use this function with your crappy browser');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        
        alert('Unable to fetch location');
    });
});