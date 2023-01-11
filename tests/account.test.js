const request = require('supertest');
const app = require('../src');

let token;

describe('Sign-up', () => {
    describe('Sign-up POST /sign-up', () => {
      test('Should return 201 when user signs-up', async () => {
        const user = {
          firstName: 'Athena',
          lastName: 'Pallas',
          userName: 'athena',
          email: 'athena@gmail.com',
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
          username: 'athena',
          password: '123456',
        };

        const response = await request(app)
        .post('/api/v1/auth/log-in')
        .send(user);

        expect(response.status).toBe(200);
        token = response.body.token;
        console.log(token);
    });
});
});


describe('Account', ()=>{
    describe('Get /user-account/:userId', ()=>{
        test('Should return status 200 when getting all accounts from user', async ()=>{
            const response = await request(app).get('/api/v1/account/user-accounts/1')
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
    });
    describe('Post /account', ()=>{
        test('Should return status 201 when new account is created', async()=>{
            const data = {
                name: "Savings Chase",
                type: "Savings",
                bank: "Chase",
                description: "My savings account",
                total: 5000,
            }
            const response = await request(app).post('/api/v1/account')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(201);
            
        })
        test('Should return status 422 when creating a new account with missing data', async()=>{
            const data = {
                type: "Savings",
                bank: "Chase",
                description: "My savings account",
            }
            const response = await request(app).post('/api/v1/account')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(422);
            
        })

    })
    describe('Patch /account/:id', ()=>{
        test('Should return 200 when account is patched', async()=>{
            const data = {
                name: "Savings CHASE",
                type: "Savings",
                bank: "CHASE",
                description: "My savings account for personal expenses",
            };
            const response = await request(app).patch('/api/v1/account/3')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(200);
        })
        test('Should return 422 when trying to patch account with wrong information', async()=>{
            const data = {
                nam: "Savings",
            }
            const response = await request(app).patch('/api/v1/account/3')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(422);
            
        })
    })
    describe('Delete /account/:id', ()=>{
        test('Should return 200 when account is deleted', async()=>{
            const response = await request(app).delete('/api/v1/account/3')
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
        test('Should return 403 when account cant be deleted', async()=>{
            const response = await request(app)
            .delete('/api/v1/account/2')
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(422);
        })
    })

})
