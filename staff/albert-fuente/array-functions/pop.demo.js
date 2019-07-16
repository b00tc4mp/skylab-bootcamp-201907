console.log("DEMO POP");


var array=[1,2,3];

console.log("value ", array);

var result=pop(array);
console.log(result, " expected 3"); //expected 3
console.log(array, "expected [1,2]"); //expected: [1,2]

result=pop(array);

console.log(result, " expected 2"); //expected 2
console.log(array, "expected [1]"); //expected: [1]
