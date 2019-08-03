// demo 0

// es5
var array = [1, 2, 3];
array.forEach(function(value) { console.log(value); });

// es6
const array = [1, 2, 3]
array.forEach(value => console.log(value))

// demo 1

// es5
var array = [1, 2, 3];
array.forEach(function(value, index) { console.log(value, index); });

// es6
const array = [1, 2, 3]
array.forEach((value, index) => console.log(value, index))

// demo 2

// es5
var array = [1, 2, 3];
array.forEach(function(value, index) { 
	console.log(value); 
	console.log(index);
});

// es6
const array = [1, 2, 3]
array.forEach((value, index) => {
	console.log(value)
	console.log(index)
})

