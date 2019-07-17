console.log("TEST forEach");

var array = ["a", "b", "c"];

var outputs = [];

forEach(array, function(element, index, array) {
  outputs.push([element, index, array]);
});

checkAndLogError(outputs, [
  ["a", 0, ["a", "b", "c"]],
  ["b", 1, ["a", "b", "c"]],
  ["c", 2, ["a", "b", "c"]]
]);

array = [1, 2, 3];

var result = 0;

try {
  forEach(array, function(value) {
    result += value;
  });
} catch (perico) {
  var a = 0;
}

checkAndLogError(result, 6);

// case: no arguments

try {
  forEach();
} catch (error) {
  checkAndLogError(error instanceof TypeError, true);
  checkAndLogError(
    error.message,
    "missing argument 0 when calling function forEach"
  );
}

// case: not an array

try {
  forEach();
} catch (error) {
  checkAndLogError(error instanceof TypeError, true);
  checkAndLogError(error.message, "1 is not an array");
}
