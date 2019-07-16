// Proyecto 1 PRO 4 - Calculadora - Multi Arguments
/*
PRO 1:
 - Dividimos la validación en dos partes:
   Primero: Nos revisa valor por valor para que cumpla el cometido
   Segundo: Una vez comprovado, realiza la operación
 - La operaciónes las hacemos con la función 'reduce()', esta manera podemos restar, dividir y multiplicar sin errores.
 - Iteramos los argumentos para introducir el símbolo en cuestión y recrear las operaciones en cosola

 PRO 2:
 - Para realizar el registro, creamos una variable de ámbito global y utilizamos el método 'push()' para almacenar los elementos resultantes de la 'array'.
 - Damos un mensaje de bienvenida. Lo ponemos antes de llamar a la función, para cuando tengamos que reuniciarla no nos lo muestre de nuevo.
 - Variamos las validaciones respecto al PRO1, ya que los valor a introducir con 'prompt()' los almacena en primera instancia como 'string'. Las validaciones se basan en:
    - Que no dejen espacios en blanco entre números o simplemente espacios en blanco sin más.  
    - Que no clicken al botón 'cancel'
    - Que sólo introduzcan números
    - Por último, que cuando el usuario lo desee, la calculadora realice las operaciones.
 - Gracias al método 'push()', almacenamos los valores introducidos para luego realizar las operaciones.  
*/

// Abrimos el console log:
console.log('Para iniciar la calculadora tienes que llamar a la función "start" a través de la consola. ¡Suerte!')

// Guardamos todas las operaciones realizadas en una variable Global, así nos queda como registro:
var record = [];

// Comenzamos saludando:
function start () {
    // Mensaje de bienvenida
    alert('Bienvenido a la calculadora.\nTe damos los resultados de la suma, resta, división y multiplicación de los números que introduzcas.\n¿Comenzamos?');
    // Ejecutamos la función:
    calc ();
}

// Variables necesarias para que el 'prompt()' funcione
var initial;
var str;
var strCaps;
var num;
var values = [];

// Variable de escapatoria:
var finish =  true;
var reFinish = true;

// ARRAY donde imprimeros los resultados al final del ejercicio:
var resultsArr = [];

function calc () {
    // Reseteamos este 'array' para que no nos cree problemas:
    resultsArr = [];
    values = [];
    // Loop para que el usuario pueda introducir todos los elementos que desee:
    for (var i = 0; i < 1000; i++) {
        // Ventana de introducción de valores numéricos:
        initial = (prompt('Introduce los números de uno a uno en el formato suiguiente:\n  - CORRECTO: 2 o 2.2\n  - INCORRECTO: G o "2" o 2-3 o 2,4.\nCuando hayas escrito el valor numérico correcto, pulsa ACEPTAR para guardarlo y vamos a por el siguiente.\n--> En el caso de haber introducido todos los valores numéricos a calcular, escribe "FIN" y pulsa ACEPTAR.\n--> Si quieres terminar con esto pulsa CANCELAR y nuestra relación terminará aquí, sin reproches y sin operaciones.'));
        // Hacemos una condicional previa por si el usuario clicka 'cancel'. Los hacemos con el valor sin tocar, ya que si le pasamos un método el null no lo soporta.
        if (initial == null) {
            // En el caso que el usuario pulse 'Cancelar' terminamos con el loop y nos vamos a la función theEnd():
            finish = false;
            i = 1000;
            theEnd ();
        } else {
            // Primero: Eliminamos espacios en blanco que puedan existir para aludir el NaN:
            str = initial.trim();
            if (str == '') {
                // En el caso que el usuario deje la casilla sin rellenar:
                alert('Tienes que introducir un valor numérico. No puedes dejar la casilla vacía. Inténtalo de nuevo, por favor.');
            } else {
                // En el caso de introducir bien los valores numéricos:
                // Segundo: Pasamos el 'string' a mayúsculas para la siguiente validación:
                strCaps = str.toUpperCase();
                // Cuando el usuario termine de introducir valores, escribe fin:
                if (strCaps == 'FIN') {
                    // El último valor no lo almacenamos en la 'array' para que no nos de un resultado que no queremos.
                    // Igualamos la 'i' a '1000' para que finalice el bucle y a por el siguiente paso
                    i = 1000;
                } else {
                    // y Tercero: En el caso de no cumplirse el paso anterior, el usuario cuando introduce un elemento a través de 'prompt' se almacena como un string, hay que convertirlo a números:
                    num = Number(str);
                    // Al convertirlo, todo elemento fuera de un número lo marcará como NaN, siendo esta nuestra última validación:
                    if (isNaN(num) == true) {
                        alert('¡OJO! El valor introducido no es un número');
                    } else {
                        // En el caso de estar todo correcto, almacenamos los números para realizar las futuras operaciones:
                        values.push(num);
                        finish = true;
                    }
                }
            }
        }
    }

    // Entradilla a los resultados:
    if (finish === true) {
        console.log('--> Vamos con los resultados:');
        verify ();
    }
}

