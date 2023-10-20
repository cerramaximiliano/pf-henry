const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    given_name: {
      type: String,
      default: ""
    },
    family_name: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      defualt: false
    },
    role: {
      type: String,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
      defualt: ""
    },
    sub: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      defualt: ""
    }

  }
);

module.exports = mongoose.model("User", userSchema);