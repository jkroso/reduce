
/**
 * apply `fn` to each value in `obj` and accumulate the
 * result. `fn` is passed two arguments. The current value
 * and the next value. If you don't pass an initial `value`
 * the first value in `obj` is used
 *
 * @param {Array} obj
 * @param {Function} fn
 * @param {Any} [value]
 * @return {Any}
 */

module.exports = function(obj, fn, value){
	var len = obj.length
	var k = 0
	if (value === undefined) value = obj[k++]
	while (k < len) value = fn(value, obj[k++])
	return value
}