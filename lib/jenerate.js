var yaml = require('js-yaml')
  , fs = require('fs')
  , run = require('./shellcmd.js').run;

try {
  var doc = yaml.safeLoad(fs.readFileSync('/home/ubuntu/jenerate/Jenfile', 'utf8'));
  console.log(doc);
} catch (e) {
  console.error(e);
}

var exec = function(target) {
  if (target.done) {
    process.exit(1)
  }
  target.done = true;
  console.log(target)

  if (typeof(target.requires) !== 'undefined') {
    target.requires.forEach(function(data) {
      exec(doc[data])
    });
  }

  var args = target.runcfg.cmd.split(' ')
    , cmd = args.shift();
  run(cmd, args);
};

Object.keys(doc).forEach(function(key) {
  key.done = false;
})

var target = process.argv[2]
if (doc.hasOwnProperty(target)) {
  exec(doc[target])
}
