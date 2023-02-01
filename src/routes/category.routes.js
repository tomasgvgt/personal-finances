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
        res.send(newCategory)
    }catch(err){
        next(err);
    }
})
categoryRouter.delete('/:id', dataValidator(deleteCategorySchema, 'params'),  async (req, res, next)=>{
    try{
        const categoryId = req.params.id;
        await category.deleteCategory(categoryId);
        res.status(200);
        res.send("Deleted")
    }catch(error){
        next(err)
    }
})

categoryRouter.patch('/', dataValidator(updateCategorySchema, 'body'), async (req, res, next)=>{
    try{
        let id = req.body.id;
        let name = req.body.name;
        await category.updateCategory(id, name);
        res.status(200);
        res.send("Updated")
    }catch(error){
        next(error)
    }
})
categoryRouter.get('/:userId', dataValidator(getCategoriesSchema, 'params'), async (req, res, next)=>{
    try{
        let userId = req.params.userId;
        let categoriesFromUser = await category.getUserCategories(userId);
        res.status(200).send(categoriesFromUser)
    }catch(error){
        nerxt(error);
    }
})


module.exports = categoryRouter;
