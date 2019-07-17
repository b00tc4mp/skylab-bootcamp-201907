console.log("TEST from");

var array = ["ABCDE"];

var result = from(array);
check(result, ['A','B','C','D','E']);
check(array, ['ABCDE']);

// case: no arguments
try {
    from();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument when calling function from');
}