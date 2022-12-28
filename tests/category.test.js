const request = require('supertest');
const app = require('../src');

describe('Category', ()=>{
    describe('Get /category/:userId', ()=>{
        test('Should return status 200 when getting all categories from user', async ()=>{
            const response = await request(app).get('/api/v1/category/1');
            console.log(response.text);
            expect(response.status).toBe(200);
        })
    });
    // describe('Get /transaction/account/:accountId', ()=>{
    //     test('Should return status 200 when getting all transactions from account', async ()=>{
    //         const response = await request(app).get('/api/v1/transaction/account/1');
    //         expect(response.status).toBe(200);
    //     })
    // });
    describe('Post /category', ()=>{
        test('Should return status 201 when new category is created', async()=>{
            const data = {
                name: "Clothing",
                userId: 1
            }
            const response = await request(app).post('/api/v1/category').send(data);
            expect(response.status).toBe(201);
            
        })
        test('Should return status 422 when creating a new category with missing data', async()=>{
            const data = {
                name: "Other"
            }
            const response = await request(app).post('/api/v1/category').send(data)
            expect(response.status).toBe(422);
        })

    })
    describe('Delete /category/:id', ()=>{
        test('Should return 200 when category 3 is deleted', async()=>{
            const response = await request(app).delete('/api/v1/category/3');
            expect(response.status).toBe(200);
        })
    })

})
