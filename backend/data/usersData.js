const bcrypt = require("bcryptjs");

const users = [
  {
    likedPets: [""],
    fosterdPets: [""],
    adoptedPets: [""],
    firstName: "Liron",
    lastName: "Bard",
    phone: "0522865614",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    repeatPassword: bcrypt.hashSync("123456", 10),
    userType: 1,
  },
  // {
  //   firstName: "John",
  //   lastName: "Doe",
  //   phone: "0522865614",
  //   email: "DJ@example.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   repeatPassword: bcrypt.hashSync("123456", 10),
  //   likedPets,
  //   fosterdPets,
  //   adoptedPets,
  //   userType: 2,
  // },
  // {
  //   firstName: "Lolik",
  //   lastName: "Hamulik",
  //   phone: "0522865614",
  //   email: "DJ@example.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   repeatPassword: bcrypt.hashSync("123456", 10),
  //   likedPets,
  //   fosterdPets,
  //   adoptedPets,
  //   userType: 2,
  // },
];

module.exports = users;
