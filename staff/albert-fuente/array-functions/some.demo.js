console.log('DEMO: some');
var result;
var array = [1, 2, 3];
console.log('array', array);


console.log('some');
result = some(array, 1);
console.log(result, 'expected: true');
console.log(array, "expected: [1, 2, 3]");

/* var result=some(array,1);
check(result,"true"); */

console.log('some');
result = some(array, 4);
console.log(result, 'expected: false');
console.log(array, "expected: [1, 2, 3]");

console.log('some');
result = some(array, 3);
console.log(result, 'expected: true');
console.log(array, "expected: [1, 2, 3]");
console.log("----------------------------------------"); 