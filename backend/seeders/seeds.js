const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_POSTS = 30;

// Create users
const users = [];

users.push(
  new User({
    username: 'demo-user',
    email: 'demo@user.io',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = () => {

    User.collection.drop()
                   .then(() => Post.collection.drop())
                   .then(() => User.insertMany(users))
                  //  .then(() => Post.insertMany(posts))
                   .then(() => {
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }
