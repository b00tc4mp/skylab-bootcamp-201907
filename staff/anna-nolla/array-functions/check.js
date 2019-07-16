// per mirar on ha parat el codi en la consola.
//debugger;

// per mirar si funciona i ens dona el resultat correcte.
function check(result, expected){
    if (result.toString() !== expected.toString()){
        console.error("Result does not match");}

    else{ console.log(" ! ! correcto ! !")}    
};

//throw error (array + this is not an error);


/* try {
    "aqui posariem la funcio que volem q ens doni l'error"
}catch{ "misatge per alertar a lusuari de l'error"

}

throw Error ("el missatge d'error que vols q es llançi");

*/