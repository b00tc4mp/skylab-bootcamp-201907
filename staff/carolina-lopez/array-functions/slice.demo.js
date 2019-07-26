console.log("DEMO: slice");

var array = ["banana", "orange", "lemon", "cherry", "avocado", "apple"];
console.log("array", array);

console.log("slice");
result = slice(array, 1, 3);
console.log(result, "expected: [orange, lemon]");
console.log(array, "expected: ['banana', 'orange', 'lemon', 'cherry', 'avocado', 'apple']");

console.log("slice");
result = slice(array, 2);
console.log(result, "expected: ['lemon', 'cherry', 'avocado', 'apple']");
console.log(array, "expected: ['banana', 'orange', 'lemon', 'cherry', 'avocado', 'apple']");

console.log("slice");
result = slice(array, -3);
console.log(result, "expected: ['cherry', 'avocado', 'apple']");
console.log(array, "expected: ['banana', 'orange', 'lemon', 'cherry', 'avocado', 'apple']");