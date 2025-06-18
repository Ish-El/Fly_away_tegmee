let plantState = { size: 50, color: 'green' };

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent('plantCanvas');
  drawPlant();
}

function draw() {}

function drawPlant() {
  clear();
  background(220);
  fill(plantState.color);
  ellipse(width / 2, height - plantState.size / 2, plantState.size, plantState.size);
}

async function updatePlantState() {
  const res = await fetch('/plant');
  plantState = await res.json();
  drawPlant();
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
  drawPlant();
});

window.addEventListener('load', updatePlantState);
