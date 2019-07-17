/**
 * Checks wether a testing results matches an expected value.
 * In case og matching values, it does nothing. Otherwise shows
 * an error explaining the unmatching situation
 * @param {*} expected The expected value to check the result agains.
 * @param {*} result The testing value to evaluate.
 * @version 2.0.0
 */
function check(expected,result){
    if(expected!==result){
        console.error(`El resultado esperado es ${expected} y el resultado es ${result}`);
    }
}
