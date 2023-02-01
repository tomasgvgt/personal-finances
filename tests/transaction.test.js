const request = require('supertest');
const app = require('../src');

describe('Transaction', ()=>{
    describe('Get /transaction/user/:userId', ()=>{
        test('Should return status 200 when getting all transactions from user', async ()=>{
            const response = await request(app).get('/api/v1/transaction/user/1');
            expect(response.status).toBe(200);
        })
    });
    describe('Get /transaction/account/:accountId', ()=>{
        test('Should return status 200 when getting all transactions from account', async ()=>{
            const response = await request(app).get('/api/v1/transaction/account/1');
            expect(response.status).toBe(200);
        })
    });
    describe('Post /transaction', ()=>{
        test('Should return status 201 when new transaction is created', async()=>{
            const data = {
                type: "income",
                amount: 3000,
                categoryId: 1,
                accountId: 1,
                userId: 1
            }
            const response = await request(app).post('/api/v1/transaction').send(data)
            expect(response.status).toBe(201);
            
        })
        test('Should return status 422 when creating a new transaction with missing data', async()=>{
            const data = {
                type: "income",
                amount: 3000,
                categoryId: 1,
                accountId: 1
            }
            const response = await request(app).post('/api/v1/transaction').send(data)
            expect(response.status).toBe(422);
            
        })

    })
    describe('Patch /transaction/:id', ()=>{
        test('Should return 200 when transaction with id 1 is patched', async()=>{
            const data = {
                description: "New Description",
                categoryId: 2
            };
            const response = await request(app).patch('/api/v1/transaction/1').send(data)
            expect(response.status).toBe(200);
        })
        test('Should return 422 when trying to patch account with wrong information', async()=>{
            const data = {
                cription: "New Description",
                categoryId: 2
            }
            const response = await request(app).patch('/api/v1/transaction/1').send(data)
            expect(response.status).toBe(422);
            
        })
    })
    describe('Delete /transaction/:id', ()=>{
        test('Should return 200 when transaction 1 is deleted', async()=>{
            const response = await request(app).delete('/api/v1/transaction/1');
            expect(response.status).toBe(200);
        })
    })

})
