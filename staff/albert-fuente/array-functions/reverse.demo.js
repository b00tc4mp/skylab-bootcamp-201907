console.log("REVERSE DEMO");


//
var array1 = ['one', 'two', 'three'];
console.log(array1, " these are the initial values");

var result=(reverse(array1));


console.log(reverse(array1), " expected output [three,two,one]");

check(result, ["three", "two", "one"] );
// console.log('array1: ', array1);
// // expected output: Array ['one', 'two', 'three']
//
// var reversed = array1.reverse();
// console.log('reversed: ', reversed);
// expected output: Array ['three', 'two', 'one']

/* try {
    reverse();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument 0 when calling function forEach');
} */