// Gracias a 'push()' almacenamos todos los resultados en forma de registro:
var results = [];

// Verificamos que haya más de un valor introducido.
function verify () {
    if (values.length == 1) {
        // Si se introduce un valor, realizamos la raíz cuadrada de dicho valor:
        var squareRoot = Math.sqrt(values[0]);
        // Reducir los decimales a 3 del resultado de la raíz cuadrada. Hay que volverlo a convertir en número, ya que 'toFixed' lo pasa a 'string':
        var squareRoot3 = Number(squareRoot.toFixed(3));  
        // Una alerta si el usuario ha introducido sólo un valor numérico:
        console.log('Para que las operaciones se realicen tienes que introducir un segundo número. Mientras tanto, aquí tienes la raíz cuadrada del valor intruducido: ' + values[0] + ' ' + '=' + ' ' + squareRoot3 + ' ¡Gracias!');
        reFinish = false;
        theEnd ();
    } else {
        // Damos permiso para que siga hacia delante si hay más de un valor:
        reFinish = true;
        operations ();
    }
}

// Iniciamos la calculadora:
function operations () {
    // Operaciones: Utilizamos la función 'reduce' para que nos hagan las operaciones correctas:
    var getResultsSum = values.reduce(function(total, num){return total + num});
    var getResultsSub = values.reduce(function(total, num){return total - num});
    var getResultsDiv = values.reduce(function(total, num){return total / num});
    var getResultsMult = values.reduce(function(total, num){return total * num});

    // Guardamos los resultados en un array para poder imprimirlos a través de un for:
    var getResults = [getResultsSum, getResultsSub, getResultsDiv, getResultsMult];

    // Arrays para enriquecer la información mostrada en cosola de las operaciones:
    var operationInfo = ['Sumando:', 'Restando:', 'Dividiendo:', 'Multiplicando:'];
    var operationSimbol = ['+', '-', '/', '*'];

    // Si los inputs están completos, reducimos su resultado a 3 decimales, lo guardamos en un ARRAY y lo mostramos en consola
    var getResults3 = [];
    for (var i = 0; i < getResults.length; i++) {
        // Reducir decimales a 3. Hay que volverlo a convertir en número, ya qie toFixed lo pasa a string:
        getResults3[i] = Number(getResults[i].toFixed(3));

        // iteramos cada elemento de la 'array' 'values' para unirlos en una misma línea e intercalarle el símbolo de la operación. De esta manera podemos mostrarlo de forma amigable luego.
        var elements = '';
        for (j = 0; j < values.length; j++) {
            if (j !== values.length-1) {
                elements += values[j] + operationSimbol[i];
            } else {
                elements += values[j];
            }
        }
        // Impresión en consola. Utilizo el 'for' en 'operationInfo[]' aunque no le haya hecho un 'length' ya que tiene los mismos resultados que results. Crecen los dos exponencialmente.
        console.log(operationInfo[i] + ' ' + elements + '=' + getResults3[i]);

        // Asignamos los valores en una nueva ARRAY para imprimirla luego:
        resultsArr[i] =' ' + elements + '=' + getResults[i] + ' ';
    }
    // Mostramos los resultados de forma amigable con una alerta 
    results = '[' + resultsArr + ']'
    console.log('--> Ahora te muestro los resultados en forma de ARRAY:');
    console.log('results = ' + results);

    // Guardamos los resultados para tenerlos en el registro:
    record.push(results);

    // Mostramos el registro:
    if (reFinish === true) {
        console.log('--> Y por último, te muestro un registro de las operaciones que has realizado:')
        console.log('record = ' + record + ' ');
        theEnd ();
    }
}

// Función para terminar el programa
function theEnd () {
    if (finish) {
        console.log('¿Otro cálculo? Esta vez llama a la función "calc" y nos ahoramos la bienvenida.');
    } else {
        console.log('Parece que quieres terminar con esto. Si quieres hacer un cálculo llama a la función calc, en caso contrario: "Bueno, pues molt bé, pues adiós."')
    }
}