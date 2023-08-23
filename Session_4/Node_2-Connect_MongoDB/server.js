//B1: Declare library: express, mongoose, dotenv
var express = require('express');
var mongoose = require('mongoose');    //framework
var dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var app = express();

//B2: Create APT (Tạo bằng cách viết trực tiếp lên Postman)
// {
//     "username": "datpv2",
//     "fullname": "Pham Van Dat",
//     "age": 23,
//     "address": "Ha Noi"
// }

//B3: Connect to MongoDB
mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => console.error("Connection failed", err))
    .finally(() => {
        console.log("finally....")
    });

//B4: Create Schema Object  (Định nghĩa cấu trúc dữ liệu cho các bản ghi người dùng trong CSDL)
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    fullname: String,
    age: Number,
    address: String,
});


//Get Schema User
const User = mongoose.model("User", userSchema);
app.use(express.json());
app.use(express.urlencoded({extends: true}));

//Create User
app.post("/user", (req, res) => {
    console.log("Create new user");
    const newUser = new User(req.body);
    newUser
        .save()                         //B5: Lưu bản ghi vào CSDL.Nếu thành công trả về Response
        .then((doc) => {
            console.log(doc);
            res.status(201).json({message: "User create sucessfull", data: doc});
        })
        .catch((err) => {
            console.error("Error create", err);
            res.status(500).json({ error: "Unable create sucessfull"});
        });
});

//Get all Users
app.get('/users', (req, res) => {
    const username = req.params.username;
    User.find()
    .then((user) => {
        if(!user){
            return res.status(404).json({ error: "User not found"});
        }
        res.status(200).json({ data: user });
    })
    .catch((err) => {
        console.error("Error fetching user ", err);   
        res.status(500).json({ error: "Unable to fetch user" });
    });
});

//Get user
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    User.findOne({ username })
    .then((user) => {
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({data: user});
    })
    .catch((err) => {
        console.error("Error fetching user", user);
        res.status(500).json({error: "Unable to fetch user"});
    });
});

//Delete user
app.delete("/user/:username", (req, res) => {
    const username = req.params.username;
    User.deleteOne({username})
        .then((user) => {
            if(!user){
                return res.status(404).json({error: 'User not found'});
            }
            res.status(200).json({data: user});
        })
        .catch((err) => {
            console.error("Error fetching user", err);
            res.status(500).json({error: "Unable to fetch user"});
        });
});


//Listening
app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port");
});

// Các bước kết nối Database với MongoDB
// B1: Cài đặt thư viện express, mongoose, dotenv
// B2: Tạo API 
// B3: Cấu hình connection string
// B4: Tạo schema
// B5: save()
// B6: Dùng postman
