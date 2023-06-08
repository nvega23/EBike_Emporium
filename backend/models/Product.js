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
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product
