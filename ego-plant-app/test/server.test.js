const request = require('supertest');
const app = require('../server');

describe('Ego Plant API', () => {
  test('returns initial plant state', async () => {
    const res = await request(app).get('/plant');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ size: 50, color: 'green', shape: 'round' });
  });

  test('updates plant via answer', async () => {
    const res = await request(app)
      .post('/answer')
      .send({ text: 'I love reading romance novels' });
    expect(res.status).toBe(200);
    expect(res.body.traits.shape).toBe('vine');
    expect(res.body.plant.shape).toBe('vine');
    expect(res.body.plant.size).toBe(60);
    expect(res.body.comment).toBeDefined();
  });

  test('applies weather event', async () => {
    const res = await request(app)
      .post('/weather')
      .send({ event: 'joy' });
    expect(res.status).toBe(200);
    expect(res.body.plant.color).toBe('pink');
    expect(res.body.plant.size).toBe(65);
  });

  test('provides a prompt', async () => {
    const res = await request(app).get('/prompt');
    expect(res.status).toBe(200);
    expect(typeof res.body.prompt).toBe('string');
    expect(res.body.prompt.length).toBeGreaterThan(0);
  });
});
