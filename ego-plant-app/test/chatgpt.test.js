const request = require('supertest');

let app;

beforeAll(() => {
  jest.resetModules();
  app = require('../server');
});

afterAll(() => {
  // no cleanup necessary
});

describe('answer endpoint', () => {
  test('responds with plant state', async () => {
    const res = await request(app).post('/answer').send({ text: 'Hello world' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('trait');
    expect(res.body).toHaveProperty('plant');
  });
});
