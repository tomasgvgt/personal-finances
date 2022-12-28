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
        res.status(201);
        res.send(newTransaction);
    }catch(err){
        next(err);
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
        res.send(transactions)
    }catch(err){
        next(err);
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
        res.send(transactions)
    }catch(err){
        next(err);
    }
})

router.patch('/:id',
    dataValidator(updateTransactionSchema, 'body'),
    dataValidator(getFromTransactionIdSchema, 'params'),
    async (req, res, next)=>{
    try{
        const transactionId = req.params.id;
        const data = req.body;
        await transaction.updateTransaction(transactionId, data);
        res.status(200);
        res.send("Updated")
    }catch(err){
       next(err);
    }
})


router.delete('/:id',
    dataValidator(deleteTransactionSchema, 'params'),
    async (req, res, next)=>{
    try{
        const transactionId = req.params.id;
        await transaction.deleteTransaction(transactionId);
        res.status(200);
        res.send("Deleted")
    }catch(err){
        next(err);
    }
})

module.exports = router;
