const express = require("express");
const router = express.Router();
const {
  getTrackValidator,
  creatTrackValidator,
  UpdateTrackValidator,
  DeleteTrackValidator,
} = require("../utils/Validattors/TrackValidator");
const {
  CreateTrack,
  getTracks,
  getTrack,
  updatetrack,
  deletetrack,
} = require("../controllers/TrackControler");
const authController = require("../controllers/authController");


router.post(
  "/admin/addTrack",
  authController.isLoggedIn,
  authController.allowedTo("admin"),
  creatTrackValidator,
  CreateTrack
);

router.get("/showTracks", getTracks);
router
  .route("/showTracks/:id")
  .get(getTrackValidator, getTrack)
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    UpdateTrackValidator,
    updatetrack
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    DeleteTrackValidator,
    deletetrack
  );
module.exports = router;
