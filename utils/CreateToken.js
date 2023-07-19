const jwt = require("jsonwebtoken");
// func to generate token
const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  }
  );

module.exports = createToken;
