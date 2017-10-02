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
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Tell express to listen on the chosen port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});