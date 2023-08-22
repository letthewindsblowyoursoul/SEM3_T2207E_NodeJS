var express = require('express');
var router = express.Router();
var Product = require('./../database/models/usermodels');
const mongoose = require('mongoose')
/**
 * Home page: loading all user
 */
router.get('/', (req, res) => {
    Product.find({})
        .then(usersps => {
            res.render('home', { usersps: usersps })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

/**
 * Go to Add User page
 */
router.get('/add-user', (req, res) => {
    res.render('add-user');
});

/**
 * Add new User
 */
router.post('/', (req, res) => {
   try {
    let newProduct = new Product({
        userid: req.body.userid,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        address: req.body.address
    });

    

    newProduct.save()
        .then(doc => {
             res.redirect('/');
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
   } catch (error) {
     console.log(error);
   }
   
});

/**
 * Go to Update user page
 */
router.get('/update-user/:userid', (req, res) => {
    Product.findById(req.params.userid)
        .then((usersps) => {
        res.render('update-user', { usersps: usersps });
    })
    .catch((err) =>{
        console.log(err);
    })
    
});

/**
 * Delete user
 */
router.delete('/:userid', (req, res) => {
    let productId = req.params.userid;
    Product.findByIdAndDelete(productId)
       .then((usersps) => {
        res.render('home', { usersps: usersps });
   })
    .catch((err) =>{
        console.log(err);
    })
    
});

 
/**
 * Update user
 */
router.post('/:userid', (req, res) => {
    let productId = req.params.userid;
    Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { username: req.body.username,
             firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            address: req.body.address } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/')
        })
});

module.exports = router;