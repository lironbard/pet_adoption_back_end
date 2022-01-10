const express = require("express");
const { uploadToCloudinary } = require("../cloudinary");
const { updateMany } = require("../models/Pets");
const router = express.Router();
const Pets = require("../models/Pets");
const Users = require("../models/Users");
const { upload } = require("../multer");
const { route } = require("./users");
const verifyToken = require("./verifyToken");
const fs = require("fs");
// const { number } = require("joi");

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
    // res.json({ message: err });
    res.json({ message: err });
  }
});

//GET pet by ID
router.get("/:petID", async (req, res) => {
  try {
    const pet = await Pets.findById(req.params.petID);
    res.json(pet);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE pet by ID
router.delete("/pet/:petId/delete", async (req, res) => {
  try {
    const removedPet = await Pets.remove({ _id: req.params.petId });
    res.json(removedPet);
  } catch (err) {
    res.json({ message: err });
  }
});

//EDIT pet by ID
router.patch("/pet/:petId", async (req, res) => {
  try {
    const { type, name, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breed } = req.body;
    const updatedPet = await Pets.updateOne(
      { _id: req.params.petId },
      {
        $set: {
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
        },
      }
    );
    res.json(updatedPet);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET pet by criteria
router.get("/search/:criteria", (req, res) => {
  const mySearch = req.params.criteria;
  Pets.find({
    $and: [
      {
        $or: [{ adoptionStatus: mySearch }, { type: mySearch }, { name: mySearch }, { height: mySearch }, { weight: mySearch }],
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// POST update adopt/foster pet (protected to logged in users)
router.post("/pet/:id/adopt", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  const { adoptionStatus } = req.body;
  try {
    const pet = await Pets.findById(req.params.id);
    const user = await Users.findById(userId);
    if (pet && user) {
      if (pet.adoptionStatus.toLowerCase() === "available") {
        pet.adoptionStatus = adoptionStatus;
        pet.fosteredBy = adoptionStatus === "Fostered" ? userId : "";
        pet.adoptedBy = adoptionStatus === "Adopted" ? userId : "";
        if (adoptionStatus === "Adopted") {
          user.adoptedPets.push(req.params.id);
        } else user.fosterdPets.push(req.params.id);

        await Pets.findOneAndUpdate({ _id: req.params.id }, pet, {
          useFindAndModify: false,
          runValidators: true,
        });
        await Users.findOneAndUpdate({ _id: userId }, user, {
          useFindAndModify: false,
          runValidators: true,
        });
        const updatedPet = await Pets.findById(req.params.id);
        const updatedUser = await Users.findById(userId);
        res.status(200).json({ updatedPet, updatedUser, isSuccessful: true });
      } else res.status(200).json("This pet is not available");
    } else res.status(200).json({ isSuccessful: false, message: "Pet or user not found." });
  } catch (err) {
    res.json({ message: err });
  }
});

//POST return pet from adopt/foster
router.post("/pet/:id/return", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  try {
    const pet = await Pets.findById(req.params.id);
    const user = await Users.findById(userId);
    if (pet && user) {
      if (pet.adoptionStatus === "Fostered") {
        user.fosterdPets = user.fosterdPets.filter((petId) => petId !== pet.id);
      } else user.adoptedPets = user.adoptedPets.filter((petId) => petId !== pet.id);
      pet.adoptionStatus = "Available";
      await Pets.findOneAndUpdate({ _id: req.params.id }, pet, {
        useFindAndModify: false,
        runValidators: true,
      });
      await Users.findOneAndUpdate({ _id: userId }, user, {
        useFindAndModify: false,
        runValidators: true,
      });
      const updatedPet = await Pets.findById(req.params.id);
      const updatedUser = await Users.findById(userId);
      res.status(200).json({ updatedPet, updatedUser, isSuccessful: true });
    } else res.status(200).json({ message: "User or pet not found", isSuccessful: false });
  } catch (err) {
    res.json({ message: err });
  }
});

//POST like pet
router.post("/pet/:id/save", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await Users.findById(userId);

    if (user && !user.likedPets.includes(req.params.id)) {
      user.likedPets.push(req.params.id);
      await Users.findOneAndUpdate({ _id: userId }, user, {
        useFindAndModify: false,
        runValidators: true,
      });
      const updatedUser = await Users.findById(userId);
      res.json(updatedUser.likedPets);
    } else if (user) {
      res.json(user.likedPets);
    } else {
      res.status(200).json({
        message: "User not found or pet already liked",
        isSuccessful: false,
      });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE unlike pet
router.delete("/pet/:id/save/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (user) {
      user.likedPets = user.likedPets.filter((petId) => petId !== req.params.id);
      await Users.findOneAndUpdate({ _id: userId }, user, {
        useFindAndModify: false,
        runValidators: true,
      });
      const updatedUser = await Users.findById(userId);
      res.json(updatedUser.likedPets);
    } else if (user) {
      res.json(user.likedPets);
    } else {
      res.status(200).json({ message: "User not found", isSuccessful: false });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Pets By User ID API
// Route ‘/pet/user/:id’ [GET]
router.get("/pet/user/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  const liked = [];
  const owned = [];
  try {
    const user = await Users.findById(userId);
    if (user) {
      await Promise.all(
        user.likedPets.map(async (petId) => {
          const pet = await Pets.findById(petId);
          if (pet) {
            liked.push(pet);
          }
        })
      );
      await Promise.all(
        user.adoptedPets.map(async (petId) => {
          const pet = await Pets.findById(petId);
          if (pet) {
            owned.push(pet);
          }
        })
      );
      await Promise.all(
        user.fosterdPets.map(async (petId) => {
          const pet = await Pets.findById(petId);
          if (pet) {
            owned.push(pet);
          }
        })
      );
      res.json({ likedPets: liked, ownedPets: owned });
    } else res.status(200).json({ message: "User not found", isSuccessful: false });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/picture", verifyToken, upload.single("file"), async (req, res) => {
  const result = await uploadToCloudinary(req.file.path);
  fs.unlinkSync(req.file.path);
  res.send({ pictureUrl: result.secure_url });
});

module.exports = router;
