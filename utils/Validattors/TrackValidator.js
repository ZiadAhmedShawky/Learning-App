const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getTrackValidator = [
  check("id").isMongoId().withMessage("Invalid Track id format"),
  validatorMiddleware,
];
exports.creatTrackValidator = [
  check("name")
    .notEmpty()
    .withMessage("name trackkkkkkkkk required")
    .isLength({ min: 3 })
    .withMessage("Too shortTrack name")
    .isLength({ max: 32 })
    .withMessage("Too long Track name"),
  validatorMiddleware,
];

exports.UpdateTrackValidator = [
  check("id").isMongoId().withMessage("Invalid Track id format"),
  validatorMiddleware,
];

exports.DeleteTrackValidator = [
  check("id").isMongoId().withMessage("Invalid Track id format"),
  validatorMiddleware,
];
