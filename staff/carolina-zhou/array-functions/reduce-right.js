function reduceRight(array, expression) {

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');
  if (typeof array === 'undefined') throw new TypeError(array + ' is undefined');

  var newArray = [];

  for (var i = array.length -1; i >= 0  ;i--){
    newArray = expression(newArray, array[i]);
  }

 return newArray;

}