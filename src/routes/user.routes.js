const userRouter = require('express').Router();
const user = require('../controllers/user.controller');
const {getUserSchema, updateUserSchema} = require('../schemas/user.schema');
const dataValidator = require('../middlewears/dataValidation');

userRouter.get('/', async(req, res)=>{
    try{
        const data = await user.getAllUsers();
        res.status(200);
        res.send(data);
    }catch(err){
        next(err)
    }
})

userRouter.post('/',
    dataValidator(getUserSchema, 'body'),
    async(req, res, next)=>{
        try{
            const userId = req.body.id;
            const data = await user.getUser(userId);
            console.log(data);
            res.status(200);
            res.send(data);
        }catch(err){
            next(err);
        }
})

userRouter.patch('/:id',
    dataValidator(updateUserSchema, 'body'),
    async(req, res, next)=>{
    try{
        const data = req.body;
        const userId = req.params.id;
        await user.updateUser(userId, data);
        res.status(200);
        res.send("Updated")
    }catch(err){
        next(err)
    }
})

// userRouter.delete('/:id', async (req, res, next)=>{
//     try{
//         const userId = req.params.id;
//         await user.deleteUser(userId);
//         res.status(200);
//         res.send("Deleted")
//     }catch(err){
//         console.log(err);
//         next(err)
//     }
// })

module.exports = userRouter;