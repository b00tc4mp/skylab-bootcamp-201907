console.log('DEMO: includes');


var array1 = [1, 2, 3];

var result = array1.includes(2);
console.log("Expected: true -> Result: " + result);

var result2 = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat'));
console.log("Expected: true -> Result: " + result2);

var result3 = ['cat', 'dog', 'bat'];
console.log(pets.includes('at'));
console.log("Expected: false -> Result: " + result3);