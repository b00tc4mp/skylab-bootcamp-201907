console.log("ARRAY.ISARRAY DEMO");

var array=[1,2,3];
console.log(array);
var result=isArray(array);
check(result,true);

/*Test con variable declarada y no definida*/
var x
try{
    isArray(x)
}catch(error){
    check(error.message, 'FALTA VARIABLE');


}


