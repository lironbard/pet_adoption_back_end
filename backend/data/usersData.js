import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "Admin",
    lastName: "Admin User",
    phone: "0522865614",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    repeatPassword: bcrypt.hashSync("123456", 10),
    likedPets,
    fosterdPets,
    adoptedPets,
    userType: 1,
  },
  {
    firstName: "John",
    lastName: "Doe",
    phone: "0522865614",
    email: "DJ@example.com",
    password: bcrypt.hashSync("123456", 10),
    repeatPassword: bcrypt.hashSync("123456", 10),
    likedPets,
    fosterdPets,
    adoptedPets,
    userType: 2,
  },
  {
    firstName: "Lolik",
    lastName: "Hamulik",
    phone: "0522865614",
    email: "DJ@example.com",
    password: bcrypt.hashSync("123456", 10),
    repeatPassword: bcrypt.hashSync("123456", 10),
    likedPets,
    fosterdPets,
    adoptedPets,
    userType: 2,
  },
];

export default users;
