const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Product = mongoose.model('Product');
const { requireUser } = require('../../config/passport');
const validateProductInput = require('../../validations/products');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
                              .populate("author", "_id, username")
                              .sort({ createdAt: -1 });
    return res.json(products);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const products = await Product.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id, username");
    return res.json(products);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id)
                             .populate("author", "id, username");
    return res.json(products);
  }
  catch(err) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    error.errors = { message: "No product found with that id" };
    return next(error);
  }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no
// current user.) Also attach validateProductInput as a middleware before the
// route handler.
router.post('/', requireUser, validateProductInput, async (req, res, next) => {
  try {
    const newProduct = new Product({
      text: req.body.text,
      author: req.user._id
    });

    let product = await newProduct.save();
    product = await product.populate('author', '_id, username');
    return res.json(product);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
