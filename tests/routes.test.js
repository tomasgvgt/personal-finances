const request = require('supertest');
const app = require('../src/index');
const db = require('../src/db');

describe('Personal-finances API', () => {
  test('GET /', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
  });
});
