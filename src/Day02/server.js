const express = require('express');
const utility = require('./utility');
const user = require('./user');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
const fs = require('fs');

//Get all users
app.get('/', async (req, res) => {
  console.log(__dirname);
  let users = await user.listUsers();
  res.render('index', { users });
});

//Add new user
app.get('/user/add', async (req, res) => {
  res.render('add');
});

app.post('/user/store', async (req, res) => {
  let users = await user.listUsers();
  let newUser = req.body;
  newUser.id = utility.generateNewId(users);
  await user.addUser(newUser);
  res.redirect('/');
});

app.get('/user/edit/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let users = await user.listUsers();
  let currentUser = users.find((user) => user.id == id);
  if (currentUser) {
    res.render('edit', { user: currentUser });
  } else {
    res.send('User does not exist!');
  }
});

app.post('/user/update/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let newUser = req.body;
  let users = await user.listUsers();
  let userIndex = users.findIndex((user) => user.id == id);
  if (userIndex == -1) {
    res.send('User does not exist!');
    return;
  }
  newUser.id = id;
  await user.updateUser(newUser);
  res.redirect('/');
});

app.get('/user/delete/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let users = await user.listUsers();
  let currentUser = users.find((user) => user.id == id);
  if (!currentUser) {
    res.send('User does not exist!');
    return;
  }
  await user.deleteUser(id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}/`);
});