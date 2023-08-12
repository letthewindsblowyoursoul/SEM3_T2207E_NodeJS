const fs = require('fs');

// Get all user
const listUsers = async function () {
  let users = await getAllUser();
  return users;
};

// Get user by ID
const getUser = async function (id) {
  let users = await getAllUser();
  let user = users.find((user) => user.id == id);
  if (user) {
    return user;
  } else {
    return 'Không tìm thấy User!';
  }
};

// Add new user
const addUser = async function (user) {
  let users = await listUsers();
  users.push(user);
  await writeAllUsers(users);
};

// Update user
const updateUser = async function (user) {
  let users = await listUsers();
  let userIndex = users.findIndex((item) => item.id == user.id);
  users[userIndex] = user;
  await writeAllUsers(users);
};

// Delete user by ID
const deleteUser = async function (id) {
  let users = await listUsers();
  users = users.filter((user) => user.id != id);
  await writeAllUsers(users);
};

// Write all User
const writeAllUsers = function (users) {
  users = JSON.stringify(users);
  return new Promise((resolve, reject) => {
    fs.writeFile('users.json', users, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve('Thành công!');
      }
    });
  });
};

// Get all User
const getAllUser = function () {
  return new Promise((resolve, reject) => {
    fs.readFile('users.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

module.exports = {
  listUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
