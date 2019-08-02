/**
 * Checks wether a testing result matches an expected value.
 * In case of matching values, it does nothing. Otherwise shows an error explaining the unmatching situation.
 * 
 * 
 * @param {*} result The testing value to evaluate 
 * @param {*} expected The expected value to check the result against.
 * 
 * @version 3.0.0
 *  
 */



function check(result,expected){
    if(result!==expected){
        console.error("ERROR not expected values "+ expected);
    }else{
        console.log('%c a CORRECT', 'background: green; color: white; display: block;', expected)
    }
}
