const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  repeatPassword: {
    type: String,
    required: true,
  },
  likedPets: [String],
  fosterdPets: [String],
  adoptedPets: [String],
  userType: { type: Number, default: 2 },
});

module.exports = mongoose.model("User", UserSchema);
// const Users = mongoose.model("Users", userSchema);

// export default Users;
