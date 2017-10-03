// Load in built in modules
const http = require('http');
const path = require('path');

// Load in other modules
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

// Set up path for Express
const publicPath = path.join(__dirname, '../public');

// Setup port for heroku and local 
const port = process.env.PORT || 3000;

// Initiate express app
var app = express();

// Configure web sockets server
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');
    
    // Emit Admin welcome message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    
    // Alert everyone that a new user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined the chat.'));
    
    // Listen for createMessage from client
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        
        io.emit('newMessage', generateMessage(message.from, message.text));
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Tell express to listen on the chosen port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});