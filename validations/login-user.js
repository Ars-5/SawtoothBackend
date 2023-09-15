const Joi = require('joi');

const schema = Joi.object({
    mail: Joi.string()
        .required(),
    password: Joi.string().required(),
})


module.exports = schema; 