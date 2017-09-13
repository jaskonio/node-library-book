const chokidar = require('chokidar')
const config  = require('./config')
const acctions = require('./controllers/booksCore')


module.exports.run = function (){
  var watcher = chokidar.watch( config.pathLibrary, {
    ignored: '*.txt',
    persistent: true
  });

  watcher
    .on('change', acctions.change )
    .on('error', error => console.log(`Watcher error: ${error}`))
    .on('unlink', acctions.unlink)
    .on('ready', () => console.log(`initial scan complete. Ready for changes. Path Watch ${config.pathLibrary}`))
}
