var EventEmitter = require('events').EventEmitter,
    util = require('util');

var defaults = {
  delay: 1000
};

function TQueue(config) {
  var self = this;
  EventEmitter.call(self);

  if(!config) {
    config = 1000;
  }

  self.delay = (typeof config === 'number' ? config : config.delay);
  self.fifo = (typeof config === 'number' ? true : config.type == 'fifo');
  self._items = [];
  self._intervalId = 0;
};

util.inherits(TQueue, EventEmitter);

TQueue.prototype.push = function(item) {
  var self = this;

  if (self.empty()) {
    setTimeout(self.curry(self), this.delay);
    this.emit('start');
  }
 
  this._items.push(item);
  this.emit('push', item);

};

TQueue.prototype.curry = function(obj) {
    return function() { obj.pop(obj) }
};

TQueue.prototype.pop = function(self) {
  if(!self.empty()) {
  	self.emit('pop', (self.fifo ? self._items.shift() : self._items.pop()));
    setTimeout(self.curry(self), self.delay);	
  } else {
    self.emit('empty');
  }
};

TQueue.prototype.length = function() {
  return this._items.length;
};

TQueue.prototype.empty = function() {
  return (this.length() == 0);
};

TQueue.prototype.setDelay = function(delay) {
  this.delay = delay;
}

module.exports = TQueue;