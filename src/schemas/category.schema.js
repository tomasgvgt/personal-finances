const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const userId = Joi.number();


const createCategorySchema = Joi.object({
    name: name.required(),
    userId: userId.required(),
})
const getCategoriesSchema = Joi.object({
    userId: userId.required()
})
const deleteCategorySchema = Joi.object({
    id: id.required(),
})
const updateCategorySchema = Joi.object({
    id: id.required(),
    name: name.required()
})
module.exports = {
    createCategorySchema, 
    getCategoriesSchema,
    deleteCategorySchema,
    updateCategorySchema
}
