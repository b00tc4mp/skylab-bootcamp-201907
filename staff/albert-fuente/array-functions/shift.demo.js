
console.log("SHIFT DEMO");


var miPescado = ['ángel', 'payaso', 'mandarín', 'cirujano'];

console.log(miPescado," these are the initial elements");

console.log(shift(miPescado)," expected output is [payaso,mandarin,cirujano]");

var result=(shift(miPescado));
check(result, ["payaso", "mandarín","cirujano"]);






//
//
// console.log('miPescado antes: ' + miPescado);
// // "miPescado antes: ángel,payaso,mandarín,cirujano"
//
// var eliminado = miPescado.shift();
//
// console.log('miPescado después: ' + miPescado);
// // "miPescado after: payaso,mandarín,cirujano"
