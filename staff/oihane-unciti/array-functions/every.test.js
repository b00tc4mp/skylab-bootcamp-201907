console.log('DEMO: every');

var array1 = [1, 30, 39, 29, 10, 13];
console.log('array', array1);

function biggerThan(currentValue) {
    return currentValue > 30;
}
console.log('condition function', biggerThan);

console.log('every');
var resultEvery= (every(array1,biggerThan));
console.log(resultEvery, 'expected: true')


var array2 = ['a','b','c','d'];
console.log('array', array2);

function sameLetter(currentValue) {
    return currentValue === 'c';
}
console.log('condition function', sameLetter);

console.log('every');
var resultEvery= (every(array2,sameLetter));
console.log(resultEvery, 'expected: true')



var array2 = ['a','b','c','d'];
console.log('array', array2);

function sameLetter(currentValue) {
    return currentValue === 'z';
}
console.log('condition function', sameLetter);

console.log('every');
var resultEvery= (every(array2,sameLetter));
console.log(resultEvery, 'expected: false')
