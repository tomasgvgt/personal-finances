const request = require('supertest');
const app = require('../src');

describe('Account', ()=>{
    describe('Get /user-account/:userId', ()=>{
        test('Should return status 200 when getting all accounts from user', async ()=>{
            const response = await request(app).get('/api/v1/account/user-accounts/1');
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
                userId: 1
            }
            const response = await request(app).post('/api/v1/account').send(data)
            expect(response.status).toBe(201);
            
        })
        test('Should return status 422 when creating a new account with missing data', async()=>{
            const data = {
                type: "Savings",
                bank: "Chase",
                description: "My savings account",
                userId: 1
            }
            const response = await request(app).post('/api/v1/user').send(data)
            expect(response.status).toBe(422);
            
        })

    })
    describe('Patch /account/:id', ()=>{
        test('Should return 200 when account with id 3 is patched', async()=>{
            const data = {
                name: "Savings CHASE",
                type: "Savings",
                bank: "CHASE",
                description: "My savings account for personal expenses",
            };
            const response = await request(app).patch('/api/v1/account/3').send(data)
            expect(response.status).toBe(200);
        })
        test('Should return 422 when trying to patch account with wrong information', async()=>{
            const data = {
                nam: "Savings",
            }
            const response = await request(app).patch('/api/v1/account/3').send(data)
            expect(response.status).toBe(422);
            
        })
    })
    describe('Delete /account/:id', ()=>{
        test('Should return 200 when account 3 is deleted', async()=>{
            const response = await request(app).delete('/api/v1/account/3');
            expect(response.status).toBe(200);
        })
        test('Should return 403 when account cant be deleted', async()=>{
            const response = await request(app).delete('/api/v1/account/2');
            expect(response.status).toBe(403);
        })
    })

})
