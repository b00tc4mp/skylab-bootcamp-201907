'use strict';

var text = '>>> TESTA 🧠 RUDA 💪 <<<';

console.log(text);

/**
 * Checks wether a testing result matches an expected value. In case of matching values, 
 * it does nothing. Otherwise shows an error explaining the unmatching situation.
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
 * TODO
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
 * TODO
 * 
 * @param {string} description
 * @param {Function} expression 
 * @param {Function} handleError 
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

function __success__(description) {
    console.log('%c' + description + ' 👍', 'color: green');
}

function __fail__(description, error) {
    console.error(description, '👹', error ? error : '');
}

/**
 * TODO
 * 
 * @param {string} description
 * @param {Function} expression 
 */
function describe(description, expression) {
    console.log(description, '🍭');

    expression();
}