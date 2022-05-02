const axios = require('axios')
const { Op } = require("sequelize");
const {
  FreeOrder
} = require('../models')

class Controller {

  static listAccountFree(req, res, next){
    const listIdDelete = []
    FreeOrder.findAll()
    .then((result) => {
      result.forEach((el)=>{
        if(new Date().getDay() === new Date(el.createdAt).getDay()){
          listIdDelete.push(el.id)
        }
      })
      if (listIdDelete !== 0) {
        FreeOrder.destroy({
          where : {
            id : {
              [Op.in] : listIdDelete
            }
          }
        })
      }
    }).catch((err) => {
      next({status : 500, message : 'Internal Server Error'})
    });
  }
  static getFree(req, res, next) {
    let data
    const listService = ['2982']
    const isFound = listService.some(el => el === req.body.serviceId)
    if (isFound) {
      //process request api
      axios({
        method: 'post',
        url: 'https://justanotherpanel.com/api/v2',
        data: {
          key : process.env.API_KEY_JAP,
          action : 'add',
          service : req.body.serviceId,
          link : req.body.link,
          quantity : 50
        }
      })
      .then((result) => {
        data = result.data
        console.log(data);
        //process insert data to db
        return FreeOrder.create({
          ServiceId : req.body.serviceId,
          link : req.body.link,
          quantity : 50
        })
      })
      .then((FreeOrder) => {
        axios({
          url : `https://api.telegram.org/bot${process.env.API_TELEGRAM_TOKEN}/sendMessage?text=${req.body.link} sedang menggunakan layanan free order&chat_id=612179633`,
          method : 'GET'
        })
        res.status(201).json(FreeOrder)
      })
      .catch((err) => {
        next(err)
      })
    } else {
      next({status : 404, message : 'service not found'})
    }
  }
}

module.exports = Controller