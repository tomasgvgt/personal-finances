const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const type = Joi.string();
const bank = Joi.string();
const description = Joi.string();
const total = Joi.number();
const userId= Joi.number();


const createAccountSchema = Joi.object({
    name: name.required(),
    type: type.required(),
    bank: bank.required(),
    description,
    total,
    userId: userId.required()
})

const getAccountsFromUserSchema = Joi.object({
    userId: userId.required()
})

const getAccountSchema = Joi.object({
    id: id.required()
})

const updateAccountSchema = Joi.object({
    name,
    type,
    bank,
    description,
    total,
});

const deleteAccountSchema = Joi.object({
    id
})

module.exports = {
    createAccountSchema, 
    getAccountsFromUserSchema,
    getAccountSchema,
    updateAccountSchema,
    deleteAccountSchema
}
