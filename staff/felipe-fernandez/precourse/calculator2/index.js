var numberzeroButton = document.getElementById("numberzero");
var oneButton = document.getElementById("one");
var twoButton = document.getElementById("two");
var threeButton = document.getElementById("three");
var fourButton = document.getElementById("four");
var fiveButton = document.getElementById("five");
var sixButton = document.getElementById("six");
var sevenButton = document.getElementById("seven");
var eightButton = document.getElementById("eight");
var nineButton = document.getElementById("nine");
var datazerobig = document.getElementById("datazerobig");

var ac = document.getElementById("ac");
var undo = document.getElementById("undo");
var divide = document.getElementById("divide");
var multiply = document.getElementById("multiply");
var minus = document.getElementById("minus");
var plus = document.getElementById("plus");
var equal = document.getElementById("equal");
var coma = document.getElementById("coma");

var numberTotal='';


oneButton.addEventListener("click", functionNumber1);

function functionNumber1() {
   
    var number1='1';
    var node1 = document.createTextNode(number1);
    datazerobig.appendChild(node1);
    numberTotal += '1';
}

twoButton.addEventListener("click", functionNumber2);

function functionNumber2() {
   
    var number2=2;
    var node2 = document.createTextNode(number2);
    datazerobig.appendChild(node2);
    numberTotal += '2';
}

threeButton.addEventListener("click", functionNumber3);

function functionNumber3() {
   
    var number3=3;
    var node3 = document.createTextNode(number3);
    datazerobig.appendChild(node3);
    numberTotal += '3';
}

fourButton.addEventListener("click", functionNumber4);

function functionNumber4() {
   
    var number4=4;
    var node4 = document.createTextNode(number4);
    datazerobig.appendChild(node4);
    numberTotal += '4';
}

fiveButton.addEventListener("click", functionNumber5);

function functionNumber5() {
   
    var number5=5;
    var node5 = document.createTextNode(number5);
    datazerobig.appendChild(node5);
    numberTotal += '5';
}

sixButton.addEventListener("click", functionNumber6);
function functionNumber6() {
   
    var number6=6;
    var node6 = document.createTextNode(number6);
    datazerobig.appendChild(node6);
    numberTotal += '6';
}

sevenButton.addEventListener("click", functionNumber7);
function functionNumber7() {
   
    var number7=7;
    var node7 = document.createTextNode(number7);
    datazerobig.appendChild(node7);
    numberTotal += '7';
}

eightButton.addEventListener("click", functionNumber8);
function functionNumber8() {
   
    var number8=8;
    var node8 = document.createTextNode(number8);
    datazerobig.appendChild(node8);
    numberTotal += '8';
}

nineButton.addEventListener("click", functionNumber9);
function functionNumber9() {
   
    var number9=9;
    var node9 = document.createTextNode(number9);
    datazerobig.appendChild(node9);
    numberTotal += '9';
}

numberzeroButton.addEventListener("click", functionNumber0);
function functionNumber0() {
   
    var number0=0;
    var node0 = document.createTextNode(number0);
    datazerobig.appendChild(node0);
    numberTotal += '0';
}

//Borrar el marcador
ac.addEventListener("click", functionAc);
function functionAc() {

    divideDisplay=0;
    multiplyDisplay=0;
    sumDisplay=0;
    restDisplay=0;
    datazerobig.innerHTML='';
    numberTotal = '';
    total=0;
    numberComas=0;
    numberPoints=0;
}

//Quitar el último caracter del marcador

undo.addEventListener("click", functionUndo);
function functionUndo() {
   
    numberTotal=numberTotal.slice(0, -1);
    var actualNode = document.createTextNode(numberTotal);
    datazerobig.innerHTML='';
    datazerobig.appendChild(actualNode);
    //Cuando se borre un número con coma que se vuelva a poder poner coma
    if (!numberTotal.includes('.')){
        numberComas=0;
        numberPoints=0;
    }
}

