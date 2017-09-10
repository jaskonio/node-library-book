//https://ponyfoo.com/articles/binding-methods-to-class-instance-objects
//http://salvatorelab.es/2015/08/how-to-pass-arguments-to-node-js-async-series-functions/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
const async = require('async')


class TestSeries {
  constructor () {
    this.uno = this.uno.bind(this)
    this.dos = this.dos.bind(this)
    this.counter = 0
  }
  uno (callback){
    this.counter +=1
    callback(null, this.counter)
  }
  dos (callback){
    this.counter +=1
    callback(null, this.counter)
  }
}

class MyApp {
  run(obj){
    async.series([
      obj.uno,
      obj.dos
    ],
    function(err, results) {
      // console.log(obj);
      obj.counter +=1
      results.push(obj.counter)
      console.log(results)
      // results is now equal to [1, 2, 3]
    });
  }
}
const test = new TestSeries();
const myapp = new MyApp()
myapp.run(test)
