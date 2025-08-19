require("dotenv").config();

const express = require("express");
const connectDB = require("./app");
const User = require("./models/userSchema");
const exp = express();
const session = require("express-session");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const path = require("path");
const cors = require("cors");

connectDB();
exp.use(express.json());
exp.use(
  session({ secret: "notgood", resave: false, saveUninitialized: false })
);
exp.use(express.static(path.join(__dirname, "client")));

exp.set("view engine", "ejs");
exp.set("views", path.join(__dirname, "views"));

exp.use(cors({}));

exp.use(express.json());
exp.use(express.urlencoded({ extended: true }));

exp.use("/api/users", userRouter);
exp.use("/api/posts", postRouter);
exp.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    // ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

exp.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

exp.listen(process.env.PORT, () => console.log("Server running on port 5000"));
