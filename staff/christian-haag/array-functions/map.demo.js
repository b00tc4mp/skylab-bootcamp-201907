console.log("DEMO: map");

var array = [1, 2, 3, 4];
console.log("array", array);

coeficient = 2;

var result = map(array, function(value) {
  return value * coeficient;
});
console.log(result);
