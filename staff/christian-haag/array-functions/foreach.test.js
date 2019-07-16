console.log("TEST: forEach");

var array = ["a", "b", "c"];

check(result);

var outputs = [];

forEach(array, function(element, index, array) {
  console.log(element, index, array);
  outputs.push(element, index, array);
});

check(
  outputs,
  ["a", 0, ["a", "b", "c"]],
  ["b", 1, ["a", "b", "c"]],
  ["c", 2, ["a", "b", "c"]]
);
