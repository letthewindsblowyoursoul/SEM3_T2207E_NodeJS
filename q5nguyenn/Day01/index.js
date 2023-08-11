const express = require('express');
const utility = require('./utility');
const app = express();
const port = 3000;
const fs = require('fs');

//Get all users
app.get('/', (req, res) => {
  fs.readFile('users.json', function (err, data) {
    let htmlString = '';
    let users = JSON.parse(data);
    users.forEach((user) => {
      htmlString += `<h1>${user.name} -- ${user.age} tuổi</h1>`;
    });
    res.send(htmlString);
  });
});

// Get user by ID
app.get('/user/view/:id', (req, res) => {
  let id = parseInt(req.params.id);
  fs.readFile('users.json', function (err, data) {
    let users = JSON.parse(data);
    let htmlString = '';
    user = users.find((user) => user.id == id);
    if (user) {
      htmlString = `<h1>${user.name} -- ${user.age}</h1>`;
    } else {
      htmlString = `<h1>Không tồn tại User có ID  = ${id}</h1>`;
    }
    res.send(htmlString);
  });
});

// Add new user
app.post('/user/create/', (req, res) => {
  let name = utility.generateString(10);
  let age = utility.generateNumber(10, 30);
  let user = {
    name: name,
    age: age,
  };
  fs.readFile('users.json', function (err, data) {
    let users = JSON.parse(data);
    user.id = users.length + 1;
    users.push(user);
    let usersJSON = JSON.stringify(users);
    fs.writeFile('users.json', usersJSON, function (err) {
      if (err) throw err;
      res.send(`<h1>Thêm tài khoản --${user.name}-- thành công!</h1>`);
    });
  });
});

// Edit user by ID
app.put('/user/edit/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let new_user = {
    name: 'New Name',
    age: 999,
  };
  fs.readFile('users.json', function (err, data) {
    let users = JSON.parse(data);
    let userIndex = users.findIndex((user) => user.id == id);
    if (userIndex == -1) {
      res.send(`<h1>Không tồn tại User có ID = ${id}</h1>`);
      return;
    }
    Object.assign(users[userIndex], new_user);
    let usersJSON = JSON.stringify(users);
    fs.writeFile('users.json', usersJSON, function (err) {
      if (err) throw err;
      res.send(`<h1>Cập nhật thành công User có ID = ${id}<h1>`);
    });
  });
});

// Delete user by ID
app.delete('/user/delete/:id', (req, res) => {
  let id = parseInt(req.params.id);
  fs.readFile('users.json', function (err, data) {
    let users = JSON.parse(data);
    let userIndex = users.findIndex((user) => user.id == id);
    if (userIndex == -1) {
      res.send(`<h1>Không tồn tại User có ID = ${id}</h1>`);
      return;
    }
    users = users.filter((user) => user.id != id);
    let usersJSON = JSON.stringify(users);
    fs.writeFile('users.json', usersJSON, function (err) {
      if (err) throw err;
      res.send(`<h1>Xoá thành công User có ID = ${id}</h1>`);
    });
  });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}/`);
});
