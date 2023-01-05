const account = require('../controllers/account.controller');
const router = require('express').Router();
const {createAccountSchema, getAccountsFromUserSchema, getAccountSchema, updateAccountSchema, deleteAccountSchema} = require('../schemas/account.schema');
const dataValidator = require('../middlewears/dataValidation');
const passport = require('../auth');

router.post('/',
    passport.authenticate('jwt', {session: false}),
    dataValidator(createAccountSchema, 'body'),
    async (req, res, next)=>{
        try{
            if(req.body.userId !== req.user.id){
                const error = new Error('Unauthorized');
                error.name = "UnauthorizedError";
                throw error;
            }
            const data = req.body;
            let newAccount = await account.createAccount(data);
            res.status(201);
            res.send(newAccount)
        }catch(err){
            next(err)
        }
})

router.get('/user-accounts/:userId',
    passport.authenticate('jwt', {session: false}),
    dataValidator(getAccountsFromUserSchema, 'params'),
    async (req, res, next)=>{
    try{
        const userId = req.user.id;
        let accounts = await account.getAccountsFromUser(userId);
        res.status(200);
        res.send(accounts);
    }catch(err){
        next(err);
    }
})

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    dataValidator(updateAccountSchema, 'body'),
    dataValidator(getAccountSchema, 'params'),
    async (req, res, next)=>{
    try{
        const userId = req.user.id;
        const accountId = req.params.id;
        const data = req.body;
        await account.updateAccount(userId, accountId, data);
        res.status(200);
        res.send("Modified")
    }catch(err){
        next(err);
    }
})

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    dataValidator(deleteAccountSchema, 'params'),
    async (req, res, next)=>{
        try{
            const accountId = req.params.id;
            const userId = req.user.id;
            await account.deleteAccount(userId, accountId);
            res.status(200);
            res.send("Deleted")
        }catch(err){
            next(err);
        }
})


module.exports = router;
