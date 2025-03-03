import express from 'express';
import { calculateSecret, fillGrid, setLetter, values } from './calculations.js';
import { addPayment, getPayments } from './payments.js';

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

app.put('/letter', (req, res) => {
  const { letter } = req.body;
  res.send(setLetter(letter));
});

app.get('/secret', (req, res) => {
  res.send(calculateSecret());
});

app.post('/payments', (req, res) => {
  const { name, amount } = req.body;
  addPayment({ name, amount });
  res.send(getPayments());
});

app.get('/payments', (req, res) => {
  res.send(getPayments());
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
