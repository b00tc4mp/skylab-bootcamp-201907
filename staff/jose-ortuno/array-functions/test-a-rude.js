'use strict';

var text = '>>> TEST A RUDE 💪 <<<';

console.log(text);

/**
 * Checks whether a testing result matches an expected value. 
 * In case of matching values, it does nothing. 
 * Otherwise shows an error explaining the unmatching situation.
 * 
 * IMPORTANTE: El resul y el expected, no lo pasa a string
 * 
 * @param {*} result The testing value to evalute.
 * @param {*} expected The expected value to check the result against.
 * 
 * @version 4.0.0
 */
function check(result, expected) {
    // if (!(isNaN(result) && isNaN(expected)) && result !== expected) // FUCK! isNaN({}) returns true!!!
    if (!(result != undefined && expected != undefined && result.toString() === 'NaN' && expected.toString() === 'NaN') && result !== expected) // LLUIS we👂u!
        // if (!(Number.isNaN(result) && Number.isNaN(expected)) && result !== expected) // ROGER 💪 => ERROR! Lluis detected Number.isNaN is ES6
        //console.error('error: result (' + result + ') does not match expected value (' + expected + ')')
        throw Error('result (' + result + ') does not match expected value (' + expected + ')');
}

/**
 * Evolution of the check function. 
 * Test objects and arrays.
 * 
 * @param {*} result 
 * @param {*} expected 
 */
function checkArrays(result, expected) {
    check(result instanceof Array, true);
    check(expected instanceof Array, true);

    check(result.length === expected.length, true);

    for (var i = 0; i < result.length; i++) {
        var res = result[i], exp = expected[i];

        if (res instanceof Array) {
            checkArrays(res, exp);
        } else if (res instanceof Object) {
            check(typeof res, typeof exp);
            checkArrays(Object.keys(res), Object.keys(exp));
        } else check(res, exp);
    }
}

/**
 * First step of testing. We pass a function as an expression that contains:
 * (1) The execution of the function to be tested
 * (2) The expected result
 * 
 * We are controlling:
 * (1) The correct execution of the errors
 * (2) The controlled execution of the function
 * 
 * @param {string} description Descripción to test
 * @param {Function} expression Function test and expected results
 * @param {Function} handleError Error checking 
 */
function test(description, expression, handleError) {
    try {
        expression();
        // Cuando no detecta un error en la expression. 
        if (handleError) console.error('CASE', description, '👹', "expected an error, but didn't happen");
        else console.log('CASE', description, '👍');

    } catch (error) {
        if (handleError) // Error controlado
            try {
                handleError(error);
                // Error controlado error
                console.log('CASE', description, '👍');
            } catch (error) {
                console.error('CASE', description, '👹', error);
                // Error controlado no correcto
            }
        else console.error('CASE', description, '👹', error);
        // Detecta el error no controlado 'Uncatch'
    }
}

/**
 * Opening function. Through it we execute the test.
 * 
 * @param {string} description Function name
 * @param {Function} expression Test code
 */
function suite(description, expression) {
    console.log('TEST', description, '🍭');

    expression();
}