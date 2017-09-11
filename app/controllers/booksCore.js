
const Book = require('../models/book');
const path = require('path');


function saveBook (objFile){
  var promise = new Promise((resolve, reject)=>{
    // search book
    Book.find({"name": objFile.name}, (err, books) => {
      if (err) return reject(err)
      if (books.length > 0 ) return reject("Ya existe el fichero ")

      // Save file
      let book = new Book()
      book.name = objFile.name
      book.size = 50000
      book.ext = objFile.ext
      book.description = "Muy bueno"

      book.save( (err, bookStored) =>{
        if (err) reject(err)

        resolve(bookStored)
      })
    })
  })
  return promise

}
module.exports.change = function (pathFile){
  console.log(`Nuevo fichero encontrado... ${pathFile}`);
  // se va a proceder a parsear el fichero
  var objFile = path.parse(pathFile)
  console.log(`Resultado parseardo: ${objFile}`);
  console.log(objFile);

  //
  // parsear pdf
  //

  saveBook(objFile)
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

  removeBook(objFile)
    .then( results =>{
      console.log(`File ${pathFile} has been removed of DB`);
    })
    .catch(err => {
      return console.log(err)
    })
}

function removeBook(objFile){
  var promise = new Promise((resolve, reject)=>{
    // search book
    Book.find({"name": objFile.name}, (err, books) => {
      if (err) return reject(err)
      if (books.length == 0 ) return reject(`El fichero no existe en la DB ${objFile.name}`)

      // Save file

      Book.remove({"name": objFile.name}, (err) =>{
        if (err) return reject(err)
        resolve()
      })
    })
  })
  return promise
}
