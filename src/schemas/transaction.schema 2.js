const Joi = require('joi');

const id = Joi.number();
const type = Joi.string().valid('income', 'expense');
const amount = Joi.number();
const description = Joi.string();
const categoryId = Joi.number();
const accountId = Joi.number();
const userId = Joi.number();
const category = Joi.number();


const createTransactionSchema = Joi.object({
    type: type.required(),
    amount: amount.required(),
    description,
    categoryId,
    accountId: accountId.required(),
    userId: userId.required()
});

const getTransactionsFromUserSchema = Joi.object({
    userId: userId.required()
})

const getTransactionsFromAccountSchema = Joi.object({
    accountId: accountId.required()
})

const getFromCategorySchema = Joi.object({
    category
})

const updateTransactionSchema = Joi.object({
    description,
    categoryId
})

const getFromTransactionIdSchema = Joi.object({
    id: id.required(),
})

const deleteTransactionSchema = Joi.object({
    id: id.required()
})

module.exports = {
    createTransactionSchema,
    getTransactionsFromAccountSchema,
    getTransactionsFromUserSchema,
    getFromCategorySchema,
    deleteTransactionSchema,
    updateTransactionSchema,
    getFromTransactionIdSchema
}