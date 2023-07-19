const User = require("../DBModels/UserModel");
const Course=require('../DBModels/CoursesModel')

exports.mainPage = async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;

  let query = {};

  // Check if a search query is provided
  if (req.query.search) {
    const searchKeyword = req.query.search;
    query = {courseName: { $regex: `^${searchKeyword}`, $options: "i"  },
    
    };
  }
  const courses = await Course.find(query).skip(skip).limit(limit);

  try {
    res.render("main",{
      courses,
    });
  } catch (e) {
    res.json({
      data: {
        status: "fail",
      },
    });
  }
};


exports.frontendPage = async(req, res) => {
  const courses=await Course.find({track:'646504e68ac81a2b1f175593'})
  res.render("showCourses", {
    courses,
   courseTitle: "Frontend Courses",
 });
};
exports.backendPage = async(req, res) => {
const courses=await Course.find({track:'64614a72b2ccebc5878a2865'})

   res.render("showCourses", {
     courses,
    courseTitle: "Backend Courses",
  }); 
};
exports.mobilePage = async(req, res) => {
  const courses=await Course.find({track:'646504f08ac81a2b1f175595'})

  //646504f08ac81a2b1f175595
  res.render("showCourses", {
    courses,
   courseTitle: "Mobile Courses",
 }); 
};
exports.chatPage = (req, res) => {
  res.render("./includes/chat");
};

exports.logoutPage = (req, res) => {
  //res.render("logout");
};
exports.deleteAccount = (req, res) => {
  //res.render("delete-account");
};

