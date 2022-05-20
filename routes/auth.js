const router = require('express').Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/'})
const AuthController = require('../controllers/auth.js')

router.post('/register',upload.single('photo'), AuthController.register)
router.post('/login', AuthController.login)

module.exports = router