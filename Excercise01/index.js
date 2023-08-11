const express = require("express");
const app = express();
const port = 8000;
app.use(express.json());

const users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user01 = req.body;
  user01._id = users.length + 1;
  users.push(user01);
  res.json(user01);
});

app.put("/users/:id", (req, res) => {
  const user_id = parseInt(req.params.id);
  const update_user = req.body;
  const i = users.findIndex((user) => user._id === user_id);
  if (i !== -1) {
    users[i] = { ...users[i], ...update_user };
    res.json(users[i]);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/users/:id", function (req, res) {
  const user_id = parseInt(req.params.id);
  const i = users.findIndex((user) => user._id === user_id);
  if (i !== -1) {
    const delete_user = users.splice(i, 1);
    res.json(delete_user[0]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port);
