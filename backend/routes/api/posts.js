const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/Post');
const User = require('../../models/User');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/post');
const { multipleFilesUpload, multipleMulterUpload } = require('../../awsS3');

router.get('/', async (req, res, next) => {
  try {
    let posts;
    if (Object.keys(req.query).length === 0) {
      posts = await Post.find()
        .populate('author', '_id username profileImageUrl')
        .sort({ createdAt: -1 });
    } else {
      posts = await Post.find({ body: { $regex: new RegExp(req.query.search, 'i') } })
        .populate('author', '_id username profileImageUrl')
        .sort({ createdAt: -1 });
    }
    return res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ notfound: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ notowned: 'Current user does not own this post' });
    }
    post.body = req.body.body;
    let newPost = await post.save();
    return res.json(newPost);
  } catch (err) {
    next(err);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: 'No user found with that id' };
      return next(error);
    }
    const posts = await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate('author', '_id username profileImageUrl');
    return res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', '_id username profileImageUrl');
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      error.errors = { message: 'No post found with that id' };
      return next(error);
    }
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

router.post('/', multipleMulterUpload('images'), requireUser, validatePostInput, async (req, res, next) => {
  const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
  try {
    const newPost = new Post({
      body: req.body.body,
      imageUrls,
      bikeName: req.body.bikeName,
      price: req.body.price,
      author: req.user._id,
    });
    let post = await newPost.save();
    post = await post.populate('author', '_id username profileImageUrl');
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ notowned: 'Current user does not own this post' });
    }
    await post.deleteOne();
    return res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

router.put('/like/:id', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ notfound: 'Post not found' });
    }
    if (post.likes.some(like => like.user.toString() === req.user.id.toString())) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    next(err);
  }
});

router.put('/unlike/:id', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ notfound: 'Post not found' });
    }
    const likeIndex = post.likes.findIndex(like => like.user.toString() === req.user.id.toString());
    if (likeIndex === -1) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }
    post.likes.splice(likeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
