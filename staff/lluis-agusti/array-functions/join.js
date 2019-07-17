var array = ["1", "2", "3", "4"];
var depot = [];
var result = "";

for (var i = 0; i < array.length; i++) {
  depot += "-"
  for (var j = 0; j < array[i].length; j++) {
    depot += array[i][j];
  }
  result = depot;
}

console.log("Initial Array: 1-2-3-4");
console.log("Expected String: 1-2-3-4");
console.log("Result " + result);
console.log("typeof Initial Array: " + typeof(array));
console.log("typeof Result: " + typeof(result));



// provvar de fer-lo amb u pif al principi que miri el length