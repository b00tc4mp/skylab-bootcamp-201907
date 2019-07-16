console.log("DEMO PUSH")

var array=[1,2,3];


var result=push(array,"c");

check(result, 4);
check(array, [1,2,3,'a']);

result=push(array, "b");
check(result,5);


