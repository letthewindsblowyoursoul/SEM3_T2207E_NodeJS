const express = require('express');
const path = require('path');
const app = express();
const User = require('./models/User');
const apiRouter = require('./routes/api');
const connect = require('./config/connnect');
const fs = require('fs');
const config = require('./config/config');
const removeVietnameseTones = require('./utility/utility');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Config and connect
config(app);
connect();

//Single-page
app.get('/', function (req, res) {
  res.render('index');
});

//API
app.use('/api', apiRouter);

//Seeds
app.get('/fake-data', async function (req, res) {
  try {
    let nameString = fs.readFileSync('./seeds/NgauNhien.txt', 'utf8');
    let cityString = fs.readFileSync('./seeds/city_name.txt', 'utf8');
    let names = nameString.split('\n');
    let citys = cityString.split('","');
    await User.create({
      username: 'q5nguyenn',
      fullname: 'Nguyễn Văn Quý',
      age: 22,
      address: 'Tỉnh Thái Bình',
    });
    for (const name of names) {
      let user = {};
      user.fullname = name;
      user.username = removeVietnameseTones(name.split(' ').pop()).toLowerCase() + Math.floor(Math.random() * 1000);
      let city = citys[Math.floor(Math.random() * citys.length)];
      user.address = city;
      user.age = Math.floor(Math.random() * 50) + 1;
      await User.create(user);
    }
    // res.status(200).json('Success!');
    res.redirect('back');
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/write/city-name', function (req, res) {
  let city = [];
  fetch('https://provinces.open-api.vn/api/')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        city.push(element.name);
      });
      fs.writeFileSync('./seeds/city_name.txt', JSON.stringify(city));
    })
    .catch();
});

app.get('/test', function (req, res) {
  res.render('error.ejs');
});

app.listen(port, function () {
  console.log('%s\x1b[32m\x1b[1m%s\x1b[0m', 'App is listening at ', `http://localhost:${port}`);
});
