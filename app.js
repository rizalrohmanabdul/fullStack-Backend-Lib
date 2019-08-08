require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const app = express()
const port = process.env.SERVER_PORT || 3333

const categoryRoute = require('./src/routes/category')
const userRoute = require('./src/routes/member')
const bookRoute     = require('./src/routes/book')
const borrowingRoute = require('./src/routes/borrowing')
const donateRoute = require('./src/routes/donate')
const authuserRoute = require('./src/routes/authuser')

const whitelist = process.env.WHITELIST


const corsOptions = (req, callback) => {
  if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
    console.log('Success')
    return callback(null, {
      origin: true
    })
  } else {
    console.log('Failed')
    return callback(null, {
      origin:false
    })
  }
}


app.use(cors());
// app.options('*', cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))

app.listen(port, () => {
  console.log(`\n App ini berjalan di port/ App listening on port ${port} \n `)
})

app.use(bodyParser.json()) // Body parse json
app.use(bodyParser.urlencoded({ extended: false })) // body type
app.use(`/book`, bookRoute)
app.use(`/category`, categoryRoute) 
app.use(`/member`, userRoute)
app.use('/borrowing', borrowingRoute)
app.use('/donate', donateRoute)
app.use('/authuser', authuserRoute)