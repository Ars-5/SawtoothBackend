const Joi = require('joi');

const schema = Joi.object({
    dni: Joi.string()
        .min(3)
        .max(30)
        .required(),
    name: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    date: Joi.string().min(3).required(),
    p1: Joi.string().min(1).required(),
    p2: Joi.string().min(1).required(),
    p3: Joi.string().min(1).required(),
    p4: Joi.string().min(1).required(),
    p5: Joi.string().min(1).required()
})


module.exports = schema; 