// Loaded in modules
const express = require('express');
const path = require('path');

// Set up path for Express
const publicPath = path.join(__dirname, '../public');

// Setup port for heroku and local 
const port = process.env.PORT || 3000;

// Initiate express app
var app = express();

app.use(express.static(publicPath));

// Tell express to listen on the chosen port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});