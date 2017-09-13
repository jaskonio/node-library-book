const Book = require('../models/book');
const fs = require('fs');

function filter_keyAndValue(text){
  return text.indexOf("InfoKey") == 0 || text.indexOf("InfoValue") == 0
}
function delete_header_key(text){
  return text.split(":")[1].substring( 1, text.length)
}

module.exports.parsePdf = function(file){
  var promise = new Promise( function(resolve, reject){
    fs.readFile( file, 'utf8', function(err, data){
      if (err) return console.log(err);

      arr_data = data.split("\n")
      arr_filter = arr_data.filter(filter_keyAndValue)
      arr_key_abd_value = arr_filter.map( delete_header_key)
      // console.log(arr_key_abd_value);

      var obj = {}
      for (var i = 0; i < arr_key_abd_value.length; i+=2) {
        // console.log(`Key: ${arr_key_abd_value[i]}`);
        obj[ arr_key_abd_value[i]] = arr_key_abd_value[ i+1]
      }


      resolve(obj)
      // { ModDate: 'D',
      //   CreationDate: 'D',
      //   Author: 'Jorge D&#237;az',
      //   Title: 'Servidores de Aplicaciones en Linux',
      //   Creator: 'Writer',
      //   Producer: 'OpenOffice.org 3.1' }
    });
  })



  return promise
}

module.exports.saveBook = function (objFile){
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

module.exports.removeBook = function (objFile){
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




// http://nodejs.org/api.html#_child_processes

var exec = require('child_process').exec;
const path = require('path');

const config = require('../config')

module.exports.get_info_pdf = function (file){
  var promise = new Promise( (resolve, reject)=>{
    var basename = path.parse(file)["name"]
    console.log(basename);

    var command = `pdftk  ${file} dump_data output ${config.path_dump_data}/${basename}.txt`
    console.log(command);

    exec( command, (error, stdout, stderr) => {
      if (error) return reject(error )

      resolve( config.path_dump_data + "/"+ basename + ".txt" )

    })

  })
  return promise
}
