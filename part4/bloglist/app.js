const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(express.json())

mongoose.connect(config.MONGODB_URI, { family: 4 })
      .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app