const router = require('express').Router();
const transaction = require('../controllers/transaction.controller');

router.post('/', async(req, res, next)=>{
    try{
        let data = req.body;
        let newTransaction = await transaction.createTransaction(data);
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

router.get('/user/:userId', async (req, res, next)=>{
    try{
        const userId = req.params.userId;
        let categoryId;
        if(req.query.category) categoryId = req.query.category;
        let transactions = await transaction.getTransactionsFromUser(userId, categoryId);
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

router.get('/account/:accountId', async (req, res, next)=>{
    try{
        let accountId = req.params.accountId;
        let categoryId;
        if(req.query.category) categoryId = req.query.category;
        let transactions = await transaction.getTransactionsFromAccount(accountId, categoryId);
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

router.delete('/:id', async (req, res, next)=>{
    try{
        const transactionId = req.params.id;
        await transaction.deleteTransaction(transactionId);
        res.status(200);
        res.send({
            message: "Transaction Succesfully Deleted"
        })
    }catch(error){
        res.status(400);
        res.send({
            error: 'Couldnt delete transactions'
        })
    }
})




module.exports = router;
