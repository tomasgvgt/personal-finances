const request = require('supertest');
const app = require('../src');

describe('User', ()=>{
    describe('Get /user', ()=>{
        test('Should return status 200 when getting all users', async ()=>{
            const response = await request(app).get('/api/v1/user');
            expect(response.status).toBe(200);
        })
    });
    describe('Post /user', ()=>{
        test('Should return status 200 when getting one user by id', async()=>{
            const data = {
                id: 1
            }
            const response = await request(app).post('/api/v1/user').send(data)
            console.log(response.body);
            expect(response.status).toBe(200);
            
        })
        test('Should return Jhon as firstName when getting user with id: 1', async()=>{
            const data = {
                id: 1
            }
            const response = await request(app).post('/api/v1/user').send(data)
            expect(response.body.firstName).toBe('John');
            
        })

    })
    describe('Patch /user/:id', ()=>{
        test('Should return 200 when user with id: 1 is patched', async()=>{
            const data = {
                firstName: "Juan"
            };
            const response = await request(app).patch('/api/v1/user/1').send(data)
            expect(response.status).toBe(200);
        })
        test('Should return Juan as firstName when getting user with id: 1', async()=>{
            const data = {
                id: 1
            }
            const response = await request(app).post('/api/v1/user').send(data)
            expect(response.body.firstName).toBe('Juan');
            
        })
    })
    // describe('Delete /user/:id', ()=>{
    //     test('Should return 404 when user 10 is not found', async()=>{
    //         const response = await request(app).delete('/api/v1/user/10');
    //         expect(response.status).toBe(404);
    //     })
    //     test('Should return 200 when user 1 is deleted', async()=>{
    //         const response = await request(app).delete('/api/v1/user/1');
    //         expect(response.status).toBe(200);
    //     })
    // })

})
