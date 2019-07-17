/**
 * Checks wether a testing result matches an expected value.
 * In case of matching values it does nothing, otherwise shows an error
 * explaining the unmatched result.
 * 
 * @param {*} result The tested value to evaluate.
 * @param {*} expected The expected value to check the result against.
 * 
 * @version 3.0.0
 */


function check(result, expected) {
    if (result.toString() !== expected.toString()) console.error('error: result does not match expected value')
}