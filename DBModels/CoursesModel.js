const mongoose = require("mongoose");

// create Schema
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "Course Name Required"],
    //unique: [true, "Course Name must be unique"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "Course must have a description"],
  },
  author: {
    type: String,
    required: true,
  },
 /* authorImg:{
    type:String,
    required:true
  }, */
  img: {
    type: String,
    required: true,
  },
  track: {
    type: mongoose.Schema.ObjectId,
    ref: "Track",
    required: [true, "Course must be belong to Specific Track"],
  },
  video:[
    {
      type:String,
      required:true
    }
  ]
});

// create Model
const Course = mongoose.model("Courses", courseSchema);
module.exports = Course;
