const slugify = require("slugify");
const Course = require("../DBModels/CoursesModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");


exports.postAddCourse = async (req, res) => {
  const { courseName, description, author, img, track} = req.body;
  const videos=req.files.map(file=>file.filename)
  const course = await Course.create({
    courseName,
    description,
    author,
    img,
    track,
    slug: slugify(courseName),
    video:videos
  });

  try {
    await course.save();
    res.redirect("/");
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getAddCourse = async (req, res) => {
  try {
    res.render("admin/add-course");
  } catch (e) {
    res.send(e);
  }
};


// nested route
//@route   GET showTracks/:trackId/showCourses

// @desc     Get list of courses
// @route    GET /showCourses
// @Access   Public
exports.showCourses = async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  // let filterObject = {};
  // if (req.params.trackId) filterObject = { track: req.params.trackId };
  //
  //
  // filterObject = { track: "64614a72b2ccebc5878a2865" };

  // const courses = await Course.find(filterObject).skip(skip).limit(limit);
  const courses = await Course.find().skip(skip).limit(limit);
  //res.status(200).json({ results: courses.length, page, data: courses });
  try {
    res.render("showCourses", {
      courseTitle: "All Courses",
      courses,
    });
  } catch (e) {
    res.send(e);
  }
};
//_________________________________________________________________________________________________

// @desc     Get specific course by Id
// @route    GET /showCourses/:id
// @Access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const course = await Course.find({slug});

  if (!course) {
    return next(new ApiError(`No course for this id ${slug}`, 404));
  }
  res.render('course',{
    course
  })

});

// @desc     Update specific course by Id
// @route    PUT /showCourses/:id
// @Access   Privete|Admin
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { courseName, description, author, img } = req.body;

  const course = await Course.findOneAndUpdate(
    { _id: id },
    { courseName, slug: slugify(courseName), description, author, img },
    { new: true }
  );
  if (!course) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(200).json({ data: course });
});

// @desc     Delete specific course by Id
// @route    DELETE /showCourses/:id
// @Access   Privete|Admin
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete({ _id: id }, { new: true });
  if (!course) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(204).send();
});
