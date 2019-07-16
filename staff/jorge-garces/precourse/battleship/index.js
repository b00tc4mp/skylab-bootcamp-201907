// Tablero para presentar al usuario que muestra el estado de cada casilla
// de acuerdo a los siguientes emojis:
//
// Agua -> 🌊 -> 0
// Fallo -> 🌑 -> 1
// Tocado -> 💥 -> 2
// Hundido -> ☠️
// Ship1 ->  🚤
// Ships 2 and 3 -> 🚢
// Life -> 💖

var board = [
  ['🌊', '🌊', '🌊', '🌊', '🌊'],
  ['🌊', '🌊', '🌊', '🌊', '🌊'],
  ['🌊', '🌊', '🌊', '🌊', '🌊'],
  ['🌊', '🌊', '🌊', '🌊', '🌊'],
  ['🌊', '🌊', '🌊', '🌊', '🌊']
];

// Tablero interno con posición y estado de los barcos
// Barco 1 -> 4
// Barco 2 -> 5
// Barco 3 -> 6

var board2 = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

let turn = 0; // Contador de turnos

function battleship() {
  // Crear los tres barcos en posiciones aleatorias

  function createShipOne() {
    let axis = Math.floor(Math.random() * 2); // aleatorio fila o columna
    let startPos = Math.floor(Math.random() * 4); // posición inicial aleatoria para dos huecos evitando que se salga del tablero
    if (axis === 0) {
      let randomIndex = Math.floor(Math.random() * 5);
      board2[randomIndex][startPos] = 4;
      board2[randomIndex][startPos + 1] = 4;
    } else if (axis === 1) {
      let randomIndex = Math.floor(Math.random() * 5);
      board2[startPos][randomIndex] = 4;
      board2[startPos + 1][randomIndex] = 4;
    }
  }

  function createShipTwo() {
    let axis = Math.floor(Math.random() * 2);
    let startPos = Math.floor(Math.random() * 3);
    if (axis === 0) {
      let randomIndex = Math.floor(Math.random() * 5);
      if (
        board2[randomIndex][startPos] === 4 ||
        board2[randomIndex][startPos + 1] === 4 ||
        board2[randomIndex][startPos + 2] === 4
      ) {
        createShipTwo(); // si encuentra un shipOne en alguno de los huecos, vuelve a probar
      } else {
        board2[randomIndex][startPos] = 5;
        board2[randomIndex][startPos + 1] = 5;
        board2[randomIndex][startPos + 2] = 5;
      }
    } else if (axis === 1) {
      let randomIndex = Math.floor(Math.random() * 3);
      if (
        board2[startPos][randomIndex] === 4 ||
        board2[startPos + 1][randomIndex] === 4 ||
        board2[startPos + 2][randomIndex] === 4
      ) {
        createShipTwo();
      } else {
        board2[startPos][randomIndex] = 5;
        board2[startPos + 1][randomIndex] = 5;
        board2[startPos + 2][randomIndex] = 5;
      }
    }
  }

  function createShipThree() {
    let axis = Math.floor(Math.random() * 2);
    let startPos = Math.floor(Math.random() * 3);
    if (axis === 0) {
      let randomIndex = Math.floor(Math.random() * 5);
      if (
        board2[randomIndex][startPos] != 0 ||
        board2[randomIndex][startPos + 1] != 0 ||
        board2[randomIndex][startPos + 2] != 0
      ) {
        createShipThree(); // si alguna de las posiciones no es agua, vuelve a probar
      } else {
        board2[randomIndex][startPos] = 6;
        board2[randomIndex][startPos + 1] = 6;
        board2[randomIndex][startPos + 2] = 6;
      }
    } else if (axis === 1) {
      let randomIndex = Math.floor(Math.random() * 3);
      if (
        board2[startPos][randomIndex] != 0 ||
        board2[startPos + 1][randomIndex] != 0 ||
        board2[startPos + 2][randomIndex] != 0
      ) {
        createShipThree();
      } else {
        board2[startPos][randomIndex] = 6;
        board2[startPos + 1][randomIndex] = 6;
        board2[startPos + 2][randomIndex] = 6;
      }
    }
  }

  // Llenar board2 con 1 barco de dos vidas y 2 de tres
  createShipOne();
  createShipTwo();
  createShipThree();

  // Variables que llevan la cuenta de cuántas vidas quedan a cada barco

  var shipOne = 0;
  var shipOneStatus = '';
  var shipTwo = 0;
  var shipTwoStatus = '';
  var shipThree = 0;
  var shipThreeStatus = '';

  // Función que recorre board2 contando las vidas de los barcos

  function checkShips() {
    shipOne = 0;
    shipTwo = 0;
    shipThree = 0;

    for (var i = 0; i < board2.length; i++) {
      for (var z = 0; z < board2[i].length; z++) {
        if (board2[i][z] === 4) {
          shipOne++;
        } else if (board2[i][z] === 5) {
          shipTwo++;
        } else if (board2[i][z] === 6) {
          shipThree++;
        }
      }
    }
  }

  // Función para presentar las vidas en forma de corazones

  function calc() {
    shipOneStatus = '';
    shipTwoStatus = '';
    shipThreeStatus = '';

    for (var i = 0; i < shipOne; i++) {
      shipOneStatus += '💖';
    }

    for (var i = 0; i < shipTwo; i++) {
      shipTwoStatus += '💖';
    }

    for (var i = 0; i < shipThree; i++) {
      shipThreeStatus += '💖';
    }
  }

  checkShips();

  // Muestra de manera amigable el estado de los barcos.

  function showShips() {
    calc();
    if (shipOne + shipTwo + shipThree > 0) {
      console.log('         Ships left');
      console.log('=============================');
      if (shipOne === 0) {
        console.log('Ship One 🚤: ☠️☠️️️☠️️️');
      } else {
        console.log('Ship One 🚤: ' + shipOneStatus);
      }
      if (shipTwo === 0) {
        console.log('Ship Two 🚢: ☠️☠️️️☠️️️');
      } else {
        console.log('Ship Two 🚢: ' + shipTwoStatus);
      }
      if (shipThree === 0) {
        console.log('Ship Two 🚢: ☠️️️☠️️️☠️️️');
      } else {
        console.log('Ship Three 🚢: ' + shipThreeStatus);
      }
    } else {
      console.log('No ships left, you won the game');
    }
  }

  play();

  function play() {
    if (turn === 0) {
      console.log('Welcome to SkyLab Battleship');
      console.log('Enter coordinates for fist shot to begin ...');
      console.table(board);
      checkShips();
      showShips();
      turn++;
      getCoords();
    } else {
      turn++;
      getCoords();
    }

    // función para disparo

    function shoot(a, b) {
      if (board2[a][b] === 0) {
        console.clear();
        console.log('MISS! Keep Firing!');
        board2[a][b] = 1;
        board[a][b] = '🌑';
        console.table(board);
        checkShips();
        showShips();
        // console.table(board2)
        play();
      } else if (
        board2[a][b] === 1 ||
        board2[a][b] === 2 ||
        board2[a][b] === 3
      ) {
        console.clear();
        console.log('You already fired there, fire again!');
        console.table(board);
        showShips();
        play();
      } else if (
        board2[a][b] === 4 ||
        board2[a][b] === 5 ||
        board2[a][b] === 6
      ) {
        console.clear();
        console.log('💥💥💥 HIT TAKEN! 💥💥💥');
        board2[a][b] = 2;
        board[a][b] = '💥';
        console.table(board);
        checkShips();
        showShips();
        // console.table(board2)
        if (shipOne + shipTwo + shipThree > 0) {
          play();
        } else console.log('🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆');
      }
    }

    // Función para introducir coordenadas

    function getCoords() {
      let coords = prompt('Enter coordinates, Cancel to exit.');
      if (coords === null) {
        console.clear();
        console.log('Have a nice day!');
      } else {
        coords = coords.split(',');
        coords[0] = parseInt(coords[0], 10);
        coords[1] = parseInt(coords[1], 10);
        if (
          coords.length != 2 ||
          coords[0] < 0 ||
          coords[0] > 4 ||
          coords[1] < 0 ||
          coords[1] > 4 ||
          isNaN(coords[0]) ||
          isNaN(coords[1])
        ) {
          console.log(
            'Please enter 2 numbers between 0 and 4 separated by a comma'
          );
          getCoords();
        } else {
          shoot(coords[0], coords[1]);
        }
      }
    }
  } // close play()
} // close battleship()

battleship();
