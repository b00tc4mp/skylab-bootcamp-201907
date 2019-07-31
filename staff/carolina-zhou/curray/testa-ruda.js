'use strict';

var text = '>>> TESTA 🧠 RUDA 💪 <<<';

console.log(text);

/**
 * Checks wether a testing result matches an expected value. In case of matching values, 
 * it does nothing. Otherwise shows an error explaining the unmatching situation.
 * 
 * * Checks wether a testing array matches an expected array by:
 * - checking that the testing result and expected result are arrays.
 * - checking that both their lengths are equal.
 * - comparing all the array's elements one by one.
 * If an element is a nested array it goes through the comparation process again.
 * If an element is an object it checks the type of the testing result and the type of the exepected result and compares
 * their properties using Object.keys.
 * 
 * @param {*} result The testing value to evalute.
 * @param {*} expected The expected value to check the result against.
 * 
 * @version 6.0.0
 */
function expect(result, expected) {
    if (result instanceof Array && expected instanceof Array) {
        expect(result.length === expected.length, true);

        for (var i = 0; i < result.length; i++) {
            var res = result[i], exp = expected[i];

            if (res instanceof Array) {
                expect(res, exp);
            } else if (res instanceof Object) {
                expect(typeof res, typeof exp);
                expect(Object.keys(res), Object.keys(exp));
            } else expect(res, exp);
        }
    } else
        // if (!(isNaN(result) && isNaN(expected)) && result !== expected) // FUCK! isNaN({}) returns true!!!
        if (!(result != undefined && expected != undefined && result.toString() === 'NaN' && expected.toString() === 'NaN') && result !== expected) // LLUIS we👂u!
            // if (!(Number.isNaN(result) && Number.isNaN(expected)) && result !== expected) // ROGER 💪 => ERROR! Lluis detected Number.isNaN is ES6
            //console.error('error: result (' + result + ') does not match expected value (' + expected + ')')
            throw Error('result (' + result + ') does not match expected value (' + expected + ')');
}

/**
 * TODO
 * 
 * @param {*} description 
 * @param {*} expression 
 * @param {*} handleError 
 */
function convertToArrays(object) {
    var realrray = (Object.values(object));
    realrray.pop();
    return realrray;
}

/**
 * Tests wether a function works. If everything's correct, it gives a thumbs up; if there's an error, it shows a message describing the error.
 * It also contemplates cases in which an error is expected but didn't happen.
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
 * Comprises all the testing functions.
 * 
 * @param {string} description
 * @param {Function} expression 
 */
function describe(description, expression) {
    console.log(description, '🍭');

    expression();
}