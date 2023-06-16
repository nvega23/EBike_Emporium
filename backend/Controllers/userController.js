const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerUser = (req, res) => {
    res.json({message: 'Register User'})
}
const loginUser = (req, res) => {
    res.json({message: 'Login User'})
}
const getMe = (req, res) => {
    res.json({message: 'User data display'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
