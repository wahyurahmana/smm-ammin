const router = require('express').Router()
const freeOrderController = require('../controllers/freeOrder.js')
const {checkMac, checkUsername} = require('../middlewares/checkAvailability.js')


router.post('/', checkMac, checkUsername, freeOrderController.getFree)
router.get('/', freeOrderController.listAccountFree)

module.exports = router