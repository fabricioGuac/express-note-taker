// Require the express router and api routes module
const router = require('express').Router();
const api = require('./api');
const path = require('path');

// Uses middleware to access the api routes
router.use('/api', api);


// Sets the ruote to return the note.html file 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Set a catch-all route for the index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exports the routes 
module.exports = router;