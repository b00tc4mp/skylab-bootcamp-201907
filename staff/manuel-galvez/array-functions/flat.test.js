console.log('TEST flat');
var array = [1,2,3, ['a', 'b', 'c', [true, false]]];

// Case: Default
var result = flat(array);
console.log(result)
check(result, [1,2,3,'a', 'b', 'c', [true, false]])

// Case: No array
/* try {
    debugger;
    flat(array);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'undefined is not an array')
}
 */







