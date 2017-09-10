const mongoose = require('../config/mongoose'),
  fileSchema = require('./schemas').fileSchema;

const models = {

  File: mongoose.model('fileSchema', fileSchema)

};

module.exports = models;
