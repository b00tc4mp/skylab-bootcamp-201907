console.log("SLICE DEMO");

var nombres = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];

console.log(nombres," these are the initial values");

console.log(slice(nombres,1,3), " expected output [Pedro,Miguel]");  

var result=(slice(nombres,1,3));
check(result,["Pedro", "Miguel"]);


// var masculinos = nombres.slice(1, 3);

// masculinos contiene ['Pedro','Miguel']
