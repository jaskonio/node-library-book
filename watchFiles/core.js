const chokidar = require('chokidar')
var watcher = chokidar.watch('/home/jonatan/Escritorio/LibraryNode/libros', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

// resources = require('./file/controllers')

watcher
  .on('change', require('./file/controllers').change)

  // .on('unlink', require('./file/controllers').remove);
  // .on('add', require('./file/controllers').add)
// AÑADIR MODULO PARSER, PARSEAR EL FICHERO PDF
// EMPEZAR A BUSCAR PLANTILLA PARA EL FRONT-END
