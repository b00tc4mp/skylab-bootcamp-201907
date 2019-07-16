console.log("COPYWITHIN DEMO");


var array1 = ['a', 'b', 'c', 'd', 'e'];
console.log(array1, " values of array1");
console.log(copyWithin(array1, 0,3,4), " expected [d,b,c,d,e]");
console.log(copyWithin(array1, 2,3,4), " expected [d,b,d,d,e]");
