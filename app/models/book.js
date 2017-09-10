const mongoose = require('mongoose');
const Schema = mongoose.Schema


const BookSchema = Schema({
  name : String,
  size : Number,
  ext : String
})

module.exports = mongoose.model('Book', BookSchema)
