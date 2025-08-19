// const express = require('express');
// const exp = express();
// const router = express.Router();
// const session = require('express-session');
// const User = require('../models/userSchema');
// const Post = require('../models/post');
// const Comment = require('../models/comment');

// router.post('/:postId/comments', async (req,res) => {
//     const { postId } = req.params;
//     const { commentAuthor, text } = req.body; 
    
//     const comment = new comment({
//         text,
//         postId,
//         author
//     });
//     await comment.save();
//     res.status(201).json({ message: 'Comment added', comment });

// })

// router.get('/:postId/comments', async (req,res) => {
//     const comment = Comment.find().populate('post');
//     res.status(200).json(comment);
// })

// router.delete('/:postId/comments', async (req,res) => {
//     const comment = Comment.find
// })

// router.use ('*', async (req,res) => {
//     res.status(500).json({message: "Global error"});
// })