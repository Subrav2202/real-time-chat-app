const Joi = require("joi");

const commonKeys = {
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  phnNo:Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({
    'string.pattern.base': 'Invalid phone number',
    'any.required': 'Phone number is required'
  }),
  email: Joi.string().min(5).max(30).required(),
  password: Joi.string().required(),
};

const registrationSchema = Joi.object().keys({
  ...commonKeys,
});


const validateRegistration = (data) => {
  console.log({ data })
  const result = registrationSchema.validate(data);
  result.value = { roleName: "user", ...data };
  return result;
};


module.exports = {
  validateRegistration,
};
