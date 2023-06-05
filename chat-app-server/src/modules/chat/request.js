const Joi = require("joi");

const newUserSchema = Joi.object().keys({
    email: Joi.string().min(5).max(30).required(),
});

const validateUser = (req, res, next) => {
  const result = newUserSchema.validate(req.body);
  const isValid = result.error == null;
  if (isValid) {
    return next();
  }

  const { details } = result.error;
  const messages = details.map((e) => e.message);
  const msg = messages.join(",");
  return res.status(400).send({ status: "error", message: msg });
};

module.exports = {
    validateUser,
};
