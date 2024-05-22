// Require the necessary packages and functions
const router = require('express').Router();
const {v4: uuid} = require('uuid');
const {Reader, Writer} = require('../helpers/readWrite');

// Route to retrieve notes from the database and return them as JSON
router.get('/notes',  async (req, res) => {
    try{
    const data = await Reader('./db/db.json');
    res.status(200).json(data);
} catch (err){
    console.error(err);
    res.status(500).send('An error reading from storage has occurred');
}});

// Route to post new notes to the database
router.post('/notes',  async (req, res) => {
    try{

    // Extracts the title and text from the request body
    const {title, text} = req.body;

    // Creates a new object with with the data from the request body and an id generated with uuid
    const newNote ={
        title,
        text,
        id: uuid()
    }

    // Reads the data from the database
    const data = await Reader('./db/db.json');

    // Pushes the new object into the extracted data
    data.push(newNote);

    // Writes the data including the new object to the database
    await Writer('./db/db.json', data);

    // Sends a success status and message
    res.status(200).send('Note added successfully');

    }catch(err){
        // If any errors occur console.logs and sends an error status and message
        console.error(err);
        res.status(500).send('Error adding new note');
    }
});

// Route to delete notes from the database
router.delete('/notes/:id', async (req, res) => {
    try{
    // Gets the id of the target from the request body
    const delId = req.params.id;

    // Reads the data from the database
    const data = await Reader('./db/db.json');

    // Filters the data so the target is left out
    const newData = data.filter((note) => note.id !== delId);
    
    // Writes the data excluding the new object to the database
    await Writer('./db/db.json', newData);

    // Sends a success status and message
    res.status(200).send('Note deleted successfully');
    }catch(err){
        // If any errors occur console.logs and sends an error status and message
        console.error(err);
        res.status(500).send('Error deleting note');
    }
})

// Exports the api routes
module.exports = router;