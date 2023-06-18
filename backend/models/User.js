const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },

    cart: {
        type: Array,
        default: [],
      },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)
