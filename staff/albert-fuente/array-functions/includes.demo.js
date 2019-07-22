console.log('TEST: includes');

var array1 = [1, 2, 3, 4];
console.log('array', array1);

console.log('includes');
var result = includes(array1, 5);
// console.log(result);
// console.log(array1);


//case no argument

try {
    includes();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "TryCatchMessage missing argument 0 when calling function includes");



}

// case not array
 
try {
    includes(2);
} catch(error) {
    console.log(error);
    check(error instanceof TypeError,true);
    check(error.message, "TryCatchMessage it is not an array");
}
