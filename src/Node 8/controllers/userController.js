
const fs = require("fs");
const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
};
exports.getUser = (req, res) => {
  console.log(req.params);
  // Auto convert to int
  const id = req.params.id * 1;
  const user = users.find((t) => t.id === id);

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
};
exports.postUser = (req, res) => {
  console.log(req.params);
  // Auto convert to int
  const id = req.params.id * 1;
  const user = users.find((t) => t.id === id);

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
};
exports.patchUser = (req, res) => {
  console.log(req.params);
  // Auto convert to int

  res.status(200).json({
    status: "Success",
    data: {
      user: "Updated user",
    },
  });
};
exports.deleteUser = (req, res) => {
  console.log(req.params);
  // Auto convert to int

  res.status(204).json({
    status: "Success",
    data: null,
  });
};
