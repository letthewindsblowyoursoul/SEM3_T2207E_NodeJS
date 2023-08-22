const express = require ("express");
const ejs = require("ejs");
const app = express();
const port = 2010;
const path = require ("path");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
dotenv.config({path: "./configs/config.env"});
const bodyParser = require('body-parser');


mongoose.connect(process.env.DATABASE_LOCAL)
.then(()=>{
    console.log("connect ok");
    
})
.catch((err)=>{
    console.error("connection failed: ", err);
})
.finally(()=>{
    console.log("run...")
})

const publicDirectoryPath = path.join(__dirname,'./public')
app.use(express.static(publicDirectoryPath))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

app.get('/', (req, res) =>{
    res.redirect("index.html")
    console.log('ok')
});

// app.get('/userList', getAllUser, (req, res) => {
//     User.then(users => {
//              res.status(200);
//             console.log("after login");
//             res.redirect("userList.html")
//             console.log("after redirect");
//         })
//         .catch(err => {
//             console.error("Error fetching user data:", err);
//             res.status(500).json({ message: "Error fetching user data" });
//         });
// });


app.get('/createUser', (req, res) =>{
    res.redirect("createUser.html")
    console.log('ok')
});

var UserSchema = mongoose.Schema({
    name : String,
    password: String,
    email: String,
    phone: Number,
});

const User = mongoose.model('User', UserSchema);

app.post('/saveUser', (req, res) => {
    const { name, password, email, phone } = req.body;
    const createUser = new User({ name, password, email, phone });

    createUser.save()
        .then((doc) => {
            console.log(doc);
            res.redirect("index.html"); 
        })
        .catch((err) => {
            console.error("Unable to create user", err);
            res.status(500).json({ message: "Unable to create user" });
        });
});

////-------------------- lấy users------------------
///
var getAllUser = async function() {
    try {
      const users = await User.find({});
      return users;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
///
var listUser = async function(req, res) {
    try {
        const users = await getAllUser();
        res.render('userList', { user: users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
////////////////////////////////////////


//-------------------- xóa user-----------------
var deleteUser = async function(req, res) {
    try {
        const userId = req.params._id;
        await User.findByIdAndDelete(userId);
        res.redirect('/userList'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

////////////////////////////////////////////////////
app.get("/userList", listUser);
app.post('/deleteUser/:_id', deleteUser);