function check(expected,result){
    if(expected.toString()!==result.toString()){
        console.error(`El resultado esperado es ${expected} y el resultado es ${result}`);
    }
}
try{
    concatD(undefined,undefined);
} catch(error){
    check(error instanceof ReferenceError, true);
    check(error.message, "Not param in the function")
}
try{
    concatD(4,[0])
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, "First param is not Array");
}
try{
   concatD([0],a) 
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, "Second param is not Array")
}