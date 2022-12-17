const categoryRouter = require('express').Router();
const category = require('../controllers/category.controller');
const dataValidator = require('../middlewears/dataValidation');
const { createCategorySchema, 
    getCategoriesSchema,
    deleteCategorySchema,
    updateCategorySchema
} = require('../schemas/category.schema');

//Create a new category
//Automatically will be linked to user.
categoryRouter.post('/', dataValidator(createCategorySchema, 'body'), async (req, res, next)=>{
    try{
        let {userId, name} = req.body;
        let newCategory = await category.createCategory(userId, name);
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
categoryRouter.delete('/:id', dataValidator(deleteCategorySchema, 'params'),  async (req, res, next)=>{
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

categoryRouter.patch('/', dataValidator(updateCategorySchema, 'body'), async (req, res, next)=>{
    try{
        let id = req.body.id;
        let name = req.body.name;
        await category.updateCategory(id, name);
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
categoryRouter.get('/:userId', dataValidator(getCategoriesSchema, 'params'), async (req, res, next)=>{
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
