function check(expected,result){
    if(expected.toString()!==result.toString()){
        console.error(`El resultado esperado es ${expected} y el resultado es ${result}`);
    }
}    
try{
    copyWhitinD();
}catch(e){
    check(e instanceof ReferenceError, true);
    check(e.message, "Missing params.")
}
try{
    copyWhitinD(0,1,2,3);
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, "The type of param arr is not Array");
}
try{
    copyWhitinD("a",[2],"b",[1]);
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, "'start' or 'end' are not params.")
}