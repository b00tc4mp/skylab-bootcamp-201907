// Array que va guardando los resultados de las operaciones
const results = [];
// Variable contador de usos
let count = 0;

function calculator() {
  // Array que almacena los valores de arguments
  const arr = []
  // Loop que recorre arguments y añade cada valor al array 'arr' para operar
  for (var i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  };

  // recorre 'arr' comprobando que todos sus elementos son números
  for (var h = 0; h < arr.length; h++) {
    if (isNaN(arr[h])) {
      console.log('You must enter only numbers');
	    return question();
    }
  }	

  // comprueba si solo hay un elemento en 'arr' y de ser así calcula raiz cuadrada
 if (arr.length == 1) {
    results.push(`sqrt_${[count]}: ${+(Math.sqrt(arr[0])).toFixed(3)})`);
    count++;
  
  } else {
  // .reduce() de cada operación que guarda los resultados en 'results' y lleva la cuenta de 'count'
  results.push(`add_${[count]}: ${+arr.reduce( (a,b) => a + b).toFixed(3)}`);
  results.push(`sub_${[count]}: ${+arr.reduce( (a,b) => a - b).toFixed(3)}`);
  results.push(`mul_${[count]}: ${+arr.reduce( (a,b) => a * b).toFixed(3)}`);
  results.push(`div_${[count]}: ${+arr.reduce( (a,b) => a / b).toFixed(3)}`);
  // otra manera de redondear a tres decimales con Math.round();
  // results.push(`add_${[count]}: ${Math.round(arr.reduce( (a,b) => a + b) * 1000) / 1000}`);
 count++;
}

console.log(results);
question()

}

calculator(2,4);

// prompt basado en la calculadora pro del compañero Christian Haag, tweakeado para aceptar decimales
function question() {
  
  let ask = prompt("Would you like to calculate again? y/n");
    
    if (ask === "y"){
        getNums();     
     } else {
       console.log("Bye!");
		return
     }
  };

  function getNums() {
  
    let userNumber = prompt('Enter your numbers separated by commas.');
          // creamos un array con .map() en el que coge el string del prompt, lo separa en cada coma y convierte cada partición a Number
          var array = userNumber.replace(/, +/g, ",").split(",").map(Number);
          // pasamos como argumento cada elemento de "array" a la función calculator()
          calculator.apply(this, array);
    };