const express = require("express");
const router = express.Router();
const people = require("../model/model");

router.get("/", async function (req, res) {
  try {
    let users = await people.find({});
    // res.json(users);
    res.render("index", { users });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/add", function (req, res) {
  res.render("add");
});

router.post("/add", async function (req, res) {
  try {
    let newUser = new people({
      username: req.body.username,
      fullname: req.body.fullname,
      address: req.body.address,
    });
    await newUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await people.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
