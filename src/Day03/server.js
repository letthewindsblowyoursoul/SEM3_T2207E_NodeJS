const express = require('express');
const utility = require('./utility');
const user = require('./user');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const per_page = 5;

const port = 3001;
const fs = require('fs');

//Get all users
app.get('/', async (req, res) => {
  console.log(__dirname);
  let users = await user.listUsers();
  let currentPage = 1;
  let pages = Math.ceil(users.length / per_page);
  let begin = 0;
  users = users.splice(begin, per_page);
  res.render('index', { users, pages, currentPage });
});

app.get('/page/:page', async (req, res) => {
  let users = await user.listUsers();
  let currentPage = req.params.page;
  let begin = (currentPage - 1) * per_page;
  let pages = Math.ceil(users.length / per_page);
  users = users.splice(begin, per_page);
  res.render('index', { users, pages, currentPage });
});

//Add new user
app.post('/user/store', async (req, res) => {
  let users = await user.listUsers();
  let newUser = req.body;
  newUser.id = utility.generateNewId(users);
  await user.addUser(newUser);
  users = await user.listUsers();
  let pages = Math.ceil(users.length / per_page);
  res.redirect(`/page/${pages}`);
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
  res.redirect('back');
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
  res.redirect('back');
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}/`);
});
