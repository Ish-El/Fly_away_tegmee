# Fly Away Tegmee

This repository contains a small project that visualizes psychological traits through a plant representation. The application is located in the `ego-plant-app` directory.

## Setup

1. Install dependencies:
   ```bash
   cd ego-plant-app
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```

   Set the `OPENAI_API_KEY` environment variable if you want ChatGPT powered
   commentary.

3. Open `http://localhost:3000` in your browser to interact with the plant visualization.

### Features
- Answer reflective prompts to shape your plant.
- Trigger emotional "weather" events such as regret or joy.
- The plant changes color, size and shape based on your responses.
- Short philosophical comments accompany each growth stage.
- Responses use ChatGPT when an API key is provided for richer insights.
