console.log("UNSHIFT DEMO");


var array1 = [1, 2, 3];
console.log(array1, " these are the initial values");


/* console.log(unshift(array1, 4, 5), " expected result [4,5,1,2,3");
 */
var result=(unshift(array1, 4, 5));
check(result,[4, 5, 1, 2, 3]);


// var array1 = [1, 2, 3];
//
// console.log(array1.unshift(4, 5));
// // expected output: 5
//
// console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
