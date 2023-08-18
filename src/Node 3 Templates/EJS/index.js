
const express = require("express");
const ejs = require('ejs');

const app = express();
// Set view engine

app.set("view engine", "ejs");

app.get("/user", (req, res) => {
  var users = {
    name: "Nguyen Van Binh",
    email: "binhnv@gmail.com",
    address: "Ha Noi"
  };
  res.render('user',users);
});

app.listen(9005, () => {
  console.log("Listening on port 9005");
});
