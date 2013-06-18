
/**
 * apply `ƒ` to each value in `obj` and accumulate the
 * result. `ƒ` is passed two arguments. The current value
 * and the next value. If you don't pass an initial `value`
 * the first value in `obj` is used
 * 
 * @param {Array} obj
 * @param {Function} ƒ
 * @param {x} [value]
 * @return {x}
 */

module.exports = function(obj, ƒ, value){
	var len = obj.length
	var k = 0
	if (value === undefined) value = obj[k++]
	while (k < len) value = ƒ(value, obj[k++])
	return value
}