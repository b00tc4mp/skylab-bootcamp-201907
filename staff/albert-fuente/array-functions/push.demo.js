console.log("DEMO PUSH");

var array=[1,2,3];

console.log("value ", array);


var result=push(array,"a");
check(result,4);


console.log(result, " expected:4"); //expected: 4
console.log(array, " expected[1,2,3,'a']"); //expected: [1,2,3,"a"]


// case: no arguments
try{
    push();
}catch(error){
    console.log(error);
    check(error instanceof TypeError, true);
}

// case: not an array

/* try {
    push(1);
} catch(error) {
    console.log(error)
     check(error instanceof TypeError, true);

     check(error.message, '1 is not an array');
 } */