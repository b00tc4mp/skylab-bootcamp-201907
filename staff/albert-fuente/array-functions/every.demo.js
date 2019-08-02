console.log("EVERY DEMO");

function biggerThan(currentValue){
    return currentValue>40;
}



var array1 = [1, 30, 39, 29, 10, 13];
console.log(array1, " initial values have to be less than 40");

var result=(every(array1,biggerThan));
check(result, false);



var array2 = [1, 30, 39, 2, 10, 45];
console.log(array2, " initial values have to be less than 40");

var result=(every(array2, biggerThan));
check(result,true);
