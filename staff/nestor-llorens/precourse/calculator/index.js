var operations = [0, 0, 0, 0];

function calculator (a, b) {
        if (arguments.length == 1 && typeof(a) == 'number') {
        console.log('La raiz cuadrada de ' + a + ' es ' + parseFloat(Math.sqrt(a).toFixed(3)) + '.');
        }
        else if (arguments.length > 2 || typeof(a) != 'number' || typeof(b) != 'number') {
            console.log('Introduza uno o dos números.');
        }
        else {
            operations[0] = a + b;
            operations[1] = a - b;
            operations[2] = a * b;
            operations[3] = a / b;
            console.log('La suma de los números es: ' + parseFloat(operations[0].toFixed(3)) + '.');
            console.log('La resta de los números es: ' + parseFloat(operations[1].toFixed(3)) + '.');
            console.log('La multiplicación de los números es: ' + parseFloat(operations[2].toFixed(3)) + '.');
            console.log('La division de los números es: ' + parseFloat(operations[3].toFixed(3)) + '.');
        }
}
calculator(4.5, 12);