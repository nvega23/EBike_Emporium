const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
require('dotenv').config();


// Use the product routes
app.use('/api/products', productRoutes);

// Set up middleware to parse request bodies
app.use(express.json());

// Set up your MongoDB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error);
    });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
