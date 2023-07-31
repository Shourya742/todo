const jwt = require("jsonwebtoken");
const express = require("express");
const { authenticateJwt } = require("../middleware/index");
const { User } = require("../db");
require("dotenv").config();
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in Successfully", token });
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: "User not logged in" });
  }
});

module.exports = router;
