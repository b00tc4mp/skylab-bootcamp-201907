var string = ["ABCDE"];
console.log("array", string);

console.log("from");
var result = from(string);
console.log("var result = from(array)");
console.log("new Array:");
console.log(result, "expected: ['A','B','C','D','E']");
console.log("Old array:");
console.log(string, "expected: ['ABCDE']");
console.log("----------------------------------------");
