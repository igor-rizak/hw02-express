const Joi = require("joi");

const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
})

const addUpdateSchema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
})

module.exports = {
    addSchema,
    addUpdateSchema,
}