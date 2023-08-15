const express = require('express');
const {getLogin,getHomepage} = require('../controllers/homeController');
const router = express.Router();

//router.Method('/route', handler)

router.get('/', getLogin);
router.get('/home',getHomepage);
  
module.exports = router;//express default