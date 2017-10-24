require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { mongoose } = require('./db/mongoose')

const { setUpRoutes } = require('./routes/routes')

const app = express()

const port = process.env.PORT
const originUrl = process.env.TODO_APP_URL

app.use(
  cors({
    origin: originUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to Node Todo App.')
})

setUpRoutes(app)

app.listen(port, () => console.log(`Started on port ${port}`))

module.exports = {
  app
}
