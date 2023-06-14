const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const tokenValidation = require('../middleware/tokenValidation.js')

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
)

router.get(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.post(
  '/friend',
  tokenValidation.validateToken,
  userController.addFriend
)

module.exports = router