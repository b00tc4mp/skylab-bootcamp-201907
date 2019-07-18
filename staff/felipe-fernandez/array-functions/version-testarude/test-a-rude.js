 'use strict'; 

var text = '>>> TEST A RUDE 💪 <<<';

console.log(text);

/**
 * Checks wether a testing result matches an expected value. In case of matching values, 
 * it does nothing. Otherwise shows an error explaining the unmatching situation.
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
 * TODO
 * 
 * @param {Array} result 
 * @param {Array} expected 
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
 * TODO
 * 
 * @param {string} description
 * @param {Function} expression 
 * @param {Function} handleError 
 */
function test(description, expression, handleError) {
    try {
        expression();
        //When there is an error but doesn't reach the catch. It should be handled here
        //An example of that is when you forgot a throw in a function or you don't put a correct trhow
        
        if (handleError) console.error('CASE', description, '👹', "expected an error, but didn't happen");
        else console.log('CASE', description, '👍');
    } catch (error) {
        //This part handles uncontrolled erros
        //If the error is controlled, it jumps to the "else" part
        if (handleError)
            try {
                handleError(error);

                console.log('CASE', description, '👍');
            } catch (error) {
                console.error('CASE', description, '👹', error);
            }
        else console.error('CASE', description, '👹', error);
    }
}

/**
 * TODO
 * 
 * @param {string} description
 * @param {Function} expression 
 */
function suite(description, expression) {
    console.log('TEST', description, '🍭');

    expression();
}