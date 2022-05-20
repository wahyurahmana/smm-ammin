require('dotenv').config()
const express = require('express')
const cors = require('cors')
const qs = require('qs');
const axios = require('axios')
const {resetAccountFreeOrder} = require('./helpers/cronJob.js')
const errHandler = require('./middlewares/errHandler.js')
const app = express()
const port = process.env.PORT || 3000;


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Route
const freeOrder = require('./routes/freeOrder.js')
const auth = require('./routes/auth.js')


app.get('/', (req, res) => {
  res.status(200).json({message : 'Cup Cup Muach'})
})

//fitur gratis
app.use('/free-order', freeOrder)

//auth
app.use('/auth', auth)

//check Orderan
app.post('/check-order', (req, res, next)=>{
  const data = qs.stringify({ //data body irvankede nya harus berupa query string
    'id': `${req.body.orderId}`,
    'api_id': `${process.env.API_ID_IRVANKEDESMM}`,
    'api_key': `${process.env.API_KEY_IRVANKEDESMM}`
  })
  axios({
    url : 'https://irvankedesmm.co.id/api/status',
    method : 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  })
    .then((result) => {
      console.log(result.data);
      res.status(200).json(result.data)
    }).catch((err) => {
      next(err)
    });
})

//automatic reset data fitur gratis
resetAccountFreeOrder.start()

//error handler
app.use(errHandler)

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`)
})