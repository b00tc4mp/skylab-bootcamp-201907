console.log("DEMO: map");

var array = [1, 2, 3];

var coeficient = 10;

var result = map(array, function(value) {
  return value * coeficient;
});

console.log(result);

var arrayTwo = ["1", "2", "3"];

var resultTwo = map(arrayTwo, function(value) {
  return "<" + value + ">";
});

console.log(resultTwo);

var arrayThree = [1, 2, 3];

var resultThree = map(arrayThree, function(value, index, array) {
  return value + "-" + index + "-" + array;
});

console.log(resultThree);
