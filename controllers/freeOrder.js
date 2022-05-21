const axios = require('axios')
const qs = require('qs');
const {
  Op
} = require("sequelize");
const {
  FreeOrder,
  LimitTrxFree
} = require('../models')

// const sendEmail = require('../helpers/nodeMailer.js')

class Controller {

  static async getFree(req, res, next) {
    try {
      const listService = ['3274']
      const isFound = listService.some(el => el == req.body.service)
      if (isFound) {
        const data = qs.stringify({
          'service': `${req.body.service}`,
          'target': `${req.body.target}`,
          'quantity': '25',
          'api_id': `${process.env.API_ID_IRVANKEDESMM}`,
          'api_key': `${process.env.API_KEY_IRVANKEDESMM}`
        });
        const config = {
          method: 'post',
          url: 'https://irvankedesmm.co.id/api/order',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        };

        const apiSMM = await axios(config)
        const resultFreeOrder = await FreeOrder.create({
          service: req.body.service,
          target: req.body.target,
          quantity: 25 //jumlahnya sesuai moodku
        })
        const resultLimitTrxFree = LimitTrxFree.decrement({
          qty: 1
        }, {
          where: {
            id: 1
          }
        })
        const notifTelegram = await axios({
          url: `https://api.telegram.org/bot${process.env.API_TELEGRAM_TOKEN}/sendMessage?text=${req.body.target} sedang menggunakan layanan free order&chat_id=612179633`,
          method: 'GET'
        })

        // const emailNotif = await sendEmail('Free Order', `${req.body.target} sedang menggunakan layanan, dengan orderId ${dataFreeOrder.data.id}`)
        
        res.status(201).json({
          order: apiSMM.data,
          data: resultFreeOrder
        })
      } else {
        next({
          status: 404,
          message: 'service not found'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller