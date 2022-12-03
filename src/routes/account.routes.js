const account = require('../controllers/account.controller');
const router = require('express').Router();

router.post('/', async (req, res, next)=>{
    try{
        let newAccount = await account.createAccount(req.body);
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

router.post('/user-accounts', async (req, res, next)=>{
    try{
        let accounts = await account.getAccountsFromUser(req.body.userName);
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

router.patch('/', async (req, res, next)=>{
    try{
        await account.updateAccount(req.body.userName, req.body.accountId, req.body.data);
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

router.delete('/', async (req, res, next)=>{
    try{
        const isDeleted = await account.deleteAccount(req.body.userName, req.body.accountId);
        if(isDeleted === 0) throw new Error();
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
