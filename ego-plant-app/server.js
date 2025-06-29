const express = require('express');
const path = require('path');
const Sentiment = require('sentiment');
const { OpenAI } = require('openai');

const app = express();
const sentiment = new Sentiment();
const openaiKey = process.env.OPENAI_API_KEY;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let plantState = {
  size: 50,
  color: 'green'
};


const prompts = [
  'What does freedom mean to you today?',
  'Would you rather be respected or loved?',
  'If no one could ever judge you, what would you do tomorrow?'
];

function getRandomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

function generateComment() {
  switch (plantState.shape) {
    case 'cactus':
      return 'Your resolve stands firm like a cactus in the desert.';
    case 'vine':
      return 'Emotions wind gently like growing vines.';
    case 'spike':
      return 'Energy bursts forth in sharp directions.';
    case 'twist':
      return 'Contradictions weave a twisted form.';
    default:
      return 'Balance maintains a simple shape.';
  }
}

async function chatComment(traits, text) {
  if (!openai) {
    return generateComment();
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a philosophical gardening guide.' },
        { role: 'user', content: `Mood: ${traits.mood}, Shape: ${plantState.shape}. Text: ${text}` }
      ],
      max_tokens: 60
    });
    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenAI error', err.message);
    return generateComment();
  }
}


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
