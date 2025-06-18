const express = require('express');
const path = require('path');
const Sentiment = require('sentiment');
const { OpenAI } = require('openai');

const app = express();
const sentiment = new Sentiment();
const openaiKey = process.env.OPENAI_API_KEY;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

const defaultPlantState = {
  size: 50,
  color: 'green',
  shape: 'round',
};

let plantState = { ...defaultPlantState };

function resetPlant() {
  plantState = { ...defaultPlantState };
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// plantState is mutated as the user interacts with the app

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
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a philosophical gardening guide.' },
        { role: 'user', content: `Mood: ${traits.mood}, Shape: ${plantState.shape}. Text: ${text}` }
      ],
      max_tokens: 60
    });
    return completion.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenAI error', err.message);
    return generateComment();
  }
}

function evaluateTraits(text) {
  const result = sentiment.analyze(text);
  const score = result.score;
  let mood = 'neutral';
  if (score > 2) mood = 'positive';
  else if (score < -2) mood = 'negative';

  const lower = text.toLowerCase();
  let shape = 'round';
  if (/however|but|though/.test(lower)) shape = 'twist';
  else if (/love|heart|romance/.test(lower)) shape = 'vine';
  else if (/fight|power|anger/.test(lower)) shape = 'spike';
  else if (/duty|virtue|logic|reason/.test(lower)) shape = 'cactus';

  return { mood, shape };
}

function updatePlant(traits) {
  const { mood, shape } = traits;
  if (mood === 'positive') {
    plantState.size += 10;
    plantState.color = 'green';
  } else if (mood === 'negative') {
    plantState.size = Math.max(10, plantState.size - 10);
    plantState.color = 'brown';
  } else {
    plantState.color = 'yellow';
  }
  plantState.shape = shape;
}

function applyWeather(event) {
  switch (event) {
    case 'regret':
      plantState.color = 'blue';
      break;
    case 'envy':
      plantState.color = 'purple';
      break;
    case 'joy':
      plantState.color = 'pink';
      plantState.size += 5;
      break;
    default:
      break;
  }
}

app.post('/answer', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });
  const traits = evaluateTraits(text);
  updatePlant(traits);
  const comment = await chatComment(traits, text);
  res.json({ traits, plant: plantState, comment });
});

app.post('/weather', async (req, res) => {
  const { event } = req.body;
  if (!event) return res.status(400).json({ error: 'No event provided' });
  applyWeather(event);
  const comment = await chatComment({ mood: event, shape: plantState.shape }, event);
  res.json({ plant: plantState, comment });
});

app.get('/prompt', (req, res) => {
  res.json({ prompt: getRandomPrompt() });
});

app.get('/plant', (req, res) => {
  res.json(plantState);
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { app, resetPlant };
