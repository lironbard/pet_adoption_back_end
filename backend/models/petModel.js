import mongoose from "mongoose";

const bioSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    favorite: { type: Boolean, required: true, default: false },
    bioComment: { type: String, required: true },
  },
  { timestamps: true }
);

const petSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    adoptionStatus: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
      default: 0,
    },
    weight: {
      type: Number,
      required: true,
      default: 0,
    },
    color: {
      type: String,
      required: true,
    },
    bio: [bioSchema],
    hypoallergnic: {
      type: Boolean,
      required: true,
    },
    dietery: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
