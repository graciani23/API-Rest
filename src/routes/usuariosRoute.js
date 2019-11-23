const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth')

const usuariosController = require('../controllers/usuariosController')
const projectController = require('../controllers/projectController')

router.post('/register', usuariosController.postSignUp)
router.post('/authenticate', usuariosController.postSignIn)

router.use(authMiddleware)
router.get('/projects', projectController.get)


module.exports = router