/*Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, resta, multiplicación 
y división entre ambos números. El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). El programa debe contemplar 
e informar al usuario en el caso de que este introduzca cualquier cosa que no sean números.
Si el usuario introduce un solo número, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones 
de siempre.
Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.
// Output
results = [num1 + num2 = resultSum, num1 - num2 = resultRest, ...]*/

//Introducir un mensaje de bienvenida y explicativo de como se debe interactuar con CALCULATOR
alert ("WELCOME TO CALCULADORA");
alert ('In this App you should enter 2 numbers and it will return the sum, the subtract, the multiply and the division between the first number vs the second number. Thank you for use it!')
var num1 = parseFloat(prompt ("insert thefirst value"));
var num2 = parseFloat(prompt ("insert the second value"));


if (!num1 && !num2){
    alert ("should be a numeric value");
}
else if (!num1 && typeof num2 == 'number'){
    alert("se ha introducido solo el segundo valor, la raiz cuadrada de éste es: " + square(num2));
}
else if (!num2 && typeof num1 == 'number'){
    alert("se ha introducido un solo el primer valor, la raiz cuadrada de éste es: " + square(num1));
}
else{if (typeof num1 == 'number' && typeof num2=='number'){ //if both parameters are numbers
    var getResultSuma = Math.round((num1+num2)*1000)/1000
    var getResultResta = Math.round((num1-num2)*1000)/1000 
    var getResultMult = Math.round((num1*num2)*1000)/1000
    var getResultDiv = Math.round((num1/num2)*1000)/1000
    
    var resultOperations =[getResultSuma,getResultResta,getResultMult,getResultDiv];
    var symbols = [' + ',' - ',' * ',' / ']
    var results = []
        for (var i = 0; i<4; i++){
            (results[i] = ' '+num1+symbols[i]+num2+' = '+resultOperations[i]+' ');
        }    
    }
}
alert (results);
    
    function suma (){
        return num1 + num2; //n=Math.parseFloat.toFixed(2)
        //    return resultSuma = Math.toFixed(2)(num1, num2)
    }
    function resta (){
        return num1 - num2;
    }
    function multiplica (){
        return num1 * num2;
    }
    function divide (){
        return num1 / num2;
    }
    function square (n){
        return n *= n
    }
