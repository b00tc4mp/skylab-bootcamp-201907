console.log('TEST fill');

var array = [1, 2, 3, 4, 5];
var array2 = [1, 2, 3, 4, 5];
var array3 = [1, 2, 3, 4, 5];
var array4 = [1, 2, 3, 4, 5];

var result = fill(array, 5, 2);
check(result, [1, 5, 5, 5, 5]);
check(array, [1, 5, 5, 5, 5]); 
 
var result2 = fill(array2, 1, 2, 3);
check(result2, [1, 2, 1, 1, 5]);
check(array2, [1, 2, 1, 1, 5]); 

var result3 = fill(array3, 5);
check(result3, [5, 5, 5, 5, 5]);
check(array3, [5, 5, 5, 5, 5]); 