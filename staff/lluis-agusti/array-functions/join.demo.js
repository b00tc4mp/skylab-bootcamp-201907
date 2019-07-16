
console.log('DEMO: join');

var array = ["uno", "dos", "tres", "cuatro"];
console.log("El array es: " + array);
console.log("array.join()");
var result = array.join();
console.log("Expected: 1,2,3,4 -> Result: " + result);


console.log("array.join(\'/\')");
var result = array.join("/");
console.log("Expected: 1/2/3/4 -> Result: " + result);


console.log("array.join(\'-\')");
var result = array.join("-");
console.log("Expected: 1-2-3-4 -> Result: " + result);


console.log("array.join(\'cosa\')");
var result = array.join("cosa");
console.log("Expected: 1cosa2cosa3cosa4 -> Result: " + result);