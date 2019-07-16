// Declarar variables globales

let user // nombre de usuario
let list // Array para los 15 números del cartón
let card // Array para separar los 15 números en 3 líneas
const drum = [] // Bombo
let currentNumber // Número sacado en el turno actual
let turn = 0 // Contador de turno
let line = false; // Controla si se ha cantado línea
let score = 0// Cálculo de puntuación según turnos
var users = [ // Array de objetos con usuarios y sus puntuaciones
  {
    name: 'Andreea',
    points: 250},
  {
    name: 'Tommy',
    points: 75},
  {
    name: 'Rodrigo',
    points: 125
  }
]; 

// Pedimos nombre al usuario, lo guardamos e iniciamos bingo().

function start() {
  scores();
  user = prompt('Please enter your name');
  if (user === null) {
  console.log('Have a nice day')
  } else if (user === '') {
    start();
  } else {
  bingo();
  }
};

// Saludamos al usuario, generamos nuevo cartón newCard() y mostramos a usuario. Si el usuario acepta el cartón, generamos bombo drumCreate() e iniciamos turno newTurn(). Si no, generamos nuevo cartón hasta que lo acepte.

function bingo() {
  console.clear()
  console.log('Welcome ' + user)
  newCard();
  var acceptance = prompt('Accept card? (Y)es / (N)o')
  if (acceptance === null) {
    console.log('Have a nice day')
  } else {
  acceptance = acceptance.toLowerCase();
  if (acceptance === 'yes' || acceptance === 'y') {
    drumCreate();
    newTurn();
  } else if (acceptance == 'no' || acceptance === 'n') {
    console.clear();
    bingo();
  } else {
   // console.log('Generating a new Card. Please enter Yes/No')
    bingo();
  }
}
};

// Generar cartón - de 15 números en 3 líneas y mostrar

function newCard() {

  // Reiniciar y formatear variables
  
  card = [['a',],['b',],['c',]];
  let list = [];
  
    // Crear array de 15 números aleatorios entre 1 y 99.
  
  while (list.length < 15) {
    var unique = (Math.floor(Math.random() * 99))
    //var unique = ('0' + (Math.floor(Math.random() * 99))).slice(-2)
    if (!list.includes(unique) && unique != 0) {
      list.push(unique)
    }
  };
  
  // Separar los 15 números en 3 arrays nested (líneas), ordenados previamente de menor a mayor.
  
  list.sort() 
  
  for (var i = 0; i < 15; i++) {
    if (i < 5) {
      card[0].push(parseInt(list[i])) // Pasar con parseInt para comprobar líneas después
    } else if (i < 10) {
      card[1].push(parseInt(list[i]))
    } else if (i < 15) {
      card[2].push(parseInt(list[i]))
    }
  }
  
  showCard();
  
  };

  // Función que muestra el cartón de una manera amigable.

function showCard() {
  console.log('----- Skylab BINGO -----');
  for (var i = 0; i < card.length; i++) {
  console.log('[' + card[i].join('][') + ']')
  }
  console.log('------------------------')
  if (turn > 0) {
  console.log('[Turn: ' + turn + '] [Last num: ' + currentNumber + ']')
  }
}; 

// Generar el bombo: un array aleatorio de 99 números sin incluir el 0

function drumCreate() {
while (drum.length < 99) {
  var num = (Math.floor(Math.random() * 100));
  if (!drum.includes(num) && num != 0) {
  drum.push(num)
  }
}
};

// Función para Nuevo turno - Pedimos confirmación

function newTurn() {
  if (turn == 0) {
var r = confirm('Great! Click OK to Start. Cancel to quit.');
    if (r === true) {
      ronda();
      } else {
      console.log('Have a nice day.')
      } 
    } else if (turn > 0) {
      var r = confirm('Click OK for next turn. Cancel to quit.');
    if (r === true) {
      ronda();
      } else {
      console.log('Have a nice day.')
      } 
    }
  };

  // Elegir un número aleatorio del bombo, guardarlo en la variable currentNumber y eliminar su index del array drum.

