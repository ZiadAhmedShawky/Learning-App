const express = require("express");
const mainController = require("../controllers/maincontroller");
const User = require("../DBModels/UserModel");
const authController = require("../controllers/authController");

const router = express.Router();



router.get("/",authController.isLoggedIn,mainController.mainPage);

router.get("/frontend-track",authController.isLoggedIn ,mainController.frontendPage);

router.get("/backend-track",authController.isLoggedIn,authController.isLoggedIn ,mainController.backendPage);

router.get("/mobile-track",authController.isLoggedIn, mainController.mobilePage);

router.get("/chat",authController.isLoggedIn, mainController.chatPage);

// router.get("/signup", mainController.getSignUpPage);

// router.post("/sign-up", authController.postSignUpPage);

// router.get("/login", mainController.getLoginPage);

// router.post("/login", authController.postLoginPage);

router.get("/logout", mainController.logoutPage);

router.get("/delete-account", mainController.deleteAccount);

module.exports = router;
