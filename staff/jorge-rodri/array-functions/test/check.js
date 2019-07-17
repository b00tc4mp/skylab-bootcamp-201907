/**
 * 
 * @param {*} expected The expected value to check the result agains.
 * @param {*} result The testing value to evaluate.
 */
function check(expected,result){
    if(expected.toString()!==result.toString()){
        console.error(`El resultado esperado es ${expected} y el resultado es ${result}`);
    }
}