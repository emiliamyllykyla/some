const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(6).max(30).trim().required(),
    password: Joi.string().min(8).max(72, "utf8").required(),
  });
  return schema.validate(data);
};

const userEditValidation = (data) => {
  const schema = Joi.object({
    img: Joi.string().uri().allow(""),
  });
  return schema.validate(data);
};

const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(64).trim().required(),
    description: Joi.string().min(1).max(3060).required(),
    img: Joi.string().uri().allow(""),
  });
  return schema.validate(data);
};

module.exports = { userValidation, userEditValidation, postValidation };
