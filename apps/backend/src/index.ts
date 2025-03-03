import express from 'express';
import { calculateSecret, fillGrid, setLetter, values } from './calculations.js';

const app = express();
app.use(express.json());

// initialize the grid
fillGrid();

app.post('/grid', (req, res) => {
  res.send(fillGrid());
});

app.get('/grid', (req, res) => {
  res.send(values.grid);
});

app.post('/letter', (req, res) => {
  const { letter } = req.body;
  res.send(setLetter(letter));
});

app.get('/secret', (req, res) => {
  res.send(calculateSecret());
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
