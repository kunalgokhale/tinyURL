var Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        console.log('inside the validator');
        return(req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            next();
        }
    },

    schemas: {
        body: {
            longUrl: Joi.string().required()
        }
    }
};