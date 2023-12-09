const { Router } = require('express')
const { signup, login} = require("../controller/userController")
const router = Router()
router.route('/login').post(login)
router.route('/signup').post(signup)
module.exports = router