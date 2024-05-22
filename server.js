const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let notes = [];

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Create a new note
app.post('/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).json(note);
});

// Update an existing note
app.put('/notes/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const updatedNote = req.body;
  if (index >= 0 && index < notes.length) {
    notes[index] = updatedNote;
    res.json(updatedNote);
  } else {
    res.status(404).send('Note not found');
  }
});

// Delete a note
app.delete('/notes/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < notes.length) {
    notes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Note not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
