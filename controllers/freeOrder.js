const axios = require('axios')
const sendEmail = require('../helpers/nodeMailer.js')
const qs = require('qs');
const {
  Op
} = require("sequelize");
const {
  FreeOrder,
  LimitTrxFree
} = require('../models')

class Controller {

  static getFree(req, res, next) {
    let dataFreeOrder
    let dataDbFree
    const listService = ['3274']
    const isFound = listService.some(el => el == req.body.service)
    if (isFound) {
      const data = qs.stringify({
        'service': `${req.body.service}`,
        'target': `${req.body.target}`,
        'quantity': '50',
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

      axios(config)
        .then(function (response) {
          dataFreeOrder = response.data;
          return FreeOrder.create({
            service: req.body.service,
            target: req.body.target,
            quantity: 50 //jumlahnya sesuai moodku
          })
        })
        .then((free) => {
          dataDbFree = free
          return LimitTrxFree.decrement({
            qty: 1
          }, {
            where: {
              id: 1
            }
          })
        })
        .then((free) => {
          axios({
            url: `https://api.telegram.org/bot${process.env.API_TELEGRAM_TOKEN}/sendMessage?text=${req.body.target} sedang menggunakan layanan free order&chat_id=612179633`,
            method: 'GET'
          })
          // sendEmail('Free Order', `${req.body.target} sedang menggunakan layanan, dengan orderId ${dataFreeOrder.data.id}`)
          // res.status(201).json({
          //   order: dataFreeOrder,
          //   data: dataDbFree
          // })
        })
        .catch(function (error) {
          console.log(error);
          next(error);
        });
    } else {
      next({
        status: 404,
        message: 'service not found'
      })
    }
  }
}

module.exports = Controller