const express = require('express')
const mongoose = require('mongoose')
const database = require('./config/database')

class App {
  constructor () {
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    mongoose.connect(database, {
      dbName: 'bossabox',
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes/routes'))
  }
}

module.exports = new App().express
