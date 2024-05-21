// Get express and create an instance of it
const express = require('express');
const app = express();
// Get path
const path = require('path');
const { title } = require('process');
// get fs
const fs = require('fs').promises;
const {v4: uuid} = require('uuid');

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
    console.error(err);
    res.status(500).send('An error reading from storage has occurred');
}});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes',  async (req, res) => {
    try{
    const {title, text} = req.body;
    const newNote ={
        title,
        text,
        id: uuid()
    }
    const data = await fs.readFile('./db/db.json', 'utf-8');
    const parsed = JSON.parse(data);
    parsed.push(newNote);
    const finalNote = JSON.stringify(parsed, null, 2);
    await fs.writeFile('./db/db.json', (finalNote));
    res.send('Note added successfully');
    }catch(err){
        console.error(err);
        res.status(500).send('Error adding new note');
    }

});

app.delete('/api/notes/:id', async (req, res) => {
    try{
    const delId = req.params.id;
    const data = await fs.readFile('./db/db.json', 'utf-8');
    const parsed = JSON.parse(data);
    const newList = parsed.filter((note) => note.id !== delId);
    console.log(newList);
    const finalList = JSON.stringify(newList, null, 2);
    await fs.writeFile('./db/db.json', (finalList));
    res.send('Note deleted successfully');
    }catch(err){
        console.error(err);
        res.status(500).send('Error deleting note');
    }
})

// Starts the server and listen to conections in the available port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});