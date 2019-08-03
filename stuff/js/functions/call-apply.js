function sum(a, b) { return a + b; }

//sum(1, 2);
//sum.call(undefined, 1, 2);
//sum.apply(undefined, [1, 2]);
var nums = [1, 2];
sum.apply(undefined, nums);