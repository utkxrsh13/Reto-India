const Joi = require('joi');


const signupValidation = (req, res, next) => {
    const schema = Joi.object({
      fullname: Joi.string().min(3).required(), // Ensure this matches the field name in your request
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
      phoneNo: Joi.string().required(), // Add phoneNo validation
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: 'Bad request', error: error.details[0].message });
    }
  
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success: false, 
            message: "Bad request", 
            error: error.details.map(err => err.message) 
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
}