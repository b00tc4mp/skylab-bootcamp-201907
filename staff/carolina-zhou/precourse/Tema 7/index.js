// PROYECTO 7: Calculator!

// Variables:

let display = document.querySelector(".display");

let undo = document.querySelector("#undo");
let coma = document.querySelector("#coma");
let ac =  document.querySelector("#ac");

let numOne = document.querySelector("#one");
let numTwo = document.querySelector("#two");
let numThree = document.querySelector("#three");
let numFour = document.querySelector("#four");
let numFive = document.querySelector("#five");
let numSix = document.querySelector("#six");
let numSeven = document.querySelector("#seven");
let numEight = document.querySelector("#eight");
let numNine = document.querySelector("#nine");
let numZero = document.querySelector("#zero");

let divide = document.querySelector("#divide");
let multiply = document.querySelector("#multiply");
let substract = document.querySelector("#substract");
let add = document.querySelector("#add");
let equal = document.querySelector("#equal");

let numbers = [numZero, numOne, numTwo, numThree, numFour, numFive, numSix, numSeven, numEight, numNine];
let operators = [divide, multiply, substract, add];

let current = [];
let num1;
let num2;
let operation;
let float = false;
let equalized = false;

/* 
Alternativa resuelta (ejemplo):

let display = document.getElementsByClassName("display");

let undo = document.getElementById("undo");
let coma = document.getElementById("coma");
let ac =  document.getElementById("ac");

let numZero = document.getElementById("zero");
let numOne = document.getElementById("one");
let numTwo = document.getElementById("two");
let numThree = document.getElementById("three");
let numFour = document.getElementById("four");
let numFive = document.getElementById("five");
let numSix = document.getElementById("six");
let numSeven = document.getElementById("seven");
let numEight = document.getElementById("eight");
let numNine = document.getElementById("nine");

let divide = document.getElementById("divide");
let multiply = document.getElementById("multiply");
let substract = document.getElementById("substract");
let add = document.getElementById("add");
let equal = document.getElementById("equal");

numOne.addEventListener('click', function() {console.log(numOne.innerHTML); });
...
*/

// Funciones:

function reset() {
  num1 = undefined;
  num2 = undefined;
  operation = '';
  float = false;
  current = [];
  display.innerHTML = current;
};

function checkComa() {
  current.forEach(function(value) {
    if (value === '.') {
      float = true;
    }
  });
};

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
    current = [];
    operate();
  }
};

function operate(){
	let solution;
	switch(operation){
		case "+":
			solution = num1 + num2;
			break;

		case "-":
			solution = num1 - num2;
			break;

		case "x":
			solution = num1 * num2;
			break;

		case "÷":
			solution = num1 / num2;
			break;
	}
	display.textContent = solution;

};  


for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    if (current === 0) {
      current.pop();
    }
    if (current.length < 9) {
      current.push(this.innerHTML);
      display.innerHTML = current.join('');
    }
  });
}

for (let j = 0; j < operators.length; j++) {
  operators[j].addEventListener('click', function() {
    setNums();
    operation = this.innerHTML;
    num1 = Number(display.innerHTML);
  });
}

ac.addEventListener('click', function() {
  reset();
});

coma.addEventListener('click', function() {
  checkComa();
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

undo.addEventListener('click', function() {
  if (current.length <= 1) {
    reset();
  } else {
    current.pop();
  }
  display.innerHTML = current.join('');
});
