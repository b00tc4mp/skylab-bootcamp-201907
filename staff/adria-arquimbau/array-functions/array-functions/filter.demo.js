console.log('DEMO: filter');

var array1 = [1, 30, 39, 29, 10, 13];
console.log('array', array1);

function biggerThan(currentValue) {
    return currentValue > 30;
}
console.log('condition function', biggerThan);

console.log('filter');
var result= (filter(array1,biggerThan));
console.log(result, 'expected: 39')


var array2 = ['a','b','c'];
console.log('array2', array2);

function sameLetter(currentValue) {
    return currentValue == 'b';
}
console.log('condition function', sameLetter);

console.log('filter');
var result= (filter(array2,sameLetter));
console.log(result, 'expected: b')



var array3 = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
console.log('array3', array3);

function bigWords(currentValue) {
    return currentValue.length > 6;
}
console.log('condition function', bigWords);

console.log('filter');
var result= (filter(array3,bigWords));
console.log(result, 'expected: exuberant, destruction, present')