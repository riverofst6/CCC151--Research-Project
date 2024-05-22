const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let notes = [];
let currentId = 0;

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const newNote = {
    id: currentId++,
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  res.json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex > -1) {
    notes[noteIndex] = {
      id,
      title: req.body.title,
      content: req.body.content,
    };
    res.json(notes[noteIndex]);
  } else {
    res.status(404).send('Note not found');
  }
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  notes = notes.filter(note => note.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
