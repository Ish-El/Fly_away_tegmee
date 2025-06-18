let plantState = { size: 50, color: 'green', shape: 'round' };

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent('plantCanvas');
  drawPlant();
}

function draw() {}

function drawPlant() {
  clear();
  background(220);
  push();
  translate(width / 2, height);
  fill(plantState.color);
  noStroke();
  switch (plantState.shape) {
    case 'cactus':
      rect(-plantState.size / 8, -plantState.size, plantState.size / 4, plantState.size);
      ellipse(-plantState.size / 4, -plantState.size / 2, plantState.size / 4, plantState.size / 2);
      ellipse(plantState.size / 4, -plantState.size / 2, plantState.size / 4, plantState.size / 2);
      break;
    case 'vine':
      beginShape();
      for (let i = 0; i < plantState.size; i += 10) {
        curveVertex(sin(i / 10) * 10, -i);
      }
      endShape();
      break;
    case 'spike':
      beginShape();
      for (let a = 0; a < TWO_PI; a += TWO_PI / 8) {
        const r = plantState.size / 2;
        const r2 = r / 2;
        vertex(cos(a) * r, -r + sin(a) * r);
        vertex(cos(a + PI / 8) * r2, -r + sin(a + PI / 8) * r2);
      }
      endShape(CLOSE);
      break;
    case 'twist':
      noFill();
      beginShape();
      for (let a = 0; a < TWO_PI * 2; a += 0.2) {
        const r = a * 2;
        vertex(cos(a) * r, -r);
      }
      endShape();
      break;
    default:
      ellipse(0, -plantState.size / 2, plantState.size, plantState.size);
  }
  pop();
}

async function updatePlantState() {
  const res = await fetch('/plant');
  plantState = await res.json();
  drawPlant();
}

async function loadPrompt() {
  const res = await fetch('/prompt');
  const data = await res.json();
  document.getElementById('promptText').textContent = data.prompt;
}

document.getElementById('submitBtn').addEventListener('click', async () => {
  const text = document.getElementById('userInput').value;
  const res = await fetch('/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  plantState = data.plant;
  document.getElementById('comment').textContent = data.comment;
  drawPlant();
});

document.querySelectorAll('.weather').forEach(btn => {
  btn.addEventListener('click', async () => {
    const event = btn.getAttribute('data-event');
    const res = await fetch('/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event })
    });
    const data = await res.json();
    plantState = data.plant;
    document.getElementById('comment').textContent = data.comment;
    drawPlant();
  });
});

document.getElementById('nextPrompt').addEventListener('click', loadPrompt);

window.addEventListener('load', updatePlantState);
window.addEventListener('load', loadPrompt);
