const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
    }
});

const Product = mongoose.model('Product', productSchema);
module.export = Product
