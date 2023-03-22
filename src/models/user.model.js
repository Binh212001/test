const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    displayName: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("User", UserSchema);
