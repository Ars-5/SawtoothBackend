const Joi = require('joi');

const schema = Joi.object({
    mail: Joi.string()
        .min(3)
        .max(30)
        .required(),
    name: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    dni: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    faculty:Joi.string().min(3),
    modality:Joi.string().min(3),


})


module.exports = schema; 