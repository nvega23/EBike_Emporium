const express = require('express');
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const User = mongoose.model('User')
const passport = require("passport")
const { loginUser, restoreUser } = require("../../config/passport")
const { isProduction } = require("../../config/keys")
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");


//
const { requireUser } = require('../../config/passport');
const Cart = mongoose.model('Cart')
//


const validateRegisterInput = require("../../validations/register")
const validateLoginInput = require("../../validations/login")

const router = express.Router();


const DEFAULT_PROFILE_IMAGE_URL = "https://nestors-demo-seed.s3.us-west-1.amazonaws.com/bridge.jpeg"

/* GET users listing. */
router.get('/', function (req, res) {
  res.json({
    message: "GET /api/users",
    profileImageUrl: req.user.profileImageUrl
  })
});
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {

    const csrfToken = req.csrfToken()
    res.cookie("CSRF-Token", csrfToken)
  }
  if (!req.user) return res.json(null)
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.password

  })
})

router.post('/register',  singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user

  const profileImageUrl = req.file ?
    await singleFileUpload({ file: req.file, public: true }) :
    DEFAULT_PROFILE_IMAGE_URL;


  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    profileImageUrl,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch (err) {
        next(err);
      }
    })
  });
});

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err)
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" }
      return next(err)

    }

    return res.json(await loginUser(user))

  })(req, res, next)
})


router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).select("-hashedPassword")
  return res.json(user)


})

// router.post('/login', validateLoginInput, async (req, res, next) => {
//   passport.authenticate("local", async function (err, user) {
//     if (err) return next(err)
//     if (!user) {
//       const err = new Error("Invalid credentials");
//       err.statusCode = 400;
//       err.errors = { email: "Invalid credentials" }
//       return next(err)

//     }
//     return res.json(await loginUser(user))

//   })(req, res, next)
// })

router.post('/cart', requireUser, async (req, res, next) => {
  const { cart } = req.body;
  const { _id } = req.user
  let posts = [];
  try {
    const user = await User.findById(_id);

    //check if cart with logged in user id already exist
    let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();

    if (cartExistByThisUser) {
      cartExistByThisUser.remove();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {}

      object.post = cart[i]._id;
      object.count = cart[i].quantity;
      // add price

      posts.push(object)
    }

    let cartTotal = 0;

    for (let i = 0; i < posts.length; i++) {
      // cartTotal = cartTotal + posts[i].price * posts[i].quantity
    }
    let newCart = await new Cart({
      posts,
      cartTotal,
      orderBy: user?._id
    }).save();
    res.json({ ok: true })
  } catch (error) {
    throw new Error(error);
  }


  if (!req.user) return res.json(null)
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.password,
    profileImageUrl: req.user.profileImageUrl

})
});

router.get('/cart', requireUser, async (req, res, next) => {
  const { _id } = req.user

  try {
    const user = await User.findOne({ email: req.user.email })

    let cart = await Cart.findOne({ orderBy: user._id }).populate('posts.post', '_id price')

    const { posts, cartTotal } = cart;
    res.json({ posts, cartTotal });
  } catch (error) {
    throw new Error();
  }
})



router.delete("/empty-cart", async (req, res, next) => {
  const { _id } = req.user
  try {
    const user = await User.findOne({ _id });
    let cart = await Cart.findOneAndRemove({ orderBy: user._id })
    res.json(cart)

  } catch (error) {
    throw new Error();
  }
})


// router.delete("/:id", requireUser, async (req, res) => {
//   const { _id } = req.user
//   try {
//     const user = await User.findOne({ _id });
//     let cart = await Cart.findOneAndRemove({ orderBy: user._id })
//     res.json(cart)

//   } catch (error) {
//     throw new Error();
//   }
// })

// router.delete('/:id', requireUser, async (req, res)=>{
//   try {

//     const post = await Post.findById(req.params.id);

//     if (post.author._id.toString() !== req.user._id.toString()){

//       return res.status(401).json({msg: 'User not authorized'});
//     }

//     await post.remove();

//     res.json({msg: 'Post removed' });
//   }catch(err){
//     console.error(err.message)
//     res.status(500).send('Server Error');
//   };
// })



module.exports = router;
