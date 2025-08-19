const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    userId: { type: String, unique: true },
    bio: String,
    dept: String,
    role: {
      type: String,
      enum: ["regular", "admin"],
      default: "regular",
    },
    profilePic: {
      data: String,
    },
    followers: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User'
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user._id, delete user.password;
  delete user.email;
  delete user.role;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.fullName;
  return user;
};

module.exports = mongoose.model("User", userSchema);
