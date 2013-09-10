var TQueue = require('../'),
	should = require('should');

describe('tqueue', function() {
	describe('#property delay', function() {
		it('should have property delay', function() {
			var q = new TQueue();
			q.should.have.property('delay');
		});
	});

	describe('#defaults delay', function() {
		it('should return 1000', function() {
			var q = new TQueue();
			q.delay.should.equal(1000);
		});
	});

	describe('#delay', function() {
		it('should return custom delay 2000', function() {
			var q = new TQueue(2000);
			q.delay.should.equal(2000);

			q = new TQueue({delay: 2000});
			q.delay.should.equal(2000);
		});
	});

	describe('#delay', function() {
		it('should return delay ~1000', function(done) {
			this.timeout(3000);

			var q = new TQueue();
			var i = 0;
			var d = 0;

			q.push(1);
			q.push(2);

			q.on('pop', function() {
				if(i == 0) {
					d = Date.now();
					i++;
				} else {
					d = Date.now() - d;
					d.should.be.within(995, 1005);
					done();
				}
			});
		});
	});

	describe('#count', function() {
		it('should return 10', function(done) {
			this.timeout(3000);

			var q = new TQueue(200);
			var count = 0;

			q.on('pop', function() {
				count++;
			});

			q.on('empty', function() {
				count.should.equal(10);
				done();
			});

			for(var i=0; i<10; i++) {
				q.push(i);
			}
		});
	});

    describe('#variable delay', function() {
		it('should return variable delay in increments of ~1000', function(done) {
			this.timeout(10000);

			var q = new TQueue();
			var i = 0;
			var d = 0;

			q.push(1);
			q.push(2);
			q.push(3);
			q.push(4);

			q.on('pop', function() {
				switch(i) {
					case 0:
				    	d = Date.now();
						q.delay.should.equal(1000);
						break;
					case 1:
						e = Date.now() - d;
						d = Date.now();
						e.should.be.within(995, 1005);
						q.delay.should.equal(1000);
						q.setDelay(2000);
						break;
					case 2:
						e = Date.now() - d;
						d = Date.now();
						e.should.be.within(1995, 2005);
						q.delay.should.equal(2000);
						q.setDelay(3000);
						break;
					case 3:
						e = Date.now() - d;
						e.should.be.within(2995, 3005);
						q.delay.should.equal(3000);
						done();
						break;
				}
				i++;
			});
		});
	});



});