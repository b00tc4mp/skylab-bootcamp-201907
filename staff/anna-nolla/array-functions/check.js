// per mirar on ha parat el codi en la consola.
//debugger;

// per mirar si funciona i ens dona el resultat correcte.
function check(result, expected){
    /* if (!(isNaN(result) && isNaN(expected)) && result !== expected) */ 
    /* (!(result !== null && expected !== null && 
        result != undefined && expected != undefined && 
        result.toString() === "NaN" && expected.toString() === "NaN") &&
        result !== expected)*/
    if (!(result !== null && expected !== null && result != undefined && 
        expected != undefined && Number.isNaN(result) && 
        Number.isNaN(expected)) && result !== expected){

        //console.error("Result does not match");}
        throw Error("Result " + result + " does not match " + expected);}

    else{ console.log(" ! ! correcto ! !")}    
};


function checkArrays(result, expected){
    check(result instanceof Array, true);
    check(expected instanceof Array, true);
    
    check(result.length === expected.length, true);

    for ( i = 0; i < result.length; i++){
        var res = result[i];
        var exp = expected[i];

        if (res instanceof Array){
            checkArrays(res, exp);
        }
        else if (res instanceof Object){
            check(typeof res, typeof exp);
            checkArrays(Object.keys(res), Object.keys(exp));
        }
        else{check(res, exp);}
    }
}

/**
 * Checks wether a test result matches the expected value.
 * In case the values match, does nothing. 
 * Otherwise shows an error explaining the situation.
 * 
 * @param {*} result The testing value to evaluate.
 * @param {*} expected Expected value to check against the result.
 */


//throw error (array + this is not an error);


/* try {
    "aqui posariem la funcio que volem q ens doni l'error"
}catch{ "misatge per alertar a lusuari de l'error"

}

throw Error ("el missatge d'error que vols q es llançi");

*/

/**
 * To do
 * 
 * @param {string} description.
 * @param {function} expression:
 * @param {function} handleError:
 */

test (function(){ flat(argumant); });
test (flat, function(error){
    check(error instanceof TypeError, true);
    check(error.message, "undefined is not an array");
});


function test(description, expression, handleError){
    try{
        expression();
        if(handleError){console.error("Mank");}
        else(console.log(description + "! ! Correcto ! !"))
    } catch(error){
        if (handleError) {
            try{
                handleError(error);
            }catch{ console.error(description, error);}
            
            handleError(error);}
        else{ console.error(error);}
    }   
}
