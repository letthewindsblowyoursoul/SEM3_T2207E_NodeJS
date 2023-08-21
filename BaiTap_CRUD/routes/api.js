const express = require('express');
const router = express.Router();
const user = require('../models/users');

router.delete('/api/delete/:id', async(req, res)=>{
   try {
    const id = req.params.id;
    const userNew = await user.findByIdAndRemove(id);
    if (userNew) {
        res.send('xoa thanh cong')
    }else{
        res.send('xoa loi thanh cong')
    }
   } catch (error) {
    res.status(404).send('loi')
   }
})
module.exports = router