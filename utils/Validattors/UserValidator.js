const { check } = require("express-validator");
const slugify = require("slugify");
const User = require("../../DBModels/UserModel");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const bcrypt = require("bcryptjs");

exports.creatUserValidator = [
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

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-AE"])
    .withMessage("Invalid phone number only accept EG or AE phone number"),

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

  check("profileImg").optional(),

  check("role").optional(),

  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  check("currentPassword")
    .notEmpty()
    .withMessage("you must enter current password"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("you must enter the Password confirmation "),
  check("password")
    .notEmpty()
    .withMessage("you must enter new password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .custom(async (val, { req }) => {
      // 1-Verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("there is no user for this id");
      }
      const isCorrectCurrentPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectCurrentPassword) {
        throw new Error("incorrect current password");
      }

      //2-Verify password confirm
      if (val != req.body.passwordConfirm) {
        throw new Error("password confirmation is incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.UpdateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  check("name")
    // .optional()
    .notEmpty()
    .withMessage("name User required")
    .isLength({ min: 2 })
    .withMessage("Too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .optional()
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
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-AE"])
    .withMessage("Invalid phone number only accept EG or AE phone number"),

  check("profileImg").optional(),

  check("role").optional(),
  validatorMiddleware,
];

exports.DeleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
