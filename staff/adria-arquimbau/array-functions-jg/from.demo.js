console.log("DEMO: from");

var array = ["ABCDE"];
console.log("array", array);

console.log("from");
var result = from(array);
console.log("var result = from(array)");
console.log("new Array:");
console.log(result, "expected: ['A','B','C','D','E']");
console.log("Old array:");
console.log(array, "expected: ['ABCDE']");
console.log("----------------------------------------");
