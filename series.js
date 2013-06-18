
var decorate = require('when/decorate')
  , when = require('when/read')
  , Result = require('result')

module.exports = decorate(function(obj, ƒ, value){
	var result = new Result
	var len = obj.length
	var k = 0
	if (value === undefined) value = obj[k++]
	function next(value){
		if (k < len) {
			try { value = ƒ(value, obj[k++]) }
			catch (e) { return fail(e) }
			return when(value, next, fail)
		}
		result.write(value)
	}
	function fail(e){
		result.error(e)
	}
	next(value)
	return result
})