const {
  FreeOrder,
  LimitTrxFree
} = require('../models')
const cron = require('node-cron');
const axios = require('axios')

const resetAccountFreeOrder = cron.schedule('0 0 * * *', () => {
  //berjalan setiap hari pukul 00:00
  //untuk pengecekkan akun sudah 1 minggu & update id 1 dgn qty menjadi 7 di table LimitTrxFrees
  //akun akan terhapus jika sudah 1 minggu
  const listIdDelete = []
  FreeOrder.findAll()
    .then((result) => {
      //proses pengecekkan setiap data table FreeOrder
      //jika hari ini sama dgn hari yg di createdAt, maka akan ditampung
      //.getDay > 0-6
      result.forEach((el) => {
        if (new Date().getDay() === new Date(el.createdAt).getDay()) {
          listIdDelete.push(el.id)
        }
      })
      //proses penghapusan data jika hari ini sama dgn hari yg di createdAt
      //hasil data tampungan
      if (listIdDelete.length !== 0) {
        FreeOrder.destroy({
          where: {
            id: {
              [Op.in]: listIdDelete
            }
          }
        })
        axios({
          url : `https://api.telegram.org/bot${process.env.API_TELEGRAM_TOKEN}/sendMessage?text=${listIdDelete.length} berhasil dihapus dari table FreeOrders&chat_id=612179633`,
          method : 'GET'
        })
      }
      //update id 1 dgn qty menjadi 7 di table LimitTrxFrees
      //proses reset limit per hari
      return LimitTrxFree.update({
        qty: 7
      }, {
        where: {
          id: 1
        }
      })
    })
    .then((result)=> {
      axios({
        url : `https://api.telegram.org/bot${process.env.API_TELEGRAM_TOKEN}/sendMessage?text=reset qty table LimitTrxFrees sukses&chat_id=612179633`,
        method : 'GET'
      })
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = {
  resetAccountFreeOrder
}