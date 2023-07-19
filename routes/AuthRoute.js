const express = require("express");
const {
  signUpValidator,
  loginValidator,
} = require("../utils/Validattors/authValidator");
const {
  signup,
  login,
  LoginPage,
  SignUpPage,
  logout
} = require("../controllers/authController");

const router = express.Router();

router.get("/signup", SignUpPage);
router.get("/login", LoginPage);

router.route("/signup").post(signUpValidator, signup);
router.route("/login").post(loginValidator, login);
// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .delete(DeleteUserValidator, deleteUser)
//   .put(UpdateUserValidator, updateUser);

module.exports = router;