//función coma
var numberComas=0;
var numberPoints=0;

coma.addEventListener("click", functionComa);
function functionComa() {
   
    var coma=',';
    lastCharacterComa=numberTotal.slice(-1);
    //que no se pueda añadir más de una coma (punto) seguidas
    if (lastCharacterComa=== '.'){
        return null;
    //compruebo que la variable numeroComas no sea mayor que uno. En tal caso no se puede añadir más comas
    } else if (numberComas>=1 || numberPoints>=1){
        return null;
    }
     else {
        var nodeComa = document.createTextNode(coma);
        datazerobig.appendChild(nodeComa);
        //le añado un punto al número total para las operaciones ya que con la coma no funciona
        //en la calculadora se sigue mostrando una coma
        numberTotal += '.';
    }
    numberComas++;
    numberPoints++;
    
}


//operaciones

//Función botón división
divide.addEventListener("click", functionDivide);

function functionDivide() {

    var divideSymbol='/';
    //pongo el número de comas a 0 para que no se pueda añadir más de una coma, por ejemplo, 4,3,4
    numberComas=0;
    numberPoints=0;
 
    //saco el último caracter del número introducido para saber si es un símbolo y así no permitir poner 
    //símbolos dos veces seguidas

    lastCharacter=numberTotal.slice(-1);
    
     if (lastCharacter=== '/' || lastCharacter=== '*' || lastCharacter=== '+' || lastCharacter=== '-' ){
       
    } 
    else  {
      
        var nodeDivide = document.createTextNode(divideSymbol);
        datazerobig.appendChild(nodeDivide);
        numberTotal += '/';
       }
    }


//Función botón multiplicación
multiply.addEventListener("click", functionMultiply);

function functionMultiply() {

    var multiplySymbol='*';
    //pongo el número de comas a 0 para que no se pueda añadir más de una coma, por ejemplo, 4,3,4
    numberComas=0;
    numberPoints=0;

    //saco el último caracter del número introducido para saber si es un símbolo y así no permitir poner 
    //símbolos dos veces seguidas
    lastCharacter=numberTotal.slice(-1);

    if (lastCharacter=== '/' || lastCharacter=== '*' || lastCharacter=== '+' || lastCharacter=== '-' ){
       
    }   
      else  {
        var nodeMultiply = document.createTextNode(multiplySymbol);
        datazerobig.appendChild(nodeMultiply);
        numberTotal += '*';
      }
}

//Función botón suma
plus.addEventListener("click", functionSum);

function functionSum() {
     
    var sumtSymbol='+';
    //pongo el número de comas a 0 para que no se pueda añadir más de una coma, por ejemplo, 4,3,4
    numberComas=0;
    numberPoints=0;
    
    //saco el último caracter del número introducido para saber si es un símbolo y así no permitir poner 
    //símbolos dos veces seguidas
    lastCharacter=numberTotal.slice(-1);
      
     if (lastCharacter=== '/' || lastCharacter=== '*' || lastCharacter=== '+' || lastCharacter=== '-' ){
        
    }   
    else  {
        
        var nodeSum= document.createTextNode(sumtSymbol);
        datazerobig.appendChild(nodeSum);
        numberTotal += '+';
        }
}


//Función botón resta
minus.addEventListener("click", functionRest);

function functionRest() {
   
    var restSymbol='-';
    //pongo el número de comas a 0 para que no se pueda añadir más de una coma, por ejemplo, 4,3,4
    numberComas=0;
    numberPoints=0;

    //saco el último caracter del número introducido para saber si es un símbolo y así no permitir poner 
    //símbolos dos veces seguidas
    lastCharacter=numberTotal.slice(-1);
    
     if (lastCharacter=== '/' || lastCharacter=== '*' || lastCharacter=== '+' || lastCharacter=== '-' ){
       
    }   
    else  {
        
        var nodeRest = document.createTextNode(restSymbol);
        datazerobig.appendChild(nodeRest);
        numberTotal += '-';
   }
}


