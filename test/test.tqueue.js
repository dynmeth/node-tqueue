var TQueue = require('../lib/tqueue');

var t = Date.now();
var q = new TQueue(1000);

q.on('pop', function(item) {
  console.log(item, Date.now() - t);
  t = Date.now();
});

q.on('start', function() {
  console.log('start');
});

q.on('empty', function() {
  console.log('empty');
});

for(var i = 0; i<10; i++) {
  q.push(i);
}