const Joi = require("@hapi/joi");
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const employeeDataValidation = (data) => {
  const schema = Joi.object({
    emp_id: Joi.string().min(1).max(10).required(),
    emp_name: Joi.string().min(3).max(1024).required(),
    emp_designation: Joi.string().min(2).max(1000).required(),
  });
  return schema.validate(data);
};
module.exports = {
  registerValidation,
  loginValidation,
  employeeDataValidation,
};
