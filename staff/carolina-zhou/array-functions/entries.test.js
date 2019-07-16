console.log('TEST entries');

var array = ['a', 'b', 'c'];
var iterator = array.entries();

check(iterator, "[0, a][1, b][2, c]");