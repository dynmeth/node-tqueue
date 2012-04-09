## TQueue

_tqueue_ is a simple first in, first out (FIFO) queue that pops its items on a regular interval.

## Example

    var TQueue = require('tqueue');

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

## Installation

    $ npm install tqueue

## License 

(The MIT License)

Copyright (c) 2012 David Howell &lt;david@dynamicmethods.com.au&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.