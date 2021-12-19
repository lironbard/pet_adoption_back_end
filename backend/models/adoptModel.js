import mongoose from "mongoose";

const adoptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderPets: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        // price: {type: Number, required:true},
        pet: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Pet" },
      },
    ],
    adoptionAdress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isPickedUp: {
      type: Boolean,
      required: true,
      default: false,
    },
    pickedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Adopt = mongoose.model("User", adoptSchema);

export default Adopt;
