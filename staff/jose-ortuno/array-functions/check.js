/**
 * Checks wether a testing result matches an expected value.
 * In case of matching values, it does nothing. Otherwise shows an error explaining the explaining te unmatching situation.
 * @param result - The value to value
 * @param expected - The expected value to check the result against.
 * 
 * @version 3.0.0
 */

 function check (result, expected) {
    if (result.toString() !== expected.toString()) {
        console.error('error: result (' + result + ') does not match expected value (' + expected + ')');
    };
}