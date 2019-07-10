// declare variables

let board = [];

let player1 = 'RED';
let player2 = 'BLUE';
let activePlayer;
let winner = '';

let cells = document.getElementsByClassName('board_square');

function gameStart() {
  // reset variables

  activePlayer = 1;
  winner = '';

  // Generate an array for a 7*6 board filled with zeros

  for (var i = 0; i < 6; i++) {
    board[i] = [];
    for (var j = 0; j < 7; j++) {
      board[i][j] = 0;
    }
  }

  draw();
}

// set the info line

function setInfo(num) {
  if (tieCheck() == 0) {
    document.querySelector('.info').innerHTML =
      'It was a TIE! <br> Click anywhere to start a new game!<br>';
    gameEnd();
  } else if (winner != '') {
    document.querySelector('.info').innerHTML =
      winner + ' WINS! <br> Click anywhere to start a new game!<br>';
    gameEnd();
  } else {
    document.getElementById('currentPlayer').innerHTML = eval('player' + num);
  }
}

// game end

function gameEnd() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function(cell) {
      document.location.reload(true);
    });
  }
}

// make every column clickable

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function(cell) {
    drop(cell.target.id[cell.target.id.length - 1]);
  });
}

// Check for a tie

function tieCheck() {
  let checker = 0;
  board.forEach(function(num) {
    num.forEach(function(num2) {
      if (num2 == 0) {
        checker++;
      }
    });
  });
  return checker;
}

// Draw the gameboard (credit: https://github.com/nruffilo)

function draw() {
  for (col = 0; col <= 6; col++) {
    for (row = 0; row <= 5; row++) {
      //Set the inner HTML of the square (a td) to be a span with the class of 'piece' and 'player' + the value of that gameboard piece.
      //Using CSS, you can style player0, player1 and player2 so that the square will appear correctly.
      document.getElementById('square_' + row + '_' + col).innerHTML =
        "<span id='col" +
        col +
        "'class='piece player" +
        board[row][col] +
        "'> </span>";
    }
  }
}

// drop a chip into the clicked's column highest position available and change activePlayer

function drop(num) {
  counter = 0;
  for (var i = 5; i > -1; i--) {
    if (board[i][num] == 0 && counter == 0) {
      board[i][num] = activePlayer;
      counter++;
      if (activePlayer == 1) {
        activePlayer = 2;
      } else {
        activePlayer = 1;
      }
    }
  }
  draw();
  checkStatus();
  setInfo(activePlayer);
}

// logic that checks for a winner

function checkStatus() {
  var reds = 0;
  var blues = 0;

  // horizontally
  for (var i = 5; i > -1; i--) {
    reds = 0;
    blues = 0;
    for (var j = 0; j < 7; j++) {
      if (board[i][j] == 0) {
        blues = 0;
        reds = 0;
      } else if (board[i][j] == 1) {
        reds++;
        blues = 0;
        if (reds == 4) {
          winner = 'RED';
          setInfo();
        }
      } else if (board[i][j] == 2) {
        blues++;
        reds = 0;
      }
      if (blues == 4) {
        winner = 'BLUE';
        setInfo();
      }
    }
  }

  // vertically

  for (var i = 0; i < 7; i++) {
    red = 0;
    blues = 0;
    for (var j = 5; j > -1; j--) {
      if (board[j][i] == 0) {
        reds = 0;
        blues = 0;
      } else if (board[j][i] == 1) {
        reds++;
        blues = 0;
        if (reds == 4) {
          winner = 'RED';
          setInfo();
        }
      } else if (board[j][i] == 2) {
        blues++;
        reds = 0;
        if (blues == 4) {
          winner = 'BLUE';
          setInfo();
        }
      }
    }
  }

  // diagonally left to right
  for (var i = 0; i < 5; i++) {
    for (var j = 2; j > -1; j--) {
      if (
        board[j][i] == 1 &&
        board[j + 1][i + 1] == 1 &&
        board[j + 2][i + 2] == 1 &&
        board[j + 3][i + 3] == 1
      ) {
        winner = 'RED';
        setInfo();
      } else if (
        board[j][i] == 2 &&
        board[j + 1][i + 1] == 2 &&
        board[j + 2][i + 2] == 2 &&
        board[j + 3][i + 3] == 2
      ) {
        winner = 'BLUE';
        setInfo();
      }
    }
  }
  // diagonally right to left
  for (var i = 6; i > 2; i--) {
    for (var j = 2; j > -1; j--) {
      if (
        board[j][i] == 1 &&
        board[j + 1][i - 1] == 1 &&
        board[j + 2][i - 2] == 1 &&
        board[j + 3][i - 3] == 1
      ) {
        winner = 'RED';
        setInfo();
      } else if (
        board[j][i] == 2 &&
        board[j + 1][i - 1] == 2 &&
        board[j + 2][i - 2] == 2 &&
        board[j + 3][i - 3] == 2
      ) {
        winner = 'BLUE';
        setInfo();
      }
    }
  }
}

gameStart();
