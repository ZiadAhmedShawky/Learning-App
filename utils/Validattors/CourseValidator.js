const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getCourseValidator = [
  check("id").isMongoId().withMessage("Invalid Course id format"),
  validatorMiddleware,
];

exports.creatCourseValidator = [
  check("courseName")
    .notEmpty()
    .withMessage("name Course required")
    .isLength({ min: 2 })
    .withMessage("Too short Course name")
    .isLength({ max: 100 })
    .withMessage("Too long Course name"),
  check("description")
    .notEmpty()
    .withMessage("Course must have decription")
    .isLength({ min: 20 })
    .withMessage("Too short decription"),
  check("author")
    .notEmpty()
    .withMessage("name Course author required")
    .isLength({ min: 3 })
    .withMessage("Too short author name"),
  //
  //
  //must check have image but before use multer for image
  //
  //

  check("track")
    .notEmpty()
    .withMessage("Course must be belong to parent track")
    .isMongoId()
    .withMessage("Invalid track id format"),
  validatorMiddleware,
];

exports.UpdateCourseValidator = [
  check("id").isMongoId().withMessage("Invalid Course id format"),
  validatorMiddleware,
];

exports.DeleteCourseValidator = [
  check("id").isMongoId().withMessage("Invalid Course id format"),
  validatorMiddleware,
];
