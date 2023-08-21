const express = require('express');
const multer = require('multer');
const router = express.Router();
const Author = require('../models/users');

//upload image
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'./uploads');//Thư mục để lưu trữ tập tin tải lên
    },
    filename:(req, file, cb)=>{
        cb(null,file.filename + Date.now()+'_'+file.originalname);
    }
});
const uploads = multer ({storage : storage}).single ('image') //Làm cho người dùng có thể chọn

//search user
router.get('/search', async (req, res)=>{
    // Lấy tham số truy vấn truong từ URL
    const searchUser = req.query.search;
    try {
        const users = await Author.find({
            $or:[
                {userName:{$regex: searchUser, $options:'i'}},
                {fullName:{$regex: searchUser, $options:'i'}},
                {address: {$regex: searchUser, $options:'i'}}
            ]
        });
        res.render('index', {users});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// Lấy ra user
router.get('/', async (req, res)=>{
    try {
    const users = await Author.find({});
   
    res.render('index',{users})
    } catch (error) { 
        res.status(500).send('Error');
    }
    
});
//add_user
router.post('/add',uploads, async (req, res)=>{
    try {
        const newUser = new Author({
            userName: req.body.name ,
            image:req.file.filename,
            fullName : req.body.fullName,
            address: req.body.address
        });  
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Loi server')
    }
});

router.get('/add', (req, res)=>{
    res.render('add_user')
});

//update user
router.post('/edit/:id',uploads,async (req, res)=>{
    try {
        const id = req.params.id;
        const updateUser = {
            userName: req.body.name,
            image: req.file.filename,
            fullName: req.body.fullName,
            address: req.body.address
        };
        const editUer = await Author.findByIdAndUpdate(id, updateUser,{new:true});
            res.redirect('/');
        
    } catch (error) {
        res.status(500).send('loi')
    }
});
//lay ra edit
router.get('/edit/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Author.findById(userId); // Truy vấn thông tin người dùng dựa trên ID
        res.render('edit_user', { user }); // Chuyển thông tin người dùng đến trang edit_user
    } catch (error) {
        console.log(error);
        res.status(500).send('Loi server');
    }
});

//delete user
router.delete('/delete/:id', async (req, res)=>{
    try {
        const userId = req.params.id;
        await Author.findByIdAndDelete(userId);
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(500).send('Loi server');
    }
})


module.exports = router