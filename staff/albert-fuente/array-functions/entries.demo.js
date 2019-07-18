console.log('TEST: entries method');

var array = ['a', 'b', 'c'];

var result = entries (1, array);

// Checkeamos que el resultado sea el esperado
check (result, ["0, a"]);

// case: no data
// try {
//     entries();
// } catch(error) {
//     check(error instanceof TypeError, true);
//     check(error.message, 'missing data. Instructions: entries (iterator array)');
// }

// case: missing Array
// try {
//     entries();
// } catch(error) {
//     check(error instanceof TypeError, true);
//     check(error.message, 'missing Array when calling function entries');
// }

// case: out of ranges
// try {
//     entries(100, array);
// } catch(error) {
//     check(error instanceof RangeError, true);
//     check(error.message, 'Iterator number: is higher than array length');
// }

// case: no Array
// try {
//     entries();
// } catch(error) {
//     check(error instanceof TypeError, true);
//     check(error.message, 'an argument is not array');
// }