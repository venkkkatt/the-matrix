const express = require("express");
const exp = express();
const router = express.Router();
const User = require("../models/userSchema");
const Post = require("../models/post");
const path = require("path");
const bcrypt = require("bcrypt");
const validateRegistration = require("../middlewares/registerValidation");
const jwt = require("jsonwebtoken");
const authenticateTokenFn = require("../middlewares/authMiddleware");

//create a middleware to handle all login authentication
//create more error handlers
//update what a user can perform. and admin

// router.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

// router.get('/login', async (req,res) => {
//     res.render('login');
// })

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    console.log("no user");
    return res.status(500).json({ message: "No user found" });
  }

  const origPw = await bcrypt.compare(password, user.password);

  if (origPw) {
    const userPayload = { id: user._id, name: user.userName };
    console.log("okayokay");
    const token = jwt.sign(userPayload, process.env.ACCESS_TOKEN, {
      expiresIn: "12h",
    });
    res.json({ token: token, user: userPayload });
  } else {
    res.status(500).json("Incorrect Username or Password");
  }
});

router.get("/:id", authenticateTokenFn, async function (req, res) {
  try {
    const user = await User.find({ userName: req.params.id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("ERROR!NOT found");
  }
});

router.post("/register", async (req, res) => {
  const { userName, fullName, email, password, dept } = req.body;

  const hashedPw = await bcrypt.hash(password, 12);

  const al_user = await User.findOne({ userName: req.body.userName });
  if (al_user) {
    return res.status(400).json("User exists");
  } else {
    const newUser = new User({
      userName,
      fullName,

      email,
      password: hashedPw,

      dept,
    });

    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const user = await newUser.save();
      console.log("after saving user");
      const userPayload = { id: newUser._id, name: newUser.userName };

      const token = jwt.sign(userPayload, process.env.ACCESS_TOKEN, {
        expiresIn: "12h",
      });
      console.log("after token");
      res.status(201).json({
        message: "User registered",
        token: token,
        user: { id: newUser._id, userName: newUser.userName },
      });
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        res.status(400).json({
          error: `The ${duplicateField} "${error.keyValue[duplicateField]}" is already taken.`,
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
});

router.put("/update", (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      const user = User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      req.body.id = req.params.id;
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }

  try {
    //password
  } catch (error) {}
});

router.get("/explore/users", authenticateTokenFn, async (req, res) => {
  console.log("in explore route");
  try {
    const currentUserId = req.user.id;
    const users = await User.find({ _id: { $ne: currentUserId } });
    console.log("in explore route");
    const userProfiles = users.map((user) => ({
      userId: user._id,
      userName: user.userName,
      fullName: user.fullName,
      profilePic: user.profilePic,
      followers: user.followers,
      following: user.following,
      dept: user.dept,
    }));
    console.log("fetched");
    res.status(200).json(userProfiles);
  } catch (error) {
    console.error("Error fetching explore profiles:", error);
    res.status(500).json({
      message: "Error fetching explore profiles",
      error: error.message,
    });
  }
});

router.get("/profile/explore", authenticateTokenFn, async (req, res) => {
  // console.log("IN profile route");
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId }).lean();
    // console.log("in profile route");
    // console.log({ user });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/profile/:id", authenticateTokenFn, async (req, res) => {
  // console.log("IN profile idroute");
  try {
    const user = await User.findOne({ userName: req.params.id });
    console.log("in profile route");
    console.log({ user });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json();
  } catch (e) {
    res.status(500).send("Can't Delete user", e);
  }
});

router.put("/follow/:id", authenticateTokenFn, async function (req, res) {
  console.log("in follow controller");

  if (req.body.userId !== req.params.id) {
    console.log("inside if");
    console.log(req.body.userId);
    console.log(req.params.id);
    try {
      const user = await User.findOne({ userName: req.params.id });
      const currentUser = await User.findOne({ userName: req.body.userId });

      if (user.followers.includes(req.body.userId)) {
        console.log("unfollowing");
        await user.updateOne({ $pull: { followers: req.user.name } });

        await currentUser.updateOne({
          $pull: { following: req.params.id },
        });
        console.log("popped");
        // await save(user);
        // await save(currentUser);
      } else {
        console.log("inside another if");
        await user.updateOne({ $push: { followers: req.user.name } });
        console.log("line2");
        await currentUser.updateOne({ $push: { following: req.params.id } });
        console.log("line3");
        // const user = await save(user);
        // const currentUser = await save(currentUser);
      }
      // await save(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.put(":id/posts", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId).populate("post");
    // const user = await Post.findby().populate("post");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/unfollow/:id", async function (req, res) {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).send("Unfollowed user");
      } else {
        res.status(403).send("You don't follow");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.use("*", async (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

exp.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    // ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = router;
