// Import express and start router
const express = require('express')
const router = express.Router()

// Import controller
const ToolController = require('../controllers/ToolController')
const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware')

// Define routes
// tools
router.get('/tools', ToolController.GET_TOOLS)
router.post('/tools', authMiddleware, ToolController.STORE_TOOL)
router.delete('/tools/:id', ToolController.DELETE_TOOL)
// user
router.post('/user', UserController.STORE_USER)
router.delete('/user', authMiddleware, UserController.DELETE_USER)

// session
router.post('/login', SessionController.STORE_JWT)

// testing auth middleware
router.get('/login', authMiddleware, (req, res) => {
  res.json({
    msg: 'User logged in'
  })
})

// Export the router
module.exports = router
