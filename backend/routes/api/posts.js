const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
const Post = require('../../models/Post')
const User = require('../../models/User')
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/post');

const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");

router.get('/', async (req, res) => {
    try {

      let posts;
      if (Object.keys(req.query).length === 0) {
        posts = await Post.find()
          .populate("author", "_id username profileImageUrl")
          .sort({ createdAt: -1 });
      } else {
        posts = await Post.find( { body: {$regex: new RegExp(req.query.search, "i") }})
          .populate("author", "_id username profileImageUrl")
          .sort({ createdAt: -1 });
      }
      return res.json(posts);
    } catch(err) {

    }



});

router.patch('/:id', requireUser, async(req, res, next)=>{

  try{
    const posts = await Post.findById(req.params.id)
      if (posts.post.id.toString() !== req.user.id.toString()) {
          res.status().json({ notowned: 'Current user does not own this posts' })
  } else {
      posts.body = req.body.body;
      let newPost = await posts.save();
      return res.json(newPost);
  }}
  catch(err){
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = {message: "Something went wrong saving"};
  }
})

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
    const posts = await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      // .populate("author", "_id, username");
      .populate("author", "_id username profileImageUrl")
      return res.json(posts);
    }
    catch(err) {
    return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
    const post = await Post.findById(req.params.id)
      // .populate("author", "id, username");
      .populate("author", "_id username profileImageUrl")
      return res.json(post);
    }
    catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
    }
});

router.post('/', multipleMulterUpload("images"), requireUser, validatePostInput, async (req, res, next) => {

  const imageUrls = await multipleFilesUpload({ files: req.files, public: true });

    try {
      const newPost = new Post({

        body: req.body.body,
        imageUrls,
        bikeName: req.body.bikeName,
        price: req.body.price,
        author: req.user._id
      });

      let post = await newPost.save();

      // post = await post.populate('author', '_id, username');
      post = await post.populate("author", "_id username profileImageUrl")

      return res.json(post);
    }
    catch(err) {
      next(err);
    }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Perform any necessary authorization checks here

    await post.deleteOne();

    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.put("/like/:id", requireUser, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)


    if(post.likes.filter(like => like.user.toString() === req.user.id.toString()).length > 0){
      return res.status(400).json({msg: "Post already liked"})
    }

    post.likes.unshift({user: req.user.id})

    await post.save()
    res.json(post.likes)

  } catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')

  }
})



router.put("/unlike/:id", requireUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)


    if (post.likes.filter(like => like.user.toString() === req.user.id.toString()).length === 0) {
      return res.status(400).json({ msg: "Post has not been liked" })
    }

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)

    await post.save()
    res.json(post.likes)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')

  }
})

module.exports = router;
