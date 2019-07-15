// Calculator

/* Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, resta, multiplicación y división 
entre ambos números. El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). El programa debe contemplar e informar al usuario 
en el caso de que  este introduzca cualquier cosa que no sean números.
Si el usuario introduce un solo número, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.
// Output
results = [num1 + num2 = resultSum, num1 - num2 = resultRest, ...]
 
 
 
 
PRO
Podrías hacer que le calculadora realizara operaciones sean cuales sean el número de argumentos pasados a la función?
Arguments MDN Reference
function sum() {
    var acc = 0;

    for (num in arguments) {
        console.log(num);

        acc += arguments[num];
    }

    return acc;
}

sum(2, 3, 4); // acc = 9
Después de hacer todas las operaciones, el programa deberá preguntar al usuario si desea volver a realizar otra operación, volviendo a almacenar más resultados y mostrándolos.
calculator(n1,n2);

//Output => sum, subs, mult, div...
prompt("New numbers? y/n")
    Case "y" => calculator(n1,n2)
                //Output => sum1, subs1, mult1, div1, sum2, subs2, mult2, div2...
    Case "n" => "Bye!"

*/



function calculator (num1,num2){
   
    if (arguments.length === 1){
      var arr1 = []
      var resultSquare = +((num1 * num1).toFixed(3))
      var sumSquare = arr1.push(resultSquare);
      return arr1;
    }
    else if ( isNaN(num1) || isNaN(num2)) {
        return 'Please use numbers only';

    }
    else{
      var arr2 = [];
  
      var resultSum = +((num1 + num2).toFixed(3));
      var resultRest = +((num1 - num2).toFixed(3));
      var resultMultip = +((num1 * num2).toFixed(3));
      var resultDiv = +((num1 / num2).toFixed(3));
      var sum = arr2.push(`${num1} + ${num2} = ${resultSum} , ${num1} - ${num2} = ${resultRest} , ${num1} x ${num2} = ${resultMultip} , ${num1} % ${num2} = ${resultDiv}`)
      return arr2 
    }
  
} console.log(calculator(7,10))


