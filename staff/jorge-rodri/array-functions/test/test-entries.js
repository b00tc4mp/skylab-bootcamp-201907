function check(expected,result){
    if(expected.toString()!==result.toString()){
        console.error(`El resultado esperado es ${expected} y el resultado es ${result}`);
    }
}
try{
    dEntries();
}catch(e){
    check(e instanceof ReferenceError, true);
    check(e.message, "No hay parametro");
}
try{
    dEntries(1);
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, "No es un array")
}