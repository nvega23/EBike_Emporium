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
);

for (let i = 0; i < NUM_SEED_USERS; i++) {
  users.push(
    new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    })
  );
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = async () => {
  try {
    const insertedUsers = await User.insertMany(users);

    const posts = [];
    for (let i = 0; i < NUM_SEED_POSTS; i++) {
      const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      posts.push(
        new Post({
          author: randomUser._id,
          bikeName: faker.vehicle.bicycle(),
          body: faker.lorem.paragraph(),
          price: faker.commerce.price(),
          imageUrls: [faker.image.transport(), faker.image.transport()],
          likes: [],
        })
      );
    }

    await Post.insertMany(posts);
    console.log("Seed data inserted successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};
