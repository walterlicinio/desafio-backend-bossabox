const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authentication = require('../config/authentication')

const UserModel = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }

})

// Cryptography and Authentication
UserModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

UserModel.methods = { // methods trigger from the instance
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

UserModel.statics = { // statics trigger from the model
  generateToken ({
    id
  }) {
    return jwt.sign({
      id
    }, authentication.jwtSecret, {
      expiresIn: authentication.expireTime
    })
  }
}

module.exports = mongoose.model('User', UserModel)
