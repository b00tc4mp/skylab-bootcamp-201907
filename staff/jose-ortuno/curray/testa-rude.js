'use strict';

var text = '>>> TESTA 🧠 RUDA 💪 <<<';

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
 * @version 5.0.0
 */
function expect(result, expected) {
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
function expectArrays(result, expected) {
    expect(result instanceof Array, true);
    expect(expected instanceof Array, true);

    expect(result.length === expected.length, true);

    for (var i = 0; i < result.length; i++) {
        var res = result[i], exp = expected[i];

        if (res instanceof Array) {
            expectArrays(res, exp);
        } else if (res instanceof Object) {
            expect(typeof res, typeof exp);
            expectArrays(Object.keys(res), Object.keys(exp));
        } else expect(res, exp);
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
function it(description, expression, handleError) {
    try {
        expression();

        if (handleError) __fail__("expected an error, but didn't happen");
        else __success__(description);
    } catch (error) {
        if (handleError)
            try {
                handleError(error);

                __success__(description);
            } catch (error) {
                __fail__(description, error);
            }
        else __fail__(description, error);
    }
}

/**
 * TODO
 * 
 * @param {String} description 
 */
function __success__(description) {
    console.log('%c' + description + ' 👍', 'color: green');
}

/**
 * TODO
 * 
 * @param {String} description 
 * @param {*} error 
 */
function __fail__(description, error) {
    console.error(description, '👹', error ? error : '');
}

/**
 * Opening function. Through it we execute the test.
 * 
 * @param {string} description Function name
 * @param {Function} expression Test code
 */
function describe(description, expression) {
    console.log('TEST', description, '🍭');

    expression();
}