// Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números. El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran).
// El programa debe contemplar y actuar correctamente, en el caso de que el usuario introduzca cualquier cosa que no sean números.
// Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
// Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.

//calculator function
let calculator = () => {
    var output;
    let value_n1 = document.getElementById('n1').value;
    let value_n2 = document.getElementById('n2').value;

    let check_n1 = checkNumber(value_n1);
    let check_n2 = checkNumber(value_n2);

    if(check_n1 === false && check_n2 === false){
        output = `These are not numbers. Try it again!`;
    }
    else if(check_n1 === false || check_n2 === false){
        if(check_n2===false){
            output = `The square root of ${check_n1} is ${squareRoot(check_n1)}.`;
        }else{
            output = `The square root of ${check_n2} is ${squareRoot(check_n2)}.`;
        }
    }
    else{
        let sum = check_n1 + check_n2;
        let dif = check_n1 - check_n2;
        let mult = check_n1 * check_n2;
        let div = (check_n1 / check_n2).toFixed(3);
        let lf = "<br/>";
        output = `Addition: ${check_n1} + ${check_n2} = ${sum}
                ${lf}
                Remains ${check_n1} - ${check_n2} = ${dif}
                ${lf}
                Multiplication: ${check_n1} * ${check_n2} = ${mult}
                ${lf}
                Division: ${check_n1} / ${check_n2} = ${div}`;
    };

    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML=output;
}

//aux calculator functions
let checkNumber = (number) => {
    let currentNumber = (isNaN(number) || number === '') ? false : parseInt(number);
    console.log(currentNumber);
    return currentNumber;
}

let squareRoot = (number) => {
    return Math.sqrt(number);
}

//reset function
let reset = () =>
{
    document.getElementById('n1').value = "";
    document.getElementById('n2').value = "";
    document.getElementById('output').innerHTML = "";
}