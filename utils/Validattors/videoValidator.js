const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getVideoValidator = [
  check("id").isMongoId().withMessage("Invalid Video id format"),
  validatorMiddleware,
];
exports.creatVideoValidator = [
  check("name")
    .notEmpty()
    .withMessage("name Video required")
    .isLength({ min: 3 })
    .withMessage("Too short Video name")
    .isLength({ max: 32 })
    .withMessage("Too long Video name"),

  // check("videos")
  //   .exists()
  //   .withMessage("Video upload is required.")
  //   .isMimeType(["video.mp4", "video.webm"])
  //   .withMessage("File must be a valid video format."),

  check("course")
    .notEmpty()
    .withMessage("video must be belong to parent course")
    .isMongoId()
    .withMessage("Invalid course id format"),
  validatorMiddleware,
];

exports.UpdateVideoValidator = [
  check("id").isMongoId().withMessage("Invalid Video id format"),
  validatorMiddleware,
];

exports.DeleteVideoValidator = [
  check("id").isMongoId().withMessage("Invalid Video id format"),
  validatorMiddleware,
];
