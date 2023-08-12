const express = require('express');
const jade= require('jade');
var app = express();

app.set("view engine", "jade");


app.get('/user', (req, res,) => {
    var users = {
        name1: "Dong Thanh",
        name2: "Thành lỏ",
        name3: "DVT",
        email1: "dxthanh2002@gmai.com",
        email2: "thanhlorakayay@gmail.com",
        email3: "thanhlor",

    };
    var model = {
        subject: "Template Engines",
        items: [
          {name: "Mustache"},
          {name: "HandleBar"},
          {name: "Dust"},
          {name: "Jade"},
          {name: "EJS"},
          {name: "Razor"},
        ]
      };
    res.render('user', users);
    res.render('user', model);
});
app.listen(9002, () => {
    console.log(`Example app listening at 9001`)
});
