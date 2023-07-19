const User = require("../DBModels/UserModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createToken = require("../utils/CreateToken");

const createSendToken = (user, statusCode, res) => {
  const token = createToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // 2- Generate token
  //const token = createToken(user._id);

  //res.status(201).json({ data: user, token });
  res.redirect('/auth/login')
});

// @desc     Log In
// @route    PUT /auth/login
// @Access   Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body will execute in ==> (validation layer)

  // 2) check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("incorrect password or email", 401));
  }

  // 3) Generate token
  const token = createToken(user._id);
  // 4) send response to client side

  //res.status(200).json({ data: user, token });
  createSendToken(user, 200, res);
  res.redirect('/')
});

//render sign Up page
exports.SignUpPage = async (req, res) => {
  res.render("sign-up", {
    courseTitle: undefined,
    path: undefined,
  });
};

//render login page
exports.LoginPage = async (req, res) => {
  res.render("login", {
    courseTitle: undefined,
    path: undefined,
  });
};

// @desc make sure that the user is logged in and have token
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }else if(req.cookies.jwt){
    token =req.cookies.jwt
  }
  if (!token) {
    return next(
      new ApiError("you are not login, please login to Access this route", 401)
    );
  }
  // 2) Verify token (по change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded);
  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "the user that belong to this token does on longer exist",
        401
      )
    );
  }
  // 4) Check if user change his password after token created
  if (currentUser.passwordChangeAt) {
    passChangedTimeStamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000,
      10
    );
    // console.log(passChangedTimeStamp, decoded.iat);

    //password changed after token created
    if (passChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again",
          401
        )
      );
    }
  }
  req.user = currentUser;
  //req.token=token;

  next();
});

//for rendering pages
exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  if(!req.cookies.jwt){
    return res.redirect('/auth/login')
  }
    
  // 1) Verify token (по change happens, expired token)
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  // console.log(decoded);
  // 2) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return res.redirect('/')
  }
  // 3) Check if user change his password after token created
  if (currentUser.passwordChangeAt) {
    passChangedTimeStamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000,
      10
    );
    // console.log(passChangedTimeStamp, decoded.iat);

    //password changed after token created
    if (passChangedTimeStamp > decoded.iat) {
      return next();
    }
  }
  //there is a logged in user
  res.locals.user=currentUser
  req.user=currentUser
  next();
});


// role  ==> ["admin"," "]
// Closure function
exports.allowedTo = (...role) =>
  asyncHandler(async (req, res, next) => {
    //  1- Access the roles
    //  2- Access registered user  from ==>>> (req.user.role)
    if (!role.includes(req.user.role)) {
      return next(
        new ApiError("you are not allowed to Access this route", 403)
      );
    }
    next();
});
