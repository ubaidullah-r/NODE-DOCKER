const express = require("express")
const { model } = require("mongoose")

const authController = require("../controllers/authController")

const router = express.Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.login  )

module.exports = router