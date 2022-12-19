const router = require('express').Router();
const transaction = require('../controllers/transaction.controller');
const dataValidator = require('../middlewears/dataValidation');
const {
    createTransactionSchema,
    getTransactionsFromAccountSchema,
    getTransactionsFromUserSchema,
    getFromCategorySchema,
    updateTransactionSchema,
    getFromTransactionIdSchema,
    deleteTransactionSchema
    } = require('../schemas/transaction.schema');
 
router.post('/',
    dataValidator(createTransactionSchema, 'body'),
    async(req, res, next)=>{
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

router.get('/user/:userId',
    dataValidator(getTransactionsFromUserSchema, 'params'),
    dataValidator(getFromCategorySchema, 'query'),
    async (req, res, next)=>{
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

router.get('/account/:accountId',
    dataValidator(getTransactionsFromAccountSchema, 'params'),
    dataValidator(getFromCategorySchema, 'query'),
    async (req, res, next)=>{
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

router.patch('/:id',
    dataValidator(updateTransactionSchema, 'body'),
    dataValidator(getFromTransactionIdSchema, 'params'),
    async (req, res)=>{
    try{
        const transactionId = req.params.id;
        const data = req.body;
        await transaction.updateTransaction(transactionId, data);
        res.status(200);
        res.send({
            message: "Transaction successfully modified"
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldn't modify transaction"
        })
    }
})


router.delete('/:id',
    dataValidator(deleteTransactionSchema, 'params'),
    async (req, res, next)=>{
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
