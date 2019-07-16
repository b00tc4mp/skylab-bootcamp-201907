console.log('DEMO: findIndex');

var array1 = ['elephant', 'bird', 'dog','gorilla'];
console.log('array1', array1);

function smallWord(currentValue) {
    return currentValue.length < 4;
}
console.log('condition function', smallWord);

console.log('findIndex');
var result= (findIndex(array1,smallWord));
console.log(result, 'expected: 2')


var array1 = ['elephant', 'bird', 'dog','gorilla'];
console.log('array1', array1);

function smallWord(currentValue) {
    return currentValue.length < 3;
}
console.log('condition function', smallWord);

console.log('findIndex');
var result= (findIndex(array1,smallWord));
console.log(result, 'expected: -1')