const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

//GET user by token
router.get("/user/token", verifyToken, async (req, res) => {
  const found = await User.findById(req.user.id);
  if (found) {
    const newToken = jwt.sign({ id: found._id }, process.env.TOKEN_SECRET);
    res.json({
      userId: found._id,
      userToken: newToken,
      userName: `${found.firstName} ${found.lastName}`,
      adoptedPets: found.adoptedPets,
      fosterdPets: found.fosterdPets,
      likedPets: found.likedPets,
      userType: found.userType,
    });
  } else {
    res.json(null);
  }
});

//GET all users - admin
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});
