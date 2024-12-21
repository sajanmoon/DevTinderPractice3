const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female"].includes(value)) {
        throw new Error("gender not valid");
      }
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://thenewportbeachdentist.com/wp-content/uploads/2016/10/Michael-Williams.jpg",
  },
  about: {
    type: String,
    default: "this is bio",
  },
  password: {
    type: String,
  },
});

// Here we are setting the token for login user
// This methd we will only write in normal function
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@123", {
    // Here we are expiring a jwt token in 7 days by passing a parameteer
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordCorrect = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordCorrect;
};
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
