// Declarations 
var display = document.querySelector('#display');
var memory = document.querySelector('#memory');
var numbers = ['0','1','2','3','4','5','6','7','8','9','.',','];
var specials = ['Backspace', 'Escape', 'Delete'];
var commands = ['Enter', '='];
var operators = ['+', '-', '*', '/'];
var operation = [];
var num = [];
var reset = false;
memory.style.visibility = 'hidden';

// Listeners on keyboard input
document.addEventListener('keypress', function(event) {
    var input = event.key;
    numbers.includes(input) ? numberHandler(input) : {};
    commands.includes(input) ? commandHandler(input) : {};
    operators.includes(input) ? operatorHandler(input) : {};
});
document.addEventListener('keydown', function(event) {
    var input = event.key;
    specials.includes(input) ? specialHandler(input) : {};
});

// Listeners on mouse input
document.addEventListener('click', function(event) {
    var input = event.target.dataset.value;
    if (input) {
        numbers.includes(input) ? numberHandler(input) : {};
        specials.includes(input) ? specialHandler(input) : {};
        commands.includes(input) ? commandHandler(input) : {};
        operators.includes(input) ? operatorHandler(input) : {};
    }
});

function numberHandler(input) {
/* Check if input is an integer or a decimal dot and display it */
    if (reset) {
        specialHandler('Escape');
        reset = false;
    }
    if (parseInt(input) >= 0) num.push(input);
    if (input === ',' || input === '.') {
       if (!num.includes('.')) num.push('.');
    }
    if (!num.length) {
        display.textContent = 0
    } else{
        if (num.slice(-1)[0] === '.') {
            display.textContent = num.join('');
        } else {
            display.textContent = parseFloat(num.join(''));
        }
    } 
}

function specialHandler(input) {
/* Handle backspace and delete options */
    if (input === 'Backspace') num.pop();
    if (input === 'Escape' || input === 'Delete') num = [];
    if (!num.length) {
        operation = [];
        display.textContent = 0;
        memory.textContent = 0;
        memory.style.visibility = 'hidden';
    } else {
        display.textContent = parseFloat(num.join(''));
    }
}

function commandHandler(input) {
/* Behaviour when Enter or equal sign is click/pressed */
    if (operation.length) {
        !num.length ? operation.splice(-1, 1) : {};
        operation.push(num.join(''));
        memory.textContent = operation.join('');
        display.textContent = eval(operation.join(''));
        operation = [];
        num = [display.textContent];
        reset = true;
    }
}

function operatorHandler(input) {
/* Behaviour when calc operators are pressed/clicked */
    if (num.length) {
        operation.push(num.join(''), input);
        num = [];
        reset = false;
    } else {
        if (operation.length) operation.splice(-1, 1, input);
    }
    if (operation.length) {
        memory.textContent = operation.join('');
        memory.style.visibility = 'visible';
    } else {
        memory.textContent = 0;
        memory.style.visibility = 'hidden';
    }
}
