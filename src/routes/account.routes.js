const account = require('../controllers/account.controller');
const router = require('express').Router();
const {createAccountSchema, getAccountsFromUserSchema, getAccountSchema, updateAccountSchema, deleteAccountSchema} = require('../schemas/account.schema');
const dataValidator = require('../middlewears/dataValidation');

router.post('/', dataValidator(createAccountSchema, 'body'), async (req, res, next)=>{
    try{
        const data = req.body;
        let newAccount = await account.createAccount(data);
        res.status(201);
        res.send({
            message: newAccount,
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldn't create new account"
        })
    }
})

router.get('/user-accounts/:userId', dataValidator(getAccountsFromUserSchema, 'params'), async (req, res, next)=>{
    try{
        const userId = req.params.userId;
        let accounts = await account.getAccountsFromUser(userId);
        res.status(200);
        res.send({
            message: accounts
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt load accounts"
        })
    }
})

router.patch('/:id',
    dataValidator(updateAccountSchema, 'body'),
    dataValidator(getAccountSchema, 'params'),
    async (req, res, next)=>{
    try{
        const accountId = req.params.id;
        const data = req.body;
        await account.updateAccount(accountId, data);
        res.status(200);
        res.send({
            message: "Account successfully modified"
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldn't modify account"
        })
    }
})

router.delete('/:id', dataValidator(deleteAccountSchema, 'params'), async (req, res, next)=>{
    try{
        const accountId = req.params.id;
        await account.deleteAccount(accountId);
        res.status(200);
        res.send({
            message: "Account successfully deleted"
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldn't delete account"
        })
    }
})


module.exports = router;