//Función botón igual
equal.addEventListener("click", functionEqual);

function functionEqual() {

   //Si el último carácter antes de darle igual es un símbolo lo quito para poder hacer la operación
    var lastCharacterTotal=numberTotal.slice(-1);

    if (lastCharacterTotal=== '/' || lastCharacterTotal=== '*' || lastCharacterTotal=== '+' || lastCharacterTotal=== '-' ){
        numberTotal=numberTotal.slice(0, -1);
    }  
   
    //sacar todos los símbolos en otro para poder hacer varias operaciones
    //number es un array donde cada ítem del mismo es un número
    var numbers = numberTotal.match(/[0-9.]+/g).map(Number);
    //symbols es un array donde cada ítem del mismo es un símbolo
    var symbols = numberTotal.match(/[-/*+]/g);
    var total;
    
    //bucle para las operaciones
    //en la primera iteración se separa por símbolos y se añade a total la primera operación
    //a partir de la segunda operación se añade total como primer número a dividir, multiplicar, sumar o restar y 
    //después se sustituye el valor en total
    
    for (var i=0;i<numbers.length;i++){
   
         if (i===0){
            if (symbols[i]==='/'){
                //si existe un punto en el número introducido redondear a 3 decimales ya que el resultado será con decimales
                if (numberTotal.includes('.')){
                    total = numbers[i]/numbers[i+1];
                    //si la operación acaba en 0 vaciar numberTotal para poder seguir haciendo operaciones con el 0 restante
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    //pongo el símbolo más para que se eliminen los 0 extras en caso de ser necesario, por ej: 0,250
                    total=+total.toFixed(3);
                    }
                } else {
                   total = numbers[i]/numbers[i+1];
                   //redondear cuando sea una operación entre enteros que dé resultado con decimales
                   if (total===0){
                    numberTotal='';
                    total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    } 
              }
                       
            }
            else if (symbols[i]==='*'){
                if (numberTotal.includes('.')){
                    total = numbers[i]*numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                } else {
                     total = numbers[i]*numbers[i+1];
                     if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                     total=+total.toFixed(3);
                    }
                }
            }
            else if (symbols[i]==='+'){
                if (numberTotal.includes('.')){
                    total = numbers[i]+numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                } else {
                     total = numbers[i]+numbers[i+1];
                     if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                     total=+total.toFixed(3);
                    }
                }
            }
            else {
                if (numberTotal.includes('.')){
                    total = numbers[i]-numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                } else {
                     total = numbers[i]-numbers[i+1];
                     if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                     total=+total.toFixed(3);
                    }
                }
            }
        }
        //else si i ya no es igual a 0, segunda pasada
        else { 
             
             if (symbols[i]==='/'){
                if (numberTotal.includes('.')){
                    total = total/numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                     
                } else {
                    total = total/numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                } 
            }
            else if (symbols[i]==='*'){
                if (numberTotal.includes('.')){
                    total = total*numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                } else {
                     total = total*numbers[i+1];
                     if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                     total=+total.toFixed(3);
                    }
                }
            }
            else if (symbols[i]==='+'){
                if (numberTotal.includes('.')){
                    total = total+numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
              } else {
                    total = total+numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                }
            }
            else if (symbols[i]==='-'){
                if (numberTotal.includes('.')){
                    total = total-numbers[i+1];
                    if (total===0){
                        numberTotal='';
                        total=+total.toFixed(3);
                    }else{
                    total=+total.toFixed(3);
                    }
                } else {
                   total = total-numbers[i+1];
                   if (total===0){
                    numberTotal='';
                    total=+total.toFixed(3);
                }else{
                   total=+total.toFixed(3);
                }
                }
            }
        }
    }
    var nodeEqual = document.createTextNode(total);
    datazerobig.innerHTML='';
    datazerobig.appendChild(nodeEqual);  
}

