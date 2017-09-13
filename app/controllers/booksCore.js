
const Book = require('../models/book');
const path = require('path');
const book_function = require('./book_function')


module.exports.change = function (pathFile){
  console.log(`Nuevo fichero encontrado... ${pathFile}`);
  // se va a proceder a parsear el fichero
  var objFile = path.parse(pathFile)
  console.log(`Resultado parseardo: ${objFile}`);
  console.log(objFile);

  //
  // get file dump data
  //
  book_function.get_info_pdf(objFile.dir + "/" +objFile.base)
    .then(path_dump_data=>{
      book_function.parsePdf(path_dump_data)
        .then(data => {
          console.log("Fichero parseado.");
          console.log(data);
        })
    })


  //
  // parsear pdf
  //

  book_function.saveBook(objFile)
    .then( results =>{
      console.log(`Fichero gurdado ${results}.`);
    })
    .catch(err =>{
      return console.log(err)
    })

}

module.exports.unlink = function(pathFile){
  console.log(`File ${pathFile} has been removed`)
  var objFile = path.parse(pathFile)

  book_function.removeBook(objFile)
    .then( results =>{
      console.log(`File ${pathFile} has been removed of DB`);
    })
    .catch(err => {
      return console.log(err)
    })
}
