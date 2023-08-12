const express = require('express');
const utility = require('./utility');
const user = require('./user');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const fs = require('fs');

//Get all users
app.get('/', async (req, res) => {
  let users = await user.listUsers();
  res.send(users);
});

// Get user by ID
app.get('/user/view/:id', async (req, res) => {
  let id = req.params.id;
  let result = await user.getUser(id);
  res.send(result);
});

// Add new user
app.post('/user/create/', async (req, res) => {
  // let name = utility.generateString(10);
  // let age = utility.generateNumber(10, 30);
  // let newUser = {
  //   name: name,
  //   age: age,
  // };

  // Hoặc có thể lấy từ Form
  let newUser = req.body;
  let result = await user.addUser(newUser);
  res.send(result);
});

// Edit user by ID
app.put('/user/edit/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  // let new_user = {
  //   name: 'New Name',
  //   age: 999,
  // };
  // Hoặc có thể lấy từ Form
  let new_user = req.body;
  new_user.id = id;
  let result = await user.updateUser(new_user);
  res.send(result);
});

// Delete user by ID
app.delete('/user/delete/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await user.deleteUser(id);
  res.send(result);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}/`);
});
