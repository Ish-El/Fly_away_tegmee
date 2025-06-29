
# Fly_away_tegmee

This repository contains placeholder content. To keep your environment secure, network access should remain disabled unless absolutely necessary.

If you need to lock down network connectivity, run the `scripts/restrict_network.sh` script with root privileges. It uses `iptables` to drop all inbound and outbound traffic. Review the script before running and modify it to suit your needs.

**Important:** Enabling internet access can expose your environment to security risks, including prompt injection, exfiltration of secrets or code, and injection of malware. Always review commands and code before executing them.

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

3. Open `http://localhost:3000` in your browser to interact with the plant visualization.

### Optional
- User responses are analyzed using a simple sentiment detector.
- The plant grows or shrinks and changes color based on the analysis result.

## Demo

1. Open your browser to `http://localhost:3000` after starting the server.
2. Enter a short phrase or sentence in the input box describing your mood or a response to the prompt. For example:

   > "I feel hopeful today"

   > "This task made me frustrated"

   The text can be any brief description—positive, negative, or neutral.
3. Click **Submit**. The server analyzes the sentiment of your text:
   - **Positive** text increases the plant's size and keeps it green.
   - **Negative** text decreases the plant's size and turns it brown.
   - **Neutral** text leaves the size unchanged but turns the plant yellow.
4. The plant visualization on the page updates immediately to reflect the new state, allowing you to see how your input affects its growth.

Feel free to experiment with different statements to observe how the plant responds.

