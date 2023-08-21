const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = express();

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Connection failed:", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  fullname: String,
  address: String,
  age: {
    type: Number,
    default: 20,
  },
});
// Get schema Use
const User = mongoose.model("User", userSchema);

app.use(express.json());

app.post("/user", (req, res) => {
  const newUser = new User(req.body);

  newUser
    .save()
    .then((doc) => {
      console.log(doc);
      res.status(201).json({ message: "User created successfully", data: doc });
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Unable to create user" });
    });
});

app.get("/user/:username", (req, res) => {
  const username = req.params.username;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Unable to fetch user" });
    });
});


app.delete("/user/:username", (req, res) => {
  const username = req.params.username;

  User.deleteOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Unable to fetch user" });
    });
});
// Get all
app.get("/users", (req, res) => {
  const username = req.params.username;

  User.find()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Unable to fetch user" });
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
