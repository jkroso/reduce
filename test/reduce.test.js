
var chai = require('./chai')
  , series = require('../series')
  , Result = require('result')
  , reduce = require('..')

function add(a, b){
	return a + b
}

function delay(val){
	var result = new Result
	setTimeout(function () {
		if (val instanceof Error) result.error(val)
		else result.write(val)
	}, Math.random() * 10)
	return result
}

describe('reduce', function(){
	it('should return the accumulation', function(){
		reduce([1,2,3], add, 0).should.equal(6)
	})

	it('should default `value` to the first item in `obj`', function(){
		reduce([1,2,3], add).should.equal(6)
	})

	it('should handle an empty `obj`', function(){
		reduce([], add, 0).should.equal(0)
		expect(reduce([], add)).to.equal(undefined)
	})
})

describe('series', function(){
	it('should return the accumulation as a promise', function(done){
		series([1,2,3], add, 0).then(function(val){
			val.should.equal(6)
		}).node(done)
	})

	it('should execute in order', function(done){
		var calls = []
		series([1,2,3], function(a, b){
			return delay(a + b).then(function(val){
				calls.push([a, b])
				return val
			})
		}, 0).then(function(val){
			calls.should.eql([
				[0, 1],
				[1, 2],
				[3, 3],
			])
		}).node(done)
	})

	it('should accept promised arguments', function(done){
		series(delay([1,2,3]), function(a, b){
			return delay(a + b)
		}, delay(0)).then(function(val){
			val.should.equal(6)
		}).node(done)
	})

	describe('error catching', function(){
		it('sync', function(done){
			series([1,2,3], function(){
				throw new Error('test')
			}).then(null, function(e){
				e.message.should.equal('test')
				done()
			})
		})

		it('async', function(done){
			series([1,2,3], function(){
				return delay(new Error('test'))
			}).then(null, function(e){
				e.message.should.equal('test')
				done()
			})
		})
	})
})
