const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET route for recieving notes
notes.get('/', (req, res) => {
    console.info(`${req.method} new note recieved!`);
    
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for posting notes
notes.post('/', (req, res) => {
    console.info(`${req.method} new note posted!`);


const { title, text } = req.body;

if (title && text) {
    const newNote = {
        title,
        text,
        note_id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
        status: 'sucess',
        body: newNote,
    };

    res.json(response);
} else {
    res.json('Error in posting note');
}
});

module.exports = notes;

