// Load in built in modules
const http = require('http');
const path = require('path');

// Load in other modules
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// Set up path for Express
const publicPath = path.join(__dirname, '../public');

// Setup port for heroku and local 
const port = process.env.PORT || 3000;

// Initiate express app
var app = express();

// Configure web sockets server
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');
    
    // Listen for join
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        
        socket.join(params.room);
        
        // Add a user to the user list
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        // Emit Admin welcome message
        socket.emit('newMessage', generateMessage('Admin', `Welcome to the ${params.room} chat room!`));

        // Alert everyone that a new user joined the room
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat.`));
        
        callback();
    });
    
    // Listen for createMessage from client
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    
    // Listen for createLocationMessage
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });
    
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }
    });
});

// Tell express to listen on the chosen port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});