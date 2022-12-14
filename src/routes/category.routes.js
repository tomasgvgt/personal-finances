const categoryRouter = require('express').Router();
const category = require('../controllers/category.controller');

//Create a new category
//Automatically will be linked to user.
categoryRouter.post('/', async (req, res, next)=>{
    try{
        let {userId, categoryName} = req.body;
        let newCategory = await category.createCategory(userId, categoryName);
        res.status(201);
        res.send({
            message: newCategory
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt create new Category"
        })
    }
})
categoryRouter.delete('/:id', async (req, res, next)=>{
    try{
        const categoryId = req.params.id;
        await category.deleteCategory(categoryId);
        res.status(200);
        res.send({
            message: 'Category succesfully deleted'
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Category couldnt be deleted"
        })
    }
})

categoryRouter.patch('/:id', async (req, res, next)=>{
    try{
        let categoryId = req.params.id;
        let categoryName = req.body.categoryName;
        await category.updateCategory(categoryId, categoryName);
        res.status(200);
        res.send({
            message: 'Category succesfully updated'
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Category couldnt be updated"
        })
    }
})
categoryRouter.get('/:userId', async (req, res, next)=>{
    try{
        let userId = req.params.userId;
        let categoriesFromUser = await category.getUserCategories(userId);
        res.status(200).send({
            message: categoriesFromUser
        })
    }catch(error){
        res.status(400);
        res.send({
            error: "Couldnt get Categories from User"
        })
    }
})


module.exports = categoryRouter;
