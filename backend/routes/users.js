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

//POST new user sign up.
router.post("/signup", async (req, res) => {
  //validate data before creating user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const hashRepeatPassword = await bcrypt.hash(req.body.repeatPassword, salt);

  //Create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: hashPassword,
    repeatPassword: hashRepeatPassword,
    likedPets: [],
    fosterdPets: [],
    adoptedPets: [],
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET);
    res.json({
      userId: savedUser.id,
      userToken: token,
      userName: `${savedUser.firstName} ${savedUser.lastName}`,
      adoptedPets: savedUser.adoptedPets,
      fosterdPets: savedUser.fosterdPets,
      likedPets: savedUser.likedPets,
      userType: savedUser.userType,
    });
  } catch (err) {
    res.json({ message: err });
  }
});
