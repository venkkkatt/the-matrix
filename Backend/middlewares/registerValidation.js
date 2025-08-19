const { check, validationResult } = require("express-validator");
const user = require("../models/userSchema");
const validateRegistration = () => {
  check("userName").notEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters");
};
