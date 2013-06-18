
# reduce

  reduce a set of values to a single value

## Getting Started

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/reduce

then in your app:

```js
var reduce = require('reduce')
var series = require('reduce/series')
```

## API

- [reduce()](#reduceobjarrayfunctionvaluex)

### reduce(obj:Array, ƒ:Function, [value]:x)

  apply `ƒ` to each value in `obj` and accumulate the
  result. `ƒ` is passed two arguments. The current value
  and the next value. If you don't pass an initial `value`
  the first value in `obj` is used

### series

  as above except you can use [Results](//github.com/jkroso/result) pretty much anywhere you like. It will always return a Result.

## Running the tests

Just run `make`. It will install and start a development server so all you then need to do is point your browser to `localhost:3000/test`. Likewise to run the examples.
