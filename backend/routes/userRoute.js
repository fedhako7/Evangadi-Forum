const express = require('express')
const route = express.Router()
const {register, login, checkuser } = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

route.post('/register', register)
route.post('/login', login)
route.get('/checkuser', authMiddleware, checkuser)


module.exports = route
