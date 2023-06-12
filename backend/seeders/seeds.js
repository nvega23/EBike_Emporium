const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/Users.js');
const Product = require('../models/Product.js');
const bcrypt = require('bcryptjs');
// const { faker } = require('@faker-js/faker');
const faker = require('faker');
require('dotenv').config()

const NUM_SEED_USERS = 10;
const NUM_SEED_PRODUCTS = 30;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}

// // // Create products
const products = [];

for (let i = 0; i < NUM_SEED_PRODUCTS; i++) {
  products.push(
    new Product({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
      rating: Math.floor(Math.random() * 5) + 1,
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
    })
  );
}

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    console.log(db, 'this is the error for db')
    process.exit(1);
});

const insertSeeds = () => {

  User.collection.drop()
                  .then(() => Product.collection.drop())
                  .then(() => User.insertMany(users))
                 .then(() => Product.insertMany(products))
                  .then(() => {
                    mongoose.disconnect();
                  })
                  .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                  });
}
