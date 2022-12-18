const request = require('supertest');
const app = require('../src');

describe('Personal-finances API V1', () => {
  describe('Get /', () => {
    test('Should return status 200', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('Authentication', () => {
    describe('Sign-up POST /sign-up', () => {
      test.only('Should return 201 when user signs-up', async () => {
        const user = {
          firstName: 'Pepe',
          lastName: 'Perez',
          userName: 'Pepitox',
          email: 'pepe@gmail.com',
          password: '123456',
        };

        const response = await request(app)
          .post('/api/v1/auth/sign-up')
          //   .set('Content-type', 'application/json')
          .send(user);

        expect(response.status).toBe(201);
      });
    });

    test.only('Should return password validation error when password is too short', async () => {
      const user = {
        firstName: 'Pepe',
        lastName: 'Perez',
        userName: 'Pepitox',
        email: 'pepe@gmail.com',
        password: '1234',
      };

      const response = await request(app)
        .post('/api/v1/auth/sign-up')
        .send(user);

      //   console.log(response);

      expect(response.status).toBe(4008);
    });
  });
});
