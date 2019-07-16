var operations = [];
var results = [];

calculator(prompt('Inserta tus números, sepáralos con comas'));


//función calculadora utilizando .reduce
function calculator(){
  var userNumbers = [...arguments].join().split(',').map(x => Number(x));
  if (arguments[0] == ""){
    console.log('Debes insertar al menos un número');
  } else if (isNaN(userNumbers[0])){
    console.log('El dato ingresado no es un número')
  } else if (userNumbers.length === 1){
    console.log(`La raíz cuadrada de ${userNumbers[0]} es ${Math.sqrt(userNumbers[0]).toFixed(3)}`);
  } else {
    var suma = (accumulator, currentValue) => accumulator + currentValue;
    var resta = (accumulator, currentValue) => accumulator - currentValue;
    var multi = (accumulator, currentValue) => accumulator * currentValue;
    var divi = (accumulator, currentValue) => accumulator / currentValue;
    results.push(parseFloat(userNumbers.reduce(suma).toFixed(3)), parseFloat(userNumbers.reduce(resta).toFixed(3)), parseFloat(userNumbers.reduce(multi).toFixed(3)), parseFloat(userNumbers.reduce(divi).toFixed(3)));
    printNumbers(userNumbers);
  };
  oneMore();
};

//función para mostrar operaciones por consola... la hice aparte para no mezclar tareas (y para entender mejor arguments :P).
function printNumbers(){
  var args = [...arguments].join().split(',').map(x => Number(x));
  var addPrint = ['Suma: ', args[0]];
  var restPrint = ['Resta: ', args[0]];
  var multiPrint = ['Multiplicación: ', args[0]];
  var diviPrint = ['División: ', args[0]];
  for (var i = 1; i < args.length; i++){
    addPrint.push(' + ' + args[i]);
    restPrint.push(' - ' + args[i]);
    multiPrint.push(' x ' + args[i]);
    diviPrint.push(' % ' + args[i]);
  };
  operations.push(addPrint.join(''), restPrint.join(''), multiPrint.join(''), diviPrint.join(''))
  for (var i = 0; i < operations.length; i++){
    console.log(operations[i] + ' = ' + results[i]);
  };
};

function oneMore() {
  var response = confirm('¿Deseas seguir calculando?');
  if (response === true){
    calculator(prompt('Entonces inserta más números, separados por comas'));
  } else {
    console.log('¡Hasta pronto!');
  };
};