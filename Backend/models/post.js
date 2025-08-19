const mongoose = require("mongoose");
const User = require("./userSchema");

const post = new mongoose.Schema(
  {
    postInfo: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      // ref: "User",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Array,

      default: [],
    },
    comments: {
      type: Array,

      commentAuthor: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      uploadTime: {
        type: Date,
        default: Date.now,
      },
      default: [],
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

post.pre("save", function (next) {
  if (!this.comments) {
    this.comments = [];
  }
  next();
});

// post.methods.toJSON = function () {
//   const post = this.toObject();
//   delete post._id;
//   return post;
// };

module.exports = mongoose.model("Post", post);

// module.exports = new mongoose.model('Post', post);
