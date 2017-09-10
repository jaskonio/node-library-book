const async = require('async')
const path = require('path')
var request = require('request');


function get_stats(file, callback){
  let obj = path.parse(file)
  callback(null, obj)
}

function check_exist_file (file, callback){
  // return true si existen
  // return false sino existe

    request
      .get("http://localhost:3000/api/book/name/" + file.name)
      .on('response', (response) => {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type']) // 'image/png'
        if (response.statusCode == 404) {
          // no existe
          callback(null, false)
        }
        else if (response.statusCode == 200) {
          // existe pdf
          callback(null, true)
        }
        else{
          callback("Erro de status")
          // callback("status no renocido " + response.statusCode)
          // return throw new Error("status no renocido " + response.statusCode)
        }
      })
      .on('error', function(err) {
        // console.log(`No se pudo realizar la peticion: ${err}`)
        // return throw new Error("No se pudo realizar la peticion " + response.statusCode)
        callback("Error de peticion")
      })

}

function insert_file(file, callback){
  check_exist_file(file, function (err, status) {
    if (err) return console.log(`Hubo un erro al consultar el statdo del fichero: ${err}`);
    if (status == true) return console.log("El fichero ya existe en la DB");

    console.log("Se va insertart el fichero..");
    // console.log(file);
    request.post({
      url: 'http://localhost:3000/api/book',
      form:{
          name : file.name,
          size : 50,
          ext: file.ext
      }},function(err, httpRespondes, body){
        if (err) return console.log(`Error de peticion: ${err}`);
        // console.log(httpRespondes);
        console.log(`Nuevo fichero salvado ${file.name}`);
      })

  })
}

function remove_file(file, callback){
  File.remove({name: file.name}, function(err,doc){
    if (err) {callback("error remove", file)}
    else {callback(null, doc)}
  })
}

module.exports.change = function(path){
  console.log(`File ${path} has been changed.`);
  async.waterfall([
    function(callback){
      get_stats(path, callback)
    },
    function(file_to_insert, callback){
      insert_file(file_to_insert, callback)
    }
  ], function(err, results){
    if (err) return console.log("[ERROR]" + err);
    console.log(results);
  });
}


module.exports.add = function(path){
  console.log(`File ${path} has been added.`);
  async.waterfall([
    function(callback){
      get_stats(path, callback)
    },
    function(file, callback){
      check_exist_file(file, callback)
    },
    function(file_to_insert, callback){
      insert_file(file_to_insert, callback)
    }
  ], function(err, results){
    if (err) console.log("[ERROR]" + err);
    console.log(results);
  });
}

module.exports.remove = function(path){
  console.log(`File ${path} has been removed.`);
  async.waterfall([
    function(callback){
      get_stats(path, callback)
    },
    function(file_to_insert, callback){
      remove_file(file_to_insert, callback)
    }
  ], function(err, results){
    if (err) console.log("[ERROR]" + err);
    console.log("Fichero remove");
  });
}