function ronda() {

  function selection() {
    var selected = Math.floor(Math.random() * drum.length);
    return drum[selected];
  };

currentNumber = selection();
drum.splice(drum.indexOf(currentNumber),1)

// Comprobar si existe el número en alguna de las líneas del cartón y, de ser así, sustituir éste por una X y mostrar cartón. De lo contrario preguntar por nuevo turno.
console.clear()

card.forEach(function (value){
  value.forEach(function (value2) {
    if (currentNumber == value2) {
      console.log(' @@@@@ ' + currentNumber +  ' found! @@@@@')
      value[value.indexOf(value2)] = 'XX';
    }
  })
});

turn++
showCard()

// Comprobar si se ha cantado línea, en caso afirmativo seguir para Bingo.
if (line === true) {
  checkBingo();
} else {
lineCheck()
}
};

// Funciones que comprueban línea y bingo.

function checkString (num) {
  return typeof num == 'string';
}

  function checkLine(arr) {

    if (arr.every(checkString)) {
      return true;
    } else {
      return false;
    }
};

// Función que comprueba si ha habido línea.

function lineCheck() {

  if (checkLine(card[0]) == true || checkLine(card[1]) == true || checkLine(card[2]) == true) {
    console.log('LINE!!!! Keep playing for BINGO!');
    line = true; 
    newTurn();
  } else {
    console.log('Keep Playing for LINE!')
    newTurn();
  }
};

// Función que muestra al usuario el sistema de puntuaciones.

function scores() {
  console.clear();
  console.log('Skylab Bingo Score System')
  console.log('--------------------------------------')
  console.log('BINGO in 15 turns: 9001 points')
  console.log('BINGO from 16 to 40 turns: 500 points')
  console.log('BINGO from 41 to 70 turns: 250 points')
  console.log('BINGO from 71 to 90 turns: 125 points')
  console.log('BINGO in 91+ turns: 75 points')
  console.log('--------------------------------------')
};

// Función que calcula puntuación según turno final.

function getScore() {

  switch(true) {
    case (turn === 15):
     return 9001;
    case (turn > 15 && turn <= 40):
      return 500;
    case (turn > 40 && turn <= 70):
      return 250;
    case (turn > 70 && turn <= 90):
      return 125;
    default:
      return 75;
  }
}

// Función que comprueba si ha habido Bingo. En caso afirmativo muestra puntuación y da opción de jugar de nuevo, en caso contrario propone nuevo turno.

function checkBingo() {

  if (checkLine(card[0]) == true && checkLine(card[1]) == true && checkLine(card[2]) == true) {

    score = getScore();
    console.log('B I N G O !!!! Congratulations ' + user + ', you won the game in ' + turn + ' turns, awarding you ' + score + ' points!')
    
    users.push({name: user, points: score})
    ranking();

    var again = prompt('Woud you like to play again? (Y)es / (N)o')

    if (again === null) {
      console.log('Have a nice day')
    } else {
    again = again.toLowerCase();

  if (again === 'yes' || again === 'y') {
    console.clear()
    turn = 0;
    line = false;
    start();
  } else if (again === 'n' || again === 'no' || again === '') {
    console.log('Have a nice day')
  } else {
    console.log('Please enter Yes/No')
    checkBingo();
  }
}
  } else {
    console.log('Keep Playing for BINGO!')
    newTurn();
  }
};

// Función que muestra el ranking

function ranking() {

  // Ordemos el array de usuarios por puntos descendentes
  users.sort(function(a, b) {
    return b.points - a.points;
  });

  // Presentamos

  console.log('Skylab Bingo Hall of Fame')
  console.log('--------------------------')

for (var i = 0; i < users.length; i++) {
  console.log('Rank ' + users.indexOf(users[i]) + ': ' + users[i].name + ' with ' + users[i].points + ' points.')
}
};




start();