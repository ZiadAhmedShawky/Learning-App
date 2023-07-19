const slugify = require("slugify");
const Track = require("../DBModels/TrackModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc     Create Track
// @route    POST /admin/track
// @Access   Privite|Admin
exports.CreateTrack = asyncHandler(async (req, res) => {
  const { name, img } = req.body;
  const track = await Track.create({
    name,
    img,
    slug: slugify(name),
  });
  res.status(201).json({ data: track });
});

// @desc     Get list of Track
// @route    GET /showTracks
// @Access   Public
exports.getTracks = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const track = await Track.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: track.length, page, data: track });
});

// @desc     Get specific track by Id
// @route    GET /showTracks/:id
// @Access   Public
exports.getTrack = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const track = await Track.findById(id);

  if (!track) {
    // res.status(404).json({ msg: `No track found to this id:${id}` });
    return next(new ApiError(`No track for this id ${id}`, 404));
  }
  res.status(200).json({ data: track });
});

// @desc     Update specific track by Id
// @route    PUT /showTracks/:id
// @Access   Privete|Admin
exports.updatetrack = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, img } = req.body;

  const track = await Track.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), img },
    { new: true }
  );
  if (!track) {
    return next(new ApiError(`No track for this id ${id}`, 404));
  }
  res.status(200).json({ data: track });
});

// @desc     Delete specific track by Id
// @route    DELETE /showTracks/:id
// @Access   Privete|Admin
exports.deletetrack = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const track = await Track.findByIdAndDelete({ _id: id }, { new: true });
  if (!track) {
    return next(new ApiError(`No track for this id ${id}`, 404));
  }
  res.status(204).send();
});
