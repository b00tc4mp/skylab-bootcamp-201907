console.log("TEST: map");

var array = [1, 2, 3, 4];

cocient = 2;
var result = map(array, function(value) {
  return value * cocient;
});
check(result, [2, 4, 6, 8]);
