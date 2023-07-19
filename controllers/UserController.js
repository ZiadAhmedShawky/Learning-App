const slugify = require("slugify");
const User = require("../DBModels/UserModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/CreateToken");

// @desc     Get list of Users
// @route    GET /users
// @Access   Private|Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  //   const users = await User.find(req.filterObj).skip(skip).limit(limit);
  const users = await User.find().skip(skip).limit(limit);
  res.status(200).json({ results: users.length, page, data: users });
});
//_________________________________________________________________________________________________

// @desc     Get specific user by Id
// @route    GET /users/:id
// @Access   Private|Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc     Create user
// @route    POST /users
// @Access   Private|Admin
exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const user = await User.create(
    req.body
    // {

    // name,
    // email,
    // phone,
    // password,
    // role,
    // slug: slugify(name),
    //We haven't made the picture yet
    // }
  );
  res.status(201).json({ data: user });
});

// @desc     Update specific user by Id
// @route    PUT /users/:id
// @Access   Private|Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, role, profileImg } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), phone, role, email, profileImg },
    { new: true }
    //We haven't update the picture yet
  );
  if (!user) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc     Delete specific user by Id
// @route    DELETE /users/:id
// @Access   Private|Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id }, { new: true });
  if (!user) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(204).send();
});

// @desc     Update specific userPassword by Id
// @route    PUT /users/:id
// @Access   Private|Admin
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangeAt: Date.now(),
    },
    { new: true }
    //We haven't update the picture yet
  );
  if (!user) {
    return next(new ApiError(`No User for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc     GET Logged User data
// @route    GET /users/get-my-data
// @Access   Private| Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc     Update Logged User Password
// @route    GET /users/changeMyPassword
// @Access   Private| Protect
exports.UpdateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.user._id)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangeAt: Date.now(),
    },
    { new: true }
  );

  // 2- Generate token
  const token = createToken(user._id);
  res.status(201).json({ data: user, token });
});
