/**
 * Demo to check that the function find runs.
 */


console.log('DEMO: find');

var array1 = [1, 30, 39, 29, 10, 13];
console.log('array1', array1);

function biggerThan(currentValue) {
    return currentValue > 30;
}
console.log('condition function', biggerThan);

console.log('find');
var result= (find(array1,biggerThan));
console.log(result, 'expected: 39')


var array2 = ['elephant', 'bird', 'dog','gorilla'];
console.log('array2', array2);

function smallWord(currentValue) {
    return currentValue.length < 4;
}
console.log('condition function', smallWord);

console.log('find');
var result= (find(array2,smallWord));
console.log(result, 'expected: dog')
