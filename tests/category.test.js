const request = require('supertest');
const app = require('../src');

let token;
let categoryID;

describe('Sign-up', () => {
    describe('Sign-up POST /sign-up', () => {
      test('Should return 201 when user signs-up', async () => {
        const user = {
          firstName: 'Prometheus',
          lastName: 'Titan',
          userName: 'prometheus',
          email: 'prometheus@gmail.com',
          password: '123456',
        };
        const response = await request(app)
          .post('/api/v1/auth/sign-up')
          .send(user);
        expect(response.status).toBe(201);
      });
    });
});


describe('Log-in', () => {
    describe('Log-in POST /log-in', () => {
      test('Should return 200 when user logs-in', async () => {
        const user = {
          username: 'prometheus',
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

describe('Category', ()=>{
    describe('Get /category/:userId', ()=>{
        test('Should return status 200 when getting all categories from user', async ()=>{
            const response = await request(app)
            .get('/api/v1/category/1')
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
    });
    describe('Post /category', ()=>{
        test('Should return status 201 when new category is created', async()=>{
            const data = {
                name: "Clothing",
            }
            const response = await request(app)
            .post('/api/v1/category')
            .set('Authorization', `Bearer ${token}`)
            .send(data);
            expect(response.status).toBe(201);
            categoryID = response.body.id;
            
        })
        test('Should return status 422 when creating a new category with missing data', async()=>{
            const data = {}
            const response = await request(app)
            .post('/api/v1/category')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(422);
        })

    })
    describe('Delete /category/:id', ()=>{
        test('Should return 200 when category is deleted', async()=>{
            const response = await request(app)
            .delete(`/api/v1/category/${categoryID}`)
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
    })

})
