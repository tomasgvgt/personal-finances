const userRouter = require('express').Router();
const user = require('../controllers/user.controller');
const {getUserSchema, updateUserSchema} = require('../schemas/user.schema');
const dataValidator = require('../middlewears/dataValidation');

userRouter.get('/', async(req, res)=>{
    try{
        const data = await user.getAllUsers();
        res.status(200);
        res.send({
            message: data
        })
    }catch(err){
        res.status(400);
        res.send({
            error: "Couldnt load users"
        })
    }
})

userRouter.post('/', async(req, res)=>{
    try{
        const userId = req.body.id;
        const data = await user.getUser(userId);
        console.log(data);
        res.status(200);
        res.send({
            message: data
        })
    }catch(err){
        res.status(400);
        res.send({
            error: "Couldnt load users"
        })
    }
})

userRouter.post('/',
    dataValidator(getUserSchema, 'body'),
    async(req, res)=>{
        try{
            const userId = req.body.id;
            const data = await user.getUser(userId);
            console.log(data);
            res.status(200);
            res.send({
                message: data
            })
        }catch(err){
            res.status(400);
            res.send({
                error: "User not found"
            })
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
        res.send({
            message: "User updated successfully"
        })
    }catch(error){
        res.status(400);
        console.log(error);
        res.send({
            error: "Couldnt modify user"
        })
    }
})

userRouter.delete('/:id', async (req, res)=>{
    try{
        const userId = req.params.id;
        await user.deleteUser(userId);
        res.status(200);
        res.send({
            message: "User succesfully deleted"
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt delete user"
        })
    }
})

module.exports = userRouter;