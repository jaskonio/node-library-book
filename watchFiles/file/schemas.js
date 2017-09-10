const mongoose = require('../config/mongoose'),
      Schema = mongoose.Schema;

const schemas = {

    fileSchema: new Schema({
        name: {type: String},
        size: {type: Number},
    })

};
module.exports = schemas;
