const express = require("express");
const exp = express();
const router = express.Router();
const authenticateTokenFn = require("../middlewares/authMiddleware");
const User = require("../models/userSchema");
const Post = require("../models/post");

router.post("/newPost", authenticateTokenFn, async (req, res) => {
  console.log("in post route");
  try {
    const content = req.body.postInfo;
    const authorr = req.user.name;
    const newwPost = new Post({
      postInfo: content,
      author: authorr,
      authorId: req.user.id,
    });

    if (newwPost) {
      console.log("trying to save");
      await newwPost.save();
    } else {
      console.log("No new post");
    }

    res.status(200).json(newwPost);
  } catch (error) {
    res.status(500).json({ message: "Issue in POst route", error });
  }
});

router.get("/allPosts", authenticateTokenFn, async (req, res) => {
  console.log("in postryuv");
  const posts = await Post.find()
    .populate("authorId", "profilePic")
    .sort({ createdAt: -1 });
  if (!posts) {
    res.status(500).json("error fetching");
  }
  res.status(200).json(posts);
});

router.get("/timeline", authenticateTokenFn, async (req, res) => {
  const userName = req.user.name;
  console.log(userName);
  const user = await User.findOne({ userName: userName });

  if (!user.following || user.following.length === 0) {
    return res.status(200).json([]);
  }
  console.log("in timeline");
  try {
    const posts = await Post.find({ author: { $in: user.following } })
      .sort({
        createdAt: -1,
      })
      .populate("authorId", "profilePic userName");

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch {
    console.error("Error fetching posts");
    res.status(500).json({ error: "Error fetching posts" });
  }
});

router.get("/id", authenticateTokenFn, async (req, res) => {
  const name = req.user.name;
  const posts = await Post.find({ author: name });
  if (posts == []) {
    res.status(500).json({ message: "Error fetching posts" });
  }
  res.status(200).json(posts);
});

router.delete("/deletePost/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
});

router.put("/:postId/like", authenticateTokenFn, async (req, res) => {
  const postId = req.params.postId;
  console.log("post id is", postId);

  const userId = req.user.name;
  console.log(userId);
  // const likeAuthor = req.body.userId;

  const post = await Post.findById(postId);
  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
  } else {
    post.likes.pop(userId);
  }
  const updatedPost = await post.save();
  // res.sendStatus(200, post.likes.length);
  res.status(200).json(updatedPost.likes);
});
router.get("/:postId/isLiked", authenticateTokenFn, async (req, res) => {
  const postId = req.params.postId;
  console.log("post id is", postId);

  const userId = req.user.name;
  console.log(userId);
  // const likeAuthor = req.body.userId;

  const post = await Post.findById(postId);
  if (!post.likes.includes(userId)) {
    res.status(200).json(false);
  } else {
    res.status(200).json(true);
  }
  // const updatedPost = await post.save();
  // res.sendStatus(200, post.likes.length);
  // res.status(200).json(updatedPost.likes);
});

router.post("/:postId/comments", authenticateTokenFn, async (req, res) => {
  const { postId } = req.params;
  const { commentAuthor, text } = req.body;
  const userId = req.user.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  await post.comments.push({
    userId,
    commentAuthor,
    text,
  });
  await post.save();
  const updatedPost = Post.findById(postId).populate(
    "comments.userId",
    "userName"
  );
  res.status(201).json(updatedPost);
});

router.post("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { commentAuthor, text } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const newComment = {
    commentAuthor,
    text,
  };

  post.comments.push(newComment);

  await post.save();
  res.status(201).json({ message: "Comment added" });
});

router.delete("/:postId/deletecomment", async (req, res) => {
  const { postId } = req.params;
  const { commentAuthor, text } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const newComment = {
    commentAuthor,
    text,
  };
  await post.comments.pop({
    newComment,
  });
  await post.save();
  res.status(201).json({ message: "Comment deleted" });
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(req.params);
  try {
    const post = await Post.findById(postId).populate(
      "comments.userId",
      "userName"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching post" });
  }

  // const comments = await post.comments;

  // if (comments.length === 0) {
  //   res.json("No comments yet.");
  // } else {
  //   res.status(200).json(comments);
  // }
});

exp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    // ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
module.exports = router;
