const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userSchema');
const Post = require('./post');

const CommentSchema = new Schema({
  user: {
    type: String, 
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
