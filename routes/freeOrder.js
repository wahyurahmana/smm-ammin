const router = require('express').Router()
const freeOrderController = require('../controllers/freeOrder.js')
const {checkMac, checkUsername, checkLimitTrx} = require('../middlewares/checkAvailability.js')


router.post('/',checkLimitTrx, checkMac, checkUsername, freeOrderController.getFree)
//router.get('/', freeOrderController.listAccountFree)

module.exports = router