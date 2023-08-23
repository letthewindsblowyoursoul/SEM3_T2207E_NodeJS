const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017';
const dbName = 'your-database-name';

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  
  const db = client.db(dbName);
  const collection = db.collection('UserCollection');

  // Thêm một user
  app.post('/users', (req, res) => {
    const newUser = {
      UserId: req.body.UserId,
      Username: req.body.Username,
      Fullname: req.body.Fullname,
      Address: req.body.Address
    };

    collection.insertOne(newUser, (err, result) => {
      if (err) return res.send({ success: false, error: err });
      res.redirect('/');
    });
  });

  // Xóa một user
  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    collection.deleteOne({ _id: ObjectID(userId) }, (err, result) => {
      if (err) return res.send({ success: false, error: err });
      res.send({ success: true });
    });
  });

  // Lấy danh sách user
  app.get('/users', (req, res) => {
    collection.find().toArray((err, users) => {
      if (err) return res.send({ success: false, error: err });
      res.send(users);
    });
  });

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});