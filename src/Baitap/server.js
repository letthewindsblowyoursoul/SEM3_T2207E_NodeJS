var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var ejs = require("ejs");

dotenv.config({ path: './config.env' });
var app  = express();
app.set("view engine","ejs");

mongoose.connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => console.error("CF", err))
    .finally(() => {
        console.log("finally....")
    });
    
var userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is required"],
        unique: true,
      },
    username: {
        type: String,
        required: [true, "UserName is required"],
        unique: true,
      },
    fullname: {
      type: String,
      required: [true, "Name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
});
const User = mongoose.model("User", userSchema);
app.use(express.json());
//insert
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
//delete
// app.delete("/delete/:userId", (req, res) => {
//   const userId = req.params.userId;

//   User.deleteOne({ userId })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       res.status(200).json({ data: user });
//     })
//     .catch((err) => {
//       console.error("Error fetching user:", err);
//       res.status(500).json({ error: "Unable to fetch user" });
//     });
// });
app.delete('/delete/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      await User.findOneAndDelete({ UserId: userId });
      res.status(200).send('User deleted successfully');
  } catch (error) {
      res.status(500).send('Internal Server Error');
  }

});
//// Get all
app.get("/users", (req, res) => {
  const username = req.params.username;

  User.find()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ data: user });
      res.render('user.ejs', { users });

    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Unable to fetch user" });
    });
});

app.get("/", async (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": "*",
  });
  try {
      const users = await User.find();
      res.render('user.ejs', { users });
  } catch (error) {
      res.status(500).send('Internal Server Error');
  }
});

app.listen(9005,"127.0.0.1",()=>{
    console.log("Listening to request on port 9005");
});