const request = require('supertest');

process.env.OPENAI_API_KEY = 'test-key';

jest.mock('openai', () => {
  const mockCreate = jest.fn().mockResolvedValue({
    data: { choices: [{ message: { content: 'Mocked ChatGPT text' } }] }
  });
  return { OpenAI: jest.fn(() => ({ createChatCompletion: mockCreate })) };
});

let app;

beforeAll(() => {
  jest.resetModules();
  app = require('../server');
});

afterAll(() => {
  delete process.env.OPENAI_API_KEY;
});

describe('ChatGPT enabled endpoints', () => {
  test('/answer returns ChatGPT comment', async () => {
    const res = await request(app).post('/answer').send({ text: 'Hello world' });
    expect(res.status).toBe(200);
    expect(res.body.comment).toBe('Mocked ChatGPT text');
  });

  test('/weather returns ChatGPT comment', async () => {
    const res = await request(app).post('/weather').send({ event: 'joy' });
    expect(res.status).toBe(200);
    expect(res.body.comment).toBe('Mocked ChatGPT text');
  });
});
