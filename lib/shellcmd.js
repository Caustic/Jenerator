var proc = require('child_process');

module.exports = {
  run: function(){
    var sub = proc.spawn(arguments[0], arguments[1]);
    sub.stdout.on('data', function(data) {
      console.log(data.toString())
    });
    sub.stderr.on('data', function(data) {
      console.error(data.toString())
    });
  }
}
