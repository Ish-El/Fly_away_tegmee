const express = require('express');
const path = require('path');
const Sentiment = require('sentiment');

const app = express();
const sentiment = new Sentiment();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let plantState = {
  size: 50,
  color: 'green'
};

function evaluateTraits(text) {
  const result = sentiment.analyze(text);
  const score = result.score;
  let trait = 'neutral';
  if (score > 2) trait = 'positive';
  else if (score < -2) trait = 'negative';
  return trait;
}

function updatePlant(trait) {
  if (trait === 'positive') {
    plantState.size += 10;
    plantState.color = 'green';
  } else if (trait === 'negative') {
    plantState.size = Math.max(10, plantState.size - 10);
    plantState.color = 'brown';
  } else {
    plantState.color = 'yellow';
  }
}

app.post('/answer', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });
  const trait = evaluateTraits(text);
  updatePlant(trait);
  res.json({ trait, plant: plantState });
});

app.get('/plant', (req, res) => {
  res.json(plantState);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
