const mongoose = require('mongoose')

const ToolModel = mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String,
    required: true,
    default: 'Title not provided'
  },
  link: {
    type: String,
    required: true,
    default: 'Link not provided'
  },
  description: {
    type: String,
    required: true,
    default: 'Description not provided'
  },
  tags: {
    type: [String]
  }
})

module.exports = mongoose.model('Tool', ToolModel)
