const router = require('express').Router();
const fs = require('fs').promises;
const {v4: uuid} = require('uuid');

router.get('/notes',  async (req, res) => {
    try{
    const data =  await fs.readFile('./db/db.json','utf8');
    const notes = JSON.parse(data);
    res.json(notes);
} catch (err){
    console.error(err);
    res.status(500).send('An error reading from storage has occurred');
}});


router.post('/notes',  async (req, res) => {
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
    res.status(200).send('Note added successfully');
    }catch(err){
        console.error(err);
        res.status(500).send('Error adding new note');
    }

});

router.delete('/notes/:id', async (req, res) => {
    try{
    const delId = req.params.id;
    const data = await fs.readFile('./db/db.json', 'utf-8');
    const parsed = JSON.parse(data);
    const newList = parsed.filter((note) => note.id !== delId);
    const finalList = JSON.stringify(newList, null, 2);
    await fs.writeFile('./db/db.json', (finalList));
    res.status(200).send('Note deleted successfully');
    }catch(err){
        console.error(err);
        res.status(500).send('Error deleting note');
    }
})

module.exports = router;