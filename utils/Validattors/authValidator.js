const { check } = require("express-validator");
const slugify = require("slugify");
const User = require("../../DBModels/UserModel");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.signUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("name User required")
    .isLength({ min: 2 })
    .withMessage("Too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("email address already in use"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirm) {
        throw new Error("password confirmation is incorrect");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),

  validatorMiddleware,
];
exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  validatorMiddleware,
];
