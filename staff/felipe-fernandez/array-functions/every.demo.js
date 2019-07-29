console.log('DEMO: every');

var array = [1, 2, 3];
console.log('array', array);

var array2 = ['a', 'a', 'a'];
console.log('array', array);


console.log('every');
var result = every(array, 1);
console.log(result, 'expected: true');
console.log(array, "expected: [1, 2, 3]"); 

console.log('every');
result = every(array, 4);
console.log(result, 'expected: false');
console.log(array, "expected: [1, 2, 3]");

console.log('every');
result = every(array, );
console.log(result, 'expected: true');
console.log(array, "expected: [1, 2, 3]");


var result3= every(array2, function(val){
    return val === 'a';
});

console.log(result3);