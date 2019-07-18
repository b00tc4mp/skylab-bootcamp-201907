console.log("DEMO POP");


var array=[1,2,3];

console.log("value ", array);

var result=pop(array);
console.log(result, " expected 3"); //expected 3
console.log(array, "expected [1,2]"); //expected: [1,2]

result=pop(array);

console.log(result, " expected 2"); //expected 2
console.log(array, "expected [1]"); //expected: [1]

// case: no arguments

/* try {
    pop();
} catch(error) {
    console.log(error)
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument 0 when calling function forEach');

}
 */
// case: not an array

try {
    forEach("W");
} catch(error) {
    check(error.message, '1 is not an array');
}