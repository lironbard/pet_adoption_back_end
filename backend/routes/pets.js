const express = require("express");
const { updateMany } = require("../models/Pets");
const router = express.Router();
const Pets = require("../models/Pets");
const Users = require("../models/Users");

//GET all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pets.find();
    res.json(pets);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST new pet (only admin)
router.post("/pet", async (req, res) => {
  const { type, name, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breed } = req.body;
  const post = new Pets({
    type,
    name,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
    likedBy: [],
    fosteredBy: "",
    adoptedBy: "",
  });
  try {
    const savedPet = await post.save();
    res.json(savedPet);
  } catch (err) {
    res.json({ message: err });
  }
});
