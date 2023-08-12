const express = require('express');
const ejs= require('ejs');
var app = express();

app.set("view engine", "ejs");

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
var template = `
  <h1><%= model.subject %></h1>
  <ul>
    <% for(var i = 0; i < model.items.length; i++) {%>
       <li><%= model.items[i].name %></li>
    <% } %>
  </ul>`;

  var html = ejs.render(template, model);
document.getElementById("container").innerHTML = html;
app.listen(9002, () => {
    console.log(`Example app listening at 9001`)
});
