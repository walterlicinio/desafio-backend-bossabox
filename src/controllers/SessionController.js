const UserModel = require('../models/UserModel')

class SessionController {
  async STORE_JWT (req, res) {
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

    return res.json({
      user,
      token: UserModel.generateToken(user)
    })
  }
}

module.exports = new SessionController()
