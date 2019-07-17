console.log('TEST keys');

var object = [5, 6, 7];
var newArray = [];

keys(object);
check(newArray, [0,1,2]);

// case: no arguments
try {
    keys();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument when calling function keys');
}