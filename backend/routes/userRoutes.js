const express = require('express')
const router = express.Router()
const { loginUser, getUser, registerUser } = require('../controllers/userController')

router.post('/login', loginUser)
router.get('/me', getUser)
router.post('/', registerUser)

   
module.exports = router