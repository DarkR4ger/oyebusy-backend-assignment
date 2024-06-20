
const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  }
})

module.exports = model('movies',movieSchema)
