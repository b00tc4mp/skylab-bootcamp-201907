// selector variables

var display = document.querySelector('#display');

var numOne = document.querySelector('#numOne');
var numTwo = document.querySelector('#numTwo');
var numThree = document.querySelector('#numThree');
var numFour = document.querySelector('#numFour');
var numFive = document.querySelector('#numFive');
var numSix = document.querySelector('#numSix');
var numSeven = document.querySelector('#numSeven');
var numEight = document.querySelector('#numEight');
var numNine = document.querySelector('#numNine');
var numZero = document.querySelector('#numZero');
var numDot = document.querySelector('#numDot');

var del = document.querySelector('#del');
var divide = document.querySelector('#divide');
var multi = document.querySelector('#multiply');
var subs = document.querySelector('#substract');
var add = document.querySelector('#add');
var equal = document.querySelector('#equal');
var reset = document.querySelector('#reset');

// misc variables

let current = [0];
let num1;
let num2;
let operation;
let float = false;
let equalized = false;
let temp1;
let numbers = [
  numZero,
  numOne,
  numTwo,
  numThree,
  numFour,
  numFive,
  numSix,
  numSeven,
  numEight,
  numNine
];

let operators = [divide, multi, subs, add];

display.innerHTML = current;

// ========== misc functions

// resets all values

function reseteo() {
  num1 = undefined;
  num2 = undefined;
  operation = '';
  float = false;
  current = [0];
  display.innerHTML = current;
}

// checks if current has decimals, used to avoid entering more than one period

function checkFloat() {
  current.forEach(function(value) {
    if (value == '.') {
      float = true;
    }
  });
}

// asign num1 and num2

// check if num1 comes from using the equal button so you can use
// the result it returned to operate, or enter a new number

function setNums() {
  if (equalized === true) {
    num1 = undefined;
    equalized = false;
  }

  if (num1 === undefined) {
    num1 = Number(current.join(''));
    current = [];
  } else {
    num2 = Number(current.join(''));
    current = [0];
    operate();
  }
}

function operate() {
  switch (operation) {
    case '+':
      num1 = num1 + num2;
      break;
    case '-':
      num1 = num1 - num2;
      break;
    case 'x':
      num1 = num1 * num2;
      break;
    case '÷':
      num1 = num1 / num2;
      break;
  }

  // el if de la vergüenza por no haber hecho buen uso de parseInt y parseFloat

  if (num1 > 999999999) {
    display.innerHTML = 'error';
  } else if (num1.toString().length > 9) {
    temp1 = num1.toString().slice(0, 9);
    temp1 = Number(temp1);
    num1 = temp1;
    display.innerHTML = num1;
  } else {
    display.innerHTML = num1;
  }
}

// number to button asign

for (var i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    // if there is only a zero, empty array before adding nuew numbers
    if (current == 0) {
      current.pop();
    }
    if (current.length < 9) {
      current.push(this.innerHTML);
      display.innerHTML = current.join('');
    }
  });
}

// operator to button asign

for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', function() {
    setNums();
    operation = this.innerHTML;
    num1 = Number(display.innerHTML);
  });
}

// special and operator buttons

reset.addEventListener('click', function() {
  reseteo();
});

numDot.addEventListener('click', function() {
  checkFloat();
  if (float === false) {
    if (current.length === 0) {
      current[0] = 0;
    }
    current.push(this.innerHTML);
    display.innerHTML = current.join('');
  }
});

equal.addEventListener('click', function() {
  setNums();
  operation = '';
  float = false;
  num2 = undefined;
  equalized = true;
});

del.addEventListener('click', function() {
  if (current.length === 1) {
    reseteo();
  } else {
    current.pop();
  }
  display.innerHTML = current.join('');
});
