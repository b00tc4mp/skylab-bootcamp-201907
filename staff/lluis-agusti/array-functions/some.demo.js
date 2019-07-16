console.log('DEMO: some');

var array = [1, 2, 3, 4, 5];

var even = function(element) {
  return element % 2 === 0;
};

var result = array.some(even);
console.log("Expected: true -> Result: " + result);