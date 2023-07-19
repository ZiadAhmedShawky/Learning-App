const express = require("express");
const {
  getUserValidator,
  creatUserValidator,
  UpdateUserValidator,
  DeleteUserValidator,
  changeUserPasswordValidator,
  // updateLoggedUserValidator,
} = require("../utils/Validattors/UserValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  //   uploadUserImage,
  //   resizeImage,
  changeUserPassword,
  getLoggedUserData,
  UpdateLoggedUserPassword,
  //   updateLoggedUserData,
  //   deleteLoggedUserData,
} = require("../controllers/UserController");

const authController = require("../controllers/authController");
const router = express.Router();

// router.use(authService.protect);

router.get("/get-my-data", authController.protect, getLoggedUserData, getUser);
router.put(
  "/changeMyPassword",
  authController.protect,
  UpdateLoggedUserPassword
);
// router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
// router.delete('/deleteMe', deleteLoggedUserData);

// Admin
// router.use(authService.allowedTo('admin', 'manager'));
router.put(
  "/changePassword/:id",
  authController.protect,
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route("/")
  .get(authController.protect, authController.allowedTo("admin"), getUsers)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    creatUserValidator,
    createUser
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.allowedTo("admin"),
    getUserValidator,
    getUser
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    DeleteUserValidator,
    deleteUser
  )
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    UpdateUserValidator,
    updateUser
  );

module.exports = router;
