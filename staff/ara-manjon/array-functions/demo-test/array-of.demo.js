/**
 * This is a demo of the function arrayOf. It should return a new array with arguments introduced in the function.
 */

console.log('DEMO: arrayOf');

//1- FUNCIONA
//case 1: should return an array with all arguments introduced.
var item1 = 1;
var item2 = 2;
var result = arrayOf(item1, item2);
console.log(result, "expected: [1, 2]" );

//2- FUNCIONA
//case 2: should return an array with all arguments introduced, in case of fins an argument into other argument, return only the last index of the string.
var result = arrayOf(7,2,3,('a','b',{a:'c'}));
console.log(result, "expected: [7,2,3,{a:'c'}]");