const userSchema = require("../userSchema");

const contactsValidation = (req, res, next) => {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    return res.json({
      status: validationResult.error.details[0].message,
      code: 401,
      message: "Email or password is wrong",
    });
  }
  next();
};

module.exports = contactsValidation;
