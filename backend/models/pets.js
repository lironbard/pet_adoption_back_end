const mongoose = require("mongoose");
const PetsSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  adoptionStatus: {
    type: String,
    required: true,
    default: "Available",
  },
  picture: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  hypoallergenic: {
    type: Boolean,
    required: true,
  },
  dietaryRestrictions: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  likedBy: [String],
  fosteredBy: String,
  adoptedBy: String,
});

module.exports = mongoose.model("Pets", PetsSchema);
// const Pets = mongoose.model("Pets", petSchema);

// export default Pets;
