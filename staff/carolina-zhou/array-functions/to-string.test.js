console.log('TEST toString');

var array = [1, 2, 3];
var array1 = [6, 'bb', 'pepe', 6]

var result = toString(array);
check(result, "1,2,3");
check(array, [1, 2, 3]);

result2 = toString(array1);
check(result2, "'6,bb,pepe,6'");
check(array1, [6, 'bb', 'pepe', 6]);
