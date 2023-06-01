const Joi = require("joi");

const commonKeys = {
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(5).max(30).required(),
  password: Joi.string().required(),
};

const registrationSchema = Joi.object().keys({
  ...commonKeys,
});


const validateRegistration = (data) => {
  const result = registrationSchema.validate(data);
  result.value = { roleName: "user", ...data };
  return result;
};


module.exports = {
  validateRegistration,
};
