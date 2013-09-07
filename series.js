
var decorate = require('lift-result')
var Result = require('result')
var read = Result.read

module.exports = decorate(function(obj, fn, value){
	var result = new Result
	var len = obj.length
	var k = 0
	if (value === undefined) value = obj[k++]
	function next(value){
		if (k < len) {
			try { value = fn(value, obj[k++]) }
			catch (e) { return fail(e) }
			return read(value, next, fail)
		}
		result.write(value)
	}
	function fail(e){
		result.error(e)
	}
	next(value)
	return result
})