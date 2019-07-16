console.log('TEST: copyWithin method');

var array = [0, 1, 2, 3, 4, 5, 6, 7];

var result = copyWithin (array, 0, 2, 4);

check (result, [2, 3, 2, 3, 4, 5, 6, 7]);

