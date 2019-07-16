console.log("FILL DEMO");


var array1 = [1, 2, 3, 4];




console.log(array1, " these are the initial values");
// fill with 0 from position 2 until position 4

var result=(fill(array1,0, 2, 4));
check(result,[1, 2, 0, 0, 0])

var result=(fill(array1,5, 1,4));
check(result,[1, 5, 5, 5, 5])
