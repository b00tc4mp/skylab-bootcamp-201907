
var array = ["1", "2", "3", "4"];
var depot = "";
var result = "";



function join(array) {
for (var i = 0; i < array.length; i++) {
  depot += "cosa"
  for (var j = 0; j < array[i].length; j++) {
    depot += array[i][j];
  }
  result = depot;
}
}
console.log('Function expected: ' + result);
console.log('Function result: ' + result);





var allArray = [1, 2, 3, 4, 5];
var x = 1;

function includes(x) {

    for (var i = 0, i <= allArray.length-1, i++) {
        if (allArray[i] == x) {
            console.log("true");
        } else {
            console.log("false");
        }
    }
} includes();


for (j = 0, j < allArray.length, j++) {
    if (allArray[i] == x) {
        console.log("true");
    } else {
        console.log("false");
    }
}