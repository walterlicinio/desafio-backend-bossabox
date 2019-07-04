const UserModel = require('../models/UserModel')

class UserController {
  async STORE_USER (req, res) {
    try {
      const newUser = await UserModel.create(req.body)
      return res.json(newUser)
    } catch (err) {
      return res.json({
        msg: `Username or email already exists: ${err}`
      })
    }
  }

  async DELETE_USER (req, res) {
    const {
      email,
      password
    } = req.body

    const user = await UserModel.findOne({
      email
    })

    if (!user) {
      return res.status(400).json({
        error: 'User not found.'
      })
    }

    if (!await user.compareHash(password)) {
      return res.status(400).json({
        error: 'Password not correct.'
      })
    }

    const deleted = await UserModel.findOneAndDelete({
      email
    })

    return res.json({
      deleted: `${deleted.username}`
    })
  }
}

module.exports = new UserController()
