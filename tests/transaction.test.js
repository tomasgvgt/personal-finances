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
    // describe('Post /account', ()=>{
    //     test('Should return status 201 when new account is created', async()=>{
    //         const data = {
    //             name: "Savings Chase",
    //             type: "Savings",
    //             bank: "Chase",
    //             description: "My savings account",
    //             total: 5000,
    //             userId: 1
    //         }
    //         const response = await request(app).post('/api/v1/account').send(data)
    //         expect(response.status).toBe(201);
            
    //     })
    //     test('Should return status 422 when creating a new account with missing data', async()=>{
    //         const data = {
    //             type: "Savings",
    //             bank: "Chase",
    //             description: "My savings account",
    //             userId: 1
    //         }
    //         const response = await request(app).post('/api/v1/user').send(data)
    //         expect(response.status).toBe(422);
            
    //     })

    // })
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
