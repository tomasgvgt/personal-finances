const router = require('express').Router();
const transaction = require('../controllers/transaction.controller');

router.post('/', async(req, res, next)=>{
    try{
        let newTransaction = await transaction.createTransaction(req.body);
        res.status(200);
        res.send({
            message: newTransaction
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt create new transaction"
        })
    }
})

router.post('/user-transactions', async (req, res, next)=>{
    try{
        let transactions = await transaction.getTransactionsFromUser(req.body.userName);
        res.status(200);
        res.send({
            message: transactions
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt load transactions"
        })
    }
})

router.post('/account-transactions', async (req, res, next)=>{
    try{
        let {userName, accountId} = req.body;
        let transactions = await transaction.getTransactionsFromAccount(userName, accountId);
        res.status(200);
        res.send({
            message: transactions
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt load transactions"
        })
    }
})

module.exports = router;
