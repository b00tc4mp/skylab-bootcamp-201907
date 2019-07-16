console.log('TEST: concat method');

var array1 = ['a', 'b', 'f'];
var array2 = ['d', 'e', 'f'];

var result = concat (array1, array2);

check (result, ["a", "b", "f", "d", "e", "f"])