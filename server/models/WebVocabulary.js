const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  createdAt: Number,
  updatedAt: Number
}, {
  timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000)
  }
})

module.exports = mongoose.model('WebVocabulary', schema)