var array = [1,2,3];
console.log('array');

console.log('isArray');
var result = isArray(array);
console.log(result, "expected: true " );

array = "manzana" 
var result = isArray(array);
console.log(result, "expected: false " );