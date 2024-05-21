// Get express and create an instance of it
const express = require('express');
const app = express();
// Get path
const path = require('path');
// get fs
const fs = require('fs').promises;

// Gets an available port from the process enviroment or defaults to port 3001
const PORT = process.env.PORT || 3001;

// Uses middleware to parse the json and url data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Uses middleware to access the public folder
app.use(express.static('public'));

app.get('/api/notes',  async (req, res) => {
    try{
    const data =  await fs.readFile('./db/db.json','utf8');
    const notes = JSON.parse(data);
    res.json(notes);
} catch (err){
    console.log(err);
    res.status(500).send('An error reading from storage has occurred');
}});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



app.post('/api/notes', (req, res) => {
    console.log(req.body);
})

// Starts the server and listen to conections in the available port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});