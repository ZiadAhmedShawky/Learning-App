const express = require("express");
const multer=require('multer')
const path=require('path')
const {
  getCourseValidator,
  creatCourseValidator,
  UpdateCourseValidator,
  DeleteCourseValidator,
} = require("../utils/Validattors/CourseValidator");
const {
  postAddCourse,
  getAddCourse,
  showCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/Coursecontroler");
const authController = require("../controllers/authController");


const diskStoarage=multer.diskStorage({
  destination:'videos',
  filename:(req,file,cb)=>{
    const fileExtention=file.mimetype.split("/")[1];
    cb(null,`${file.originalname}.${fileExtention}`)
  }
})

const multerFilter=(req,file,cb)=>{
  if(file.mimetype.split("/")[1]==='mp4'){
    cb(null,true)
  }else{
    cb(new Error('Please a video'),false)
  }
}

const upload=multer({
  storage:diskStoarage,
  fileFilter:multerFilter
})

const router = express.Router();

router.get("/showCourses", showCourses);

//Salwa
router.get("/admin/addCourse", getAddCourse);

router.post("/admin/addCourse",/*   authController.protect,*/  /* authController.allowedTo("admin"), */upload.array('videos'),
  postAddCourse
);

router
  .route("/:slug")
  .get( getCourse)
  .put(
    // authController.protect,
    // authController.allowedTo("admin"),
    UpdateCourseValidator,
    updateCourse
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    DeleteCourseValidator,
    deleteCourse
  );

module.exports = router;
