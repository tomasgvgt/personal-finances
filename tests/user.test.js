const request = require('supertest');
const app = require('../src');

let token;

describe('Sign-up', () => {
    describe('Sign-up POST /sign-up', () => {
      test('Should return 201 when user signs-up', async () => {
        const user = {
          firstName: 'Hephaestus',
          lastName: 'Olimpicus',
          userName: 'hephaestus',
          email: 'hefesto@gmail.com',
          password: '123456',
        };

        const response = await request(app)
          .post('/api/v1/auth/sign-up')
          //   .set('Content-type', 'application/json')
          .send(user);

        expect(response.status).toBe(201);
      });
    });
});


describe('Log-in', () => {
    describe('Log-in POST /log-in', () => {
      test('Should return 200 when user logs-in', async () => {
        const user = {
          username: 'hephaestus',
          password: '123456',
        };

        const response = await request(app)
        .post('/api/v1/auth/log-in')
        .send(user);

        expect(response.status).toBe(200);
        token = response.body.token;
    });
});
});


describe('User', ()=>{
    describe('Get /user', ()=>{
        test('Should return status 200 when getting all users', async ()=>{
            const response = await request(app).get('/api/v1/user');
            expect(response.status).toBe(200);
        })
    });
    describe('Get /:id', ()=>{
        test('Should return status 200 when getting one user by id', async()=>{
            const response = await request(app).get('/api/v1/user/1')
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
        test('Should return Hephaestus as firstName when getting user with current token', async()=>{
            const response = await request(app).get('/api/v1/user/1')
            .set('Authorization', `Bearer ${token}`)
            expect(response.body.firstName).toBe('Hephaestus');
            
        })

    })
    describe('Patch /user/:id', ()=>{
        test('Should return 200 when user is patched', async()=>{
            const data = {
                firstName: "Hefesto"
            };
            const response = await request(app).patch('/api/v1/user/1')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(200);
        })
        test('Should return Hefesto as firstName when getting user with current token', async()=>{

            const response = await request(app).get('/api/v1/user/1')
            .set('Authorization', `Bearer ${token}`)
            expect(response.body.firstName).toBe('Hefesto');
            
        })
    })
})

