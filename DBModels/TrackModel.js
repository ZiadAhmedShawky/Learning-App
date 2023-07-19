const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: [3, "too short Track name"],
    maxlength: [32, "too long Track name"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  img: {
    type: String,
    // required: true,
  },
});
const TrackModel = mongoose.model("Track", TrackSchema);
module.exports = TrackModel;
