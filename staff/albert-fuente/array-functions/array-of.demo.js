console.log("ARRAY.OF DEMO");


var result= (arrayOf(1,2,3));
check(result,[1,2,3]);


var result=(arrayOf("a",2,"b"));
check(result,['a',2,'b']);

/*solo hay el caso en que la variable es declarada y no definida*/
var x;
try{
    arrayOf(x);
}catch(error){
    console.log(error);
}
