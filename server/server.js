// Load in built in modules
const http = require('http');
const path = require('path');

// Load in other modules
const express = require('express');
const socketIO = require('socket.io');

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
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    
    // Alert everyone that a new user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined the chat app',
        createdAt: new Date().getTime()
    });
    
    // Listen for createMessage from client
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        
//        socket.broadcast.emit('newMessage', {
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Tell express to listen on the chosen port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});