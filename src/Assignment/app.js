const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/userdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const User = mongoose.model('User', {
    UserId: String,
    Username: String,
    Fullname: String,
    Address: String
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async(req,res) => {
    const users = await User.find();
    res.render('index',{users});
});

app.post('/addUser', async(req,res) => {
    const {UserId, Username, Fullname, Address} = req.body;
    const newUser = new User({UserId, Username, Fullname, Address});
    await newUser.save();
    res.redirect('/');
});

app.post('/deleteUser', async(req,res) => {
    const {UserId} = req.body;
    await User.deleteOne({UserId});
    res.redirect('/');
});

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});