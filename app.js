require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {resetAccountFreeOrder} = require('./helpers/cronJob.js')
const errHandler = require('./middlewares/errHandler.js')
const app = express()
const port = 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Route
const freeOrder = require('./routes/freeOrder.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/free-order', freeOrder)

resetAccountFreeOrder.start()

app.use(errHandler)

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`)
})