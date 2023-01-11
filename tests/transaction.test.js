const request = require('supertest');
const app = require('../src');

let token;
let categoryID;
let accountID;
let userID;
let transactionID;

describe('Sign-up', () => {
    describe('Sign-up POST /sign-up', () => {
      test('Should return 201 when user signs-up', async () => {
        const user = {
          firstName: 'Odysseus',
          lastName: 'King',
          userName: 'oddyseus',
          email: 'oddyseus@gmail.com',
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
          username: 'oddyseus',
          password: '123456',
        };

        const response = await request(app)
        .post('/api/v1/auth/log-in')
        .send(user);
        expect(response.status).toBe(200);
        token = response.body.token;
        userID = response.body.id;
    });
});
});

describe('Post /category', ()=>{
    test('Should return status 201 when new category is created', async()=>{
        const data = {
            name: "Gifts",
        }
        const response = await request(app)
        .post('/api/v1/category')
        .set('Authorization', `Bearer ${token}`)
        .send(data);
        expect(response.status).toBe(201);
        categoryID = response.body.id;
        console.log(categoryID);
        
    })
})

describe('Post /account', ()=>{
    test('Should return status 201 when new account is created', async()=>{
        const data = {
            name: "Savings Axos",
            type: "Savings",
            bank: "Axos",
            description: "My savings account",
            total: 6000,
        }
        const response = await request(app).post('/api/v1/account')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        expect(response.status).toBe(201);
        accountID = response.body.id;
        
    })
})

describe('Transaction', ()=>{
    describe('Get /transaction/user/:userId', ()=>{
        test('Should return status 200 when getting all transactions from user', async ()=>{
            const response = await request(app)
            .get('/api/v1/transaction/user/1')
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
    });
    describe('Get /transaction/account/:accountId', ()=>{
        test('Should return status 200 when getting all transactions from account', async ()=>{
            const response = await request(app)
            .get(`/api/v1/transaction/account/${accountID}`)
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
    });
    describe('Post /transaction', ()=>{
        test('Should return status 201 when new transaction is created', async()=>{
            const data = {
                type: "income",
                amount: 3000,
                categoryId: categoryID,
                accountId: accountID,
                userId: userID
            }
            const response = await request(app)
            .post('/api/v1/transaction')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(201);
            transactionID = response.body.id;
            
        })
        test('Should return status 422 when creating a new transaction with missing data', async()=>{
            const data = {
                type: "income",
                amount: 3000,
                categoryId: categoryID,
                accountId: accountID
            }
            const response = await request(app)
            .post('/api/v1/transaction')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(422);
            
        })

    })
    describe('Patch /transaction/:id', ()=>{
        test('Should return 200 when transaction is patched', async()=>{
            const data = {
                description: "New Description",
                categoryId: categoryID
            };
            const response = await request(app)
            .patch(`/api/v1/transaction/${transactionID}`)
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(200);
        })
        test('Should return 422 when trying to patch account with wrong information', async()=>{
            const data = {
                cription: "New Description",
                categoryId: categoryID
            }
            const response = await request(app)
            .patch(`/api/v1/transaction/${transactionID}`)
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            expect(response.status).toBe(422);
            
        })
    })
    describe('Delete /transaction/:id', ()=>{
        test('Should return 200 when transaction is deleted', async()=>{
            const response = await request(app)
            .delete(`/api/v1/transaction/${transactionID}`)
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
    })

})
