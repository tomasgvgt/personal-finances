const userRouter = require('express').Router();
const user = require('../controllers/user.controller');

userRouter.post('/', async(req, res)=>{
    try{
        const data = await user.getUser(req.body.userName);
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

userRouter.patch('/', async(req, res, next)=>{
    try{
        const data = await user.updateUser(req.body);
        res.status(200);
        res.send({
            message: data
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt modify user"
        })
    }
})

userRouter.delete('/', async (req, res)=>{
    try{
        const data = await user.deleteUser(req.body.userName);
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