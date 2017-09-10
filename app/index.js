const mongoose = require('mongoose')
const config = require('./config')

const app = require('./app')

mongoose.connect(config.db, function (err, db) {
    if (err) return console.log(`Error al conectar a la base de datos`);


    console.log(`Conexion exitosa!`);
    app.listen(config.port, err =>{
      if (err) return console.log(`Fallo al iniciar APP ${err}`);
      console.log(`Corriendo por el puerto ${config.port}`);
    })
})
