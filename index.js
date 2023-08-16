const express = require("express");
const app = express();
const port = 8000;
const mysql = require("mysql2");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.get("/", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee",
  });

  // simple query
  connection.query(
    "SELECT * FROM `nhanvien` ",
    function (err, results, fields) {
      res.render("index.ejs", { results });
    }
  );

  // res.send("hello");
  // res.render("index.ejs");
});

app.get("/add", (req, res) => {
  res.render("insert.ejs");
});

app.post("/store", (req, res) => {
  let user = req.body;
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee",
  });

  // simple query
  connection.execute(
    "INSERT INTO `nhanvien`(`name`, `birthday`, `address`) VALUES (?,?,?)",
    [user.name, user.birthday, user.address]
  );
  // res.render("insert.ejs");
  res.redirect("/");
});

app.get("/delete", (req, res) => {
  // res.send("delete");
  let id = req.query.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee",
  });

  // simple query
  connection.execute(`DELETE FROM nhanvien WHERE id = ${id}`);
  // res.render("insert.ejs");
  res.redirect("/");
});

app.post("/update", (req, res) => {
  let user = req.body;
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee",
  });

  let sql = `UPDATE nhanvien SET name='${user.name}',birthday='${user.birthday}',address='${user.address}' WHERE id=${user.id}`;
  console.log(sql);

  // simple query
  connection.query(sql, function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  // res.send("id");
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee",
  });

  connection.query(
    `SELECT * FROM nhanvien where id = ${id}`,
    function (err, results, fields) {
      res.render("edit.ejs", { employee: results[0] });
    }
  );
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
