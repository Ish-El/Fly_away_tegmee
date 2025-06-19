
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

### Running tests

1. `cd ego-plant-app`
2. `npm install`
3. `npm test`

### Optional
- User responses are analyzed using a simple sentiment detector.
- The plant grows or shrinks and changes color based on the analysis result.

