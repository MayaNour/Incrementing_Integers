//Validation
const Joi = require('@hapi/joi'); 

// validation
const userValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
        });
    return schema.validate(data);
     
};

const currentNumberValidation = data =>{
    const schema = Joi.object({
        current: Joi.number().min(0)
    });
    return schema.validate(data);
}

module.exports.userValidation = userValidation;
module.exports.currentNumberValidation = currentNumberValidation;