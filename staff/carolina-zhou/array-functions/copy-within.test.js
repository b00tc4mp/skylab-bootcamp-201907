console.log('TEST copyWithin');

var array = [ 0, 1, 2, 3, 4, 5, 6, 7];

check(array.copyWithin(0, 2, 4), ["2", "3", "2", "3", "4", "5", "6", "7"]);