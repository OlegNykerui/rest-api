const Joi = require("joi");

const joi = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().alphanum().min(3).max(15).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  joi,
  updateFavoriteSchema,
};

module.exports = {
  schemas,
};
