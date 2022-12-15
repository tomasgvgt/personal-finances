const Joi = require('joi');

const id = Joi.number();
const firstName = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(5).max(20);
const userName = Joi.string().min(5).max(10);


const createUserSchema = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    userName: userName.required()
})
const getUserSchema = Joi.object({
    id: id.required()
})

const updateUserSchema = Joi.object({
    firstName,
    lastName,
    email,
    password
});

module.exports = {
    createUserSchema, 
    getUserSchema,
    updateUserSchema
}
