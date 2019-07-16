// Get
var visor = document.getElementById('_visor');
var visor = document.getElementById('_visor');

var reset = document.getElementById('reset');
var del = document.getElementById('del');

var div = document.getElementById('div');
var mult = document.getElementById('mult');
var rest = document.getElementById('rest');
var sum = document.getElementById('sum');

var result = document.getElementById('result');

var comma = document.getElementById('comma');

var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var eight = document.getElementById('eight');
var nine = document.getElementById('nine');
var zero = document.getElementById('zero');

var footer = document.getElementById('footer');
var delMsn = document.getElementById('delmsn');

// Events
reset.addEventListener('click', getReset);
del.addEventListener('click', getDel);

div.addEventListener('click', nums);
mult.addEventListener('click', nums);
rest.addEventListener('click', nums);
sum.addEventListener('click', nums);

result.addEventListener('click', calc);

comma.addEventListener('click', nums);

one.addEventListener('click', nums);
two.addEventListener('click', nums);
three.addEventListener('click', nums);
four.addEventListener('click', nums);
five.addEventListener('click', nums);
six.addEventListener('click', nums);
seven.addEventListener('click', nums);
eight.addEventListener('click', nums);
nine.addEventListener('click', nums);
zero.addEventListener('click', nums);

// Variables
var getResultVisor = [];
var getResultOperation = [];
var num1 = 0;
var num2 = 0;
var operation;
var count = 0;
var total = 0;

// Functions
function nums () {
    // subimos al array el dato seleccionado
    getResultVisor.push(this.innerText);
    // Para no dejar ningún número oculto
    if (getResultVisor.length >= 9) {
            visor.style.overflow = 'scroll';
    }
    
    if (isNaN(getResultVisor[0])) {
        if ( getResultVisor[0] == ',') {
            getResultVisor[0] = '0';
            getResultVisor[1] = ',';
            getResultOperation.push('0');
            getResultOperation.push('.');
            // Reset aviso de error
            footer.innerHTML = '';
        } else {
            // Si el dato seleccionado no es un número o una coma:
            footer.innerHTML = `<div class='atention'>¡! Comienza con un número mejor.</div>`;
            visor.innerHTML = '0';
            getResultVisor = [];
            getResultOperation = [];
        }

    } else {
        // Reset aviso de error
        footer.innerHTML = '';
        if (isNaN(this.innerText)) {
            var x =  getResultVisor.length - 2;
            if (!getResultOperation == 0) {
                if (isNaN(getResultVisor[x])) {
                    footer.innerHTML = `<div class='atention'>¡! No aceptamos dos signos seguidos.</div>`;
                    getResultVisor.pop();
                } else {
                    // Se realiza la operación dependiendo del símbolo escogido:
                    operation = this.innerText;
                    switch (operation) {
                        case '+':
                            getResultOperation.push('+');
                            break
                        case '−':
                            getResultOperation.push('-');
                            break
                        case '×':
                            getResultOperation.push('*');
                            break
                        case '÷':
                            getResultOperation.push('/');
                            break
                        case ',':
                            getResultOperation.push('.');
                            break
                    }
                }
            }
        } else {
            // Cuando se seleccionan números:
            getResultOperation.push(this.innerText);
        }
        // Si es un número:
        visor.innerHTML = getResultVisor.join('');
    }
}

function calc () {
    if (getResultOperation.includes('+') || getResultOperation.includes('-') || getResultOperation.includes('*') || getResultOperation.includes('/')) {
        // Se ejecuta la operación
        total = eval(getResultOperation.join(''));   
        // reset
        getResultOperation = []
        getResultVisor = [];
        // Subimos el total por si se quiere concatenar operaciones
        getResultOperation = (total.toString()).split('');
        getResultVisor = (total.toString()).split('');
        // Para mostrar en pantalla los puntos como comas
        if (getResultVisor.includes('.')) {
            var wComma = getResultVisor.indexOf('.');
            getResultVisor.splice(wComma, 1, ',');
        }
        // Imprimimos el resultado en pantalla
        visor.innerHTML = getResultVisor.join('');
    } else if (getResultOperation.length == 0) {
        // Cuando de cero se clicka al igual:
        footer.innerHTML = `<div class='atention'>¡! Para darte un nuevo resultado necesito que hagas una nueva operación.</div>`;
    } else {
        // Cuando faltan datos para completar la operación, por ejemplo: +
        footer.innerHTML = `<div class='atention'>¡! Necesitamos más datos para generar la operación.</div>`;
    }

}

function getReset () {
    visor.innerHTML = '0'
    getResultOperation = []
    getResultVisor = [];
    visor.style.overflow = 'hidden';
    // Reset aviso de error
    footer.innerHTML = '';
}

function getDel () {
    getResultVisor.pop();
    getResultOperation.pop();
    // Imprimimos el resultado:
    visor.innerHTML = getResultVisor.join('');
    // Reset aviso de error
    footer.innerHTML = '';
}

