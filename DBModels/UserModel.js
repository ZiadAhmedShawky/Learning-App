const mongoose = require("mongoose");
const validator = require("validator"); // validator package to facilitate validation of emails and passwords
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "name required"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "email required"],
    // trim: true,
    unique: true, // we will discuss in this after DAHAB
    lowercase: true,
    //validation function checks if email is written in a correct manner
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Email is Invalid");
    //   }
    // },
  },
  phone: { String }, // we will discuss in this after DAHAB
  profileImg: { String },
  password: {
    type: String,
    required: [true, "password required"],
    minlength: [8, "too short password"],
    // validate(value) {
    //   if (value.toLowerCase().includes("password")) {
    //     throw new Error("Password Should not contain password");
    //   }
    // },
  },
  passwordChangeAt: Date,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  /* tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ], */
});

/* userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "thisisourlearningwebsite"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};


 */ // function for user detection
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid email or password");
  }

  return user;
};

// before saving the created user we hash his plaintext password
userSchema.pre("save", async function (next) {
  const user = this; // to get our specified user that we are already created right now
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12); //hashing thr user password
  }
  next(); // to go on for the next step and res.redirect to main page
});

const User = mongoose.model("User", userSchema);

module.exports = User;
