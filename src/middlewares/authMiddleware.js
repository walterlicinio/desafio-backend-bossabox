const jwt = require('jsonwebtoken')
const authentication = require('../config/authentication')
const {
  promisify
} = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token not provided.'
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authentication.jwtSecret)
    req.userId = decoded.id
    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      error: 'Token invalid.'
    })
  }
}
