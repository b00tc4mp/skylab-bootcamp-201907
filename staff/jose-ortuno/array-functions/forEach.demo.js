console.log('DEMO forEach');

var array = ['a', 'b', 'c'];
console.log('array', array);

// forEach(array, function (element, index, array) {
//     console.log(element, index, array);
// });

forEach(array, console.log);

console.log('expected: \n"a" 0 ["a", "b", "c"], \n"b" 1 ["a", "b", "c"], \n"c" 2 ["a", "b", "c"]');

array = [1, 2, 3];
console.log('array', array);

var result = 0;
forEach(array, function (value) {
    result += value;
});

console.log(result, 'expected: 6');