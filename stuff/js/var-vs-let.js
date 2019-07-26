// demo 0

// var

//for (var i = 0; i < 3; i++) console.log(i);
// SAME as
var i;
for (i = 0; i < 3; i++) console.log(i);

console.log(i);

// let

for (let i = 0; i < 3; i++) console.log(i);
// NOT SAME as
//let i;
//for (i = 0; i < 3; i++) console.log(i);

console.log(i); // ReferenceError


// demo 1

// var
{
	var i = 10;
	console.log(i);
}

console.log(i);

// let
{
	let i = 10;
	console.log(i);
}

console.log(i); // ReferenceError

// const
{
	const i = 10;
	console.log(i);
}

console.log(i); // ReferenceError
