function check(result, expected){
    if(expected.toString()!==result.toString()) console.log("error: result is incorrect");
}
try{
    dFill()
}catch(e){
    check(e instanceof ReferenceError, true);
    check(e.message, "Faltan parametros.")
}
try{
    dFill("a","a","a",[]);
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, "Parametro 'start' o 'end' no es un número.");
}
try{
    dFill(4, 5, 5, 5)
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, "No es un array.");
}