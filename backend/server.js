import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pets from "./data/PetDataSet.js";
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

const petsRoute = require("./routes/pets");
const usersRoute = require("./routes/users");

app.use(cors());
app.use(bodyParser.json());
app.use("/pets", petsRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("we are on home");
});

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.get("/api/pets", (req, res) => {
//   res.json(pets);
// });

// app.get("/api/pets/:id", (req, res) => {
//   const pet = pets.find((p) => p.id === req.params.id);
//   res.json(pet);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
