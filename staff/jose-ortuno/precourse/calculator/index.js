// Proyecto 1 - Calculadora
// Saludo inicial
console.log('Hola, aquí te mostraré las operaciones completas y la ARRAY de todas ellas:');

function calc (num1, num2) {
    // Comprobamos que los inputs estén completos y sean números. Si es así realizamos el cálculo.
    if (typeof(num1) == 'string' || typeof(num2) == 'string') {
        // Si uno de los dos parámetros no es un número:
        console.log('¡ATENCIÓN! Uno o varios de los elementos introducidos no es un número. ¡Intentalo de nuevo!');
    } else if (num1 == undefined && num2 == undefined) {
        // Si no introduces nada:
        console.log('Tienes que introducir un valor para que la calculadora pueda hacer una operación');
    } else if (num2 == undefined) {
        // Si se introduce un valor:
        // Realizamos la raíz cuadrada de dicho valor
        var num1SquareRoot = Math.sqrt(num1);
        // Reducir decimales a 3 la raíz cuadrada. Hay que volverlo a convertir en número, ya qie toFixed lo pasa a string.
        var num1SquareRoot3 = Number(num1SquareRoot.toFixed(3));  
        // Imprimir en consola
        console.log('Para que las operacionés se realicen tienes que introducir un segundo número separado por una coma. Mientras tanto, aquí tienes la raíz cuadrada de ' + num1 + ' ' + '=' + ' ' + num1SquareRoot3);
    } else {
        // Si se introducen los dos parámetros:
        // Operaciones a realizar:
        var getResultsSum = num1 + num2;
        var getResultsSub = num1 - num2;
        var getResultsDiv = num1 / num2;
        var getResultsMult = num1 * num2;

        // Guardamos los resultados en un array para poder imprimirlos a través de un for:
        var getResults = [getResultsSum, getResultsSub, getResultsDiv, getResultsMult];

        // Arrays para enriquecer la información mostrada en cosola de las operaciones:
        var operationInfo = ['Sumando:', 'Restando:', 'Dividiendo:', 'Multiplicando:'];
        var operationSimbol = ['+', '-', '/', '*'];

        // Guardamos los resultados covertidos a tres decimales
        var getResults3 = [];
        // Si los inputs están completos
        for (var i = 0; i < getResults.length; i++) {
            // Reducir decimales a 3. Hay que volverlo a convertir en número, ya qie toFixed lo pasa a string:
            getResults3[i] = Number(getResults[i].toFixed(3));

            // Impresión en consola
            console.log(operationInfo[i] + ' ' + num1 + ' ' + operationSimbol[i] + ' ' + num2 + ' ' + '=' + ' ' + getResults3[i]);
        }

        // Guardar resultados en un ARRAY y luego imprimirlos en Consola de forma amigable:
        var resultsArr = [];
        for (var i = 0; i < getResults.length; i++) {
            resultsArr[i] = ' ' + num1 + ' ' + operationSimbol[i] + ' ' + num2 + ' ' + '=' + ' ' + getResults3[i];
        }
        console.log('results = [' + resultsArr + ']');
    }
    console.log('¿Qué deseas hacer ahora?');
}