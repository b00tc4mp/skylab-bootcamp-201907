console.log("FILL DEMO");


var array1 = [1, 2, 3, 4];

console.log(array1, " these are the initial values");
// fill with 0 from position 2 until position 4
console.log(fill(array1,0, 2, 4), " expected [1,2,0,0]");
// expected output: [1, 2, 0, 0]


console.log("I need to add 5,1,4 the last 4 in order to work properly");
// fill with 5 from position 1
console.log(fill(array1,5, 1,4), " expected[1,5,5,5]");
// expected output: [1, 5, 5, 5]
