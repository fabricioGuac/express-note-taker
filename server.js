// Get express and create an instance of it
const express = require('express');
const app = express();
// Get path and the api.js
const path = require('path');
const api = require('./routes/api');

// Gets an available port from the process enviroment or defaults to port 3001
const PORT = process.env.PORT || 3001;

// Uses middleware to parse the json and url data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Uses middleware to access the public folder and the api routes
app.use(express.static('public'));
app.use('/api', api);

// Sets the ruote to return the note.html file 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Set a catch-all route for the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Starts the server and listen to conections in the available port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});