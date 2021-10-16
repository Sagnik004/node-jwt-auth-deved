const Joi = require("joi");

// Register Validation
const registerValidation = (registerData) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate({
    name: registerData.name,
    email: registerData.email,
    password: registerData.password,
  });
}

// Login Validation
const loginValidation = (loginData) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate({
    email: loginData.email,
    password: loginData.password,
  });
}

module.exports = {
  registerValidation,
  loginValidation,
};
