console.log('TEST: includes');

var array1 = [1, 2, 3, 4];
console.log('array', array1);

console.log('includes')
var result = includes(array1, 5);
// console.log(result);
// console.log(array1);


//case no argument

try {
    includes();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "missing argument 0 when calling function includes");
}

// case not array

try {
    includes(array1);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "is not an array");
}

try {
    includes(1);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "1 is not an array");
}
