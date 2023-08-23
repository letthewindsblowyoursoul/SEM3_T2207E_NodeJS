const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/list', async function (req, res) {
  try {
    let users = await User.find({});
    let per_page = process.env.PER_PAGE;
    let totalPages = Math.ceil(users.length / per_page);
    res.json({ totalPages: totalPages, perPage: per_page, data: users });
  } catch (error) {
    res.json(error);
  }
});

router.get('/page/:page', async function (req, res) {
  let page = parseInt(req.params.page);
  page <= 0 ? (page = 1) : (page = page);
  let per_page = process.env.PER_PAGE;
  let skip_pages = per_page * (page - 1);
  try {
    let users = await User.find({}).skip(skip_pages).limit(per_page);
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/user/delete/all', async function (req, res) {
  try {
    await User.deleteMany({});
    res.json({ code: 200, status: 'success' });
  } catch (error) {
    res.json({ code: 500, status: 'error' });
  }
});

router.delete('/user/delete/:id', async function (req, res) {
  let id = req.params.id;
  try {
    let user = await User.findByIdAndRemove(id);
    res.json({ code: 200, status: 'success', data: user });
  } catch (error) {
    res.json({ code: 500, status: 'error' });
  }
});

router.get('/user/edit/:id', async function (req, res) {
  let id = req.params.id;
  try {
    let user = await User.findById(id);
    res.json({ code: 200, status: 'success', data: user });
  } catch (error) {
    res.json({ code: 500, status: 'error' });
  }
});

router.put('/user/update/:id', async function (req, res) {
  let id = req.params.id;
  try {
    let user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.json({ code: 200, status: 'success', data: user });
  } catch (error) {
    res.json({ code: 500, status: 'error' });
  }
});

router.post('/user/create', async function (req, res) {
  try {
    let user = await User.create(req.body);
    res.json({ code: 200, status: 'success', data: user });
  } catch (error) {
    res.json({ code: 500, status: 'error' });
  }
});

module.exports = router;
