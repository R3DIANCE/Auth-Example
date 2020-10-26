const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]*$)/)
        .min(2)
        .max(30)
        .required(),
    password: Joi.string().trim().min(8).required(),
});

const schema2 = Joi.object({
    username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]*$)/)
        .min(2)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().trim().min(8).required(),
});

module.exports = { schema, schema2 };
