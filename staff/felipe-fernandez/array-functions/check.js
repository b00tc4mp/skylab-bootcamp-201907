/**
 * 
 * @param {*} result 
 * @param {*} expected 
 * @throws {} error
 */


function check(result, expected) {
    if (result.toString() !== expected.toString()) console.error('error: result does not match expected value');
    /* console.error('error: result (' + result + ') does not match expected value (' + expected + ')'); */
}