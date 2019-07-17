console.log("TEST dFlat")

function check(result,expected){
    if(expected.toString()!==result.toString()){
        console.error(`El resultado esperado es ${expected} y el resultado es ${result}`);
    }
}

var array=[1,2,3,["a","b","c",[true,false]]];

//case default

var result=dFlat(array);
//check(result,[1,2,3,["a","b","c",[true,false]]]);
var expected=[]

//case depth 2

var result=dFlat(array,2);
check(result,[1,2,3,["a","b","c",[true,false]]]);

//case; no array

try{
    dFlat();
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, 'undefine is not an array');    
}
//case: string
try{
    dFlat('array');
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, 'array is not an array');    
}
//case: boolean
try{
    dFlat(true)
}catch(e){
    check(e instanceof TypeError, true);
    check(e.message, 'boolean is not an array');    
}