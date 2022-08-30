const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("email", "this field should be a valid email").isEmail(),
  check("password", "password should have at least 6 char").isLength({
    min: 5,
  }),
  check("lastName", "this field is required").notEmpty(),
  check("firstName", "this field is required").notEmpty(),
];

exports.loginRules = () => [
  check("email", "this field should be a valid email").isEmail(),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array()[0].msg });
  }
  next();
};
