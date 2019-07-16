//para almacenar los resultados.
var result

//para mostrar los números.
var arrayNum = []

//Para pushear los términos de la operación.
var operation = []

//Para pushear el signo de la operación.
var operatorSign = []

//recibe los onclick de cada div class=button.
function opNumber(number) {
    if (result && arrayNum[arrayNum.length -1] === result){
        result = 0;
        arrayNum = [];
        operatorSign = [];
        arrayNum.push(number);
        document.getElementById("results").innerHTML = arrayNum.join('');
    } else if (operation[operation.length - 1] === '+' || operation[operation.length - 1] === '-' || operation[operation.length - 1] === '*' || operation[operation.length - 1] === '/') {
        operation.push(arrayNum.join(''))
        arrayNum.push(number);
        document.getElementById("results").innerHTML = arrayNum.join('');
    }else {
        arrayNum.push(number);
        document.getElementById("results").innerHTML = arrayNum.join('');
    }};

//Borra último caracter.
function backspace() {
    if (arrayNum.length === 1) {
        document.getElementById("results").innerHTML = "0";
        arrayNum.pop();
    } else {
        arrayNum.pop();
        document.getElementById("results").innerHTML = arrayNum.join('');
    }
    if (operation[operation.length - 1] === '+' || operation[operation.length - 1] === '-' || operation[operation.length - 1] === '*' || operation[operation.length - 1] === '/') {
        operation.pop();
    }
};

//Vuelve a "0" la pantalla y restaura las variables operatorSign y arrayNum a un array vacío.
function clearAll(){
    arrayNum = [];
    operation = [];
    operatorSign = []
    result = 0
    document.getElementById("results").innerHTML = "0";
};

//Para agregar términos a las operaciones.
function opSign(sign){
    if (operation[operation.length -1] === '-' && sign === '-') {
        operation.pop();
        operation.push(sign);
    } else if (arrayNum.length === 0 && sign === '-') {
        arrayNum.push(sign);
        document.getElementById("results").innerHTML = "-";
    } else if (arrayNum.length === 1 && arrayNum[arrayNum.length -1] === '-' && sign === '-') {
        arrayNum.pop();
        arrayNum.push(sign);
    } else if (arrayNum.length === 0 && (sign === '+' || sign === '*' || sign === '/')) {
        operatorSign.push(sign);
        operatorSign.pop();
    } else if (operation.length !== 0 && (operation[operation.length - 1] === '+' || operation[operation.length - 1] === '-' || operation[operation.length - 1] === '*' || operation[operation.length - 1] === '/')) {
        operation.pop();
        operation.push(sign);
    } else {
        operation.push(arrayNum.join(''));
        operation.push(sign);
        arrayNum = [];
        operatorSign = [];
    }
}

function getResults() {
    operation.push(arrayNum.join(''));
    arrayNum = [];
    var previa = operation.join('');
    operation = [];
    result = eval(previa);
    arrayNum.push(result);
    document.getElementById("results").innerHTML = result;
}