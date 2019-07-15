// PROYECTO 3: Bingo!

let userName;
let carton;
let arrayCarton;
let generator = [];
let currentNumber;
let turn = 0;
let line1 = false;
let line2 = false;
let line3 = false;
let score = 0
let users = [
    {
      name: 'Sarah',
      points: 250},
    {
      name: 'Mark',
      points: 75},
    {
      name: 'Pauline',
      points: 125}
]; 



function bingo() {
  newCarton();
  let acceptCarton = prompt('Do you want to play with this card? Yes (y) or No (n).')
  if (acceptCarton === null) {
    console.log('Have a nice day. Come back soon!')
  } else {
    acceptCarton = acceptCarton.toLowerCase();
    if (acceptCarton === 'yes' || acceptCarton === 'y') {
      generateRandom();
      newTurn();
    } else if (acceptCarton === 'no' || acceptCarton === 'n') {
      bingo();
    } 
  }
};



function newCarton() {
    carton = [['Line A',],['Line B',],['Line C',]];
    arrayCarton = [];
    
    while (arrayCarton.length < 15) {
      let randomNum = (Math.floor(Math.random() * 76))
      if (!arrayCarton.includes(randomNum) && randomNum != 0) {
        arrayCarton.push(randomNum)
      }
    };
        
    arrayCarton.sort() 
    
    for (let i = 0; i < 15; i++) {
      if (i < 5) {
        carton[0].push(parseInt(arrayCarton[i]))
      } else if (i < 10) {
        carton[1].push(parseInt(arrayCarton[i]))
      } else if (i <= 15) {
        carton[2].push(parseInt(arrayCarton[i]))
      }
    }
    
    finalCarton();
};



function finalCarton() {
  console.log('Skylab Bingo!');
  for (let j = 0; j < carton.length; j++) {
    console.log(carton[j])
  }
  if (turn > 0) {
    console.log('[Turn: ' + turn + '] [Number: ' + currentNumber + ']')
  }
}; 



function generateRandom() {
  while (generator.length < 75) {
    let num = (Math.floor(Math.random() * 76));
    if (!generator.includes(num) && num != 0) {
      generator.push(num)
    }
  }
};



function newTurn() {
  if (turn === 0) {
    let play = confirm('Great! Click ACCEPT to start or CANCEL to quit.');
    if (play === true) {
      round();
    } else {
      console.log('Have a nice day. Come back soon!')
    } 
  } else if (turn > 0) {
    let play = confirm('Click ACCEPT to keep playing or CANCEL to quit.');
    if (play === true) {
      round();
    } else {
      console.log('Have a nice day.Come back soon!')
    } 
  }
};



function round() {
  function selection() {
    let selected = Math.floor(Math.random() * generator.length);
    return generator[selected];
  };
  currentNumber = selection();
  generator.splice(generator.indexOf(currentNumber),1)
  carton.forEach(function(value){
    value.forEach(function (value2) {
      if (currentNumber === value2) {
        console.log(currentNumber +  ' found!')
        value[value.indexOf(value2)] = 'X';
      }
  })
});
turn++;
finalCarton();




if (line1 === true && line2 === true && line3 === true) {
    checkBingo();
  } else {
    checkLine()
  }
};



function checkString (num) {
  return typeof num == 'string';
};

function lineCheck(arr) {
  if (arr.every(checkString)) {
    return true;
  } else {
    return false;
  }
};



function checkLine() {
  if (lineCheck(carton[0]) === true && lineCheck(carton[1]) === true && lineCheck(carton[2]) === true) {
    checkBingo();
  } else {
    for (k = 0; k < carton.length; k++){
      for (l = 0; l <carton[k].length; l++) {
         if (lineCheck(carton[0]) === true && line1 === false) {
           console.log('LINE!');
           line1 = true; 
         } else if (lineCheck(carton[1]) === true && line2 === false) {
           console.log('LINE!');
           line2 = true; 
         } else if (lineCheck(carton[2]) && line3 === false) {
           console.log('LINE!');
           line3 = true; 
         } else if (line1 === true && line2 === true && line3 === true) {
           checkBingo();
        } else {
           console.log('Keep Playing!')
         }
      }
    }
    newTurn();
  }
};

/*function checkLine() {
  for (k = 0; k < carton.length; k++){
    for (l = 0; l <carton[k].length; l++) {
       if (lineCheck(carton[0]) === true && line1 === false) {
         console.log('LINE!');
         line1 = true; 
       } else if (lineCheck(carton[1]) === true && line2 === false) {
         console.log('LINE!');
         line2 = true; 
       } else if (lineCheck(carton[2]) && line3 === false) {
         console.log('LINE!');
         line3 = true; 
       } else if (line1 === true && line2 === true && line3 === true) {
         checkBingo();
       } else {
         console.log('Keep Playing!')
       }
    }
  }
  newTurn();
};*/



function checkBingo() {
  if (lineCheck(carton[0]) === true && lineCheck(carton[1]) === true && lineCheck(carton[2]) === true) {
    score = getScore();
    console.log('BINGO!!! Congratulations! ' + userName + ', you won the game in ' + turn + ' turns, awarding you ' + score + ' points!')
      
    users.push({name: userName, points: score})
    ranking();
  }
    let again = prompt('Would you like to play again? Yes (y) or No (n)')
    if  (again === 'yes' || again === 'y' || again === '') {
      console.clear();
      turn = 0;
      generator = [];
      line1 = false;
      line2 = false;
      line3 = false;
      userIntro();
    } else if (again === null || again === 'no' || again === 'n') {
      console.clear();
      console.log('Have a nice day. Come back soon!');
    } else {
      console.clear();
      console.log('Have a nice day. Come back soon!');
    }
  /* else {
    console.log('Keep Playing!');
    newTurn();
  }*/
};



function scores() {
  console.log('Skylab Bingo: Score System');
  console.log('--------------------------------------');
  console.log('BINGO in 15 turns: 1000 points');
  console.log('BINGO from 16 to 40 turns: 500 points');
  console.log('BINGO from 41 to 70 turns: 250 points');
  console.log('BINGO from 71 to 90 turns: 125 points');
  console.log('BINGO in 91+ turns: 75 points');
  console.log('--------------------------------------');
};
 


function getScore() {
  switch(true) {
    case (turn === 15):
       return 1000;
    case (turn > 15 && turn <= 40):
        return 500;
    case (turn > 40 && turn <= 70):
        return 250;
    case (turn > 70 && turn <= 90):
        return 125;
    default:
        return 75;
  }
};
  
  
  
function ranking() {
  users.sort(function(a, b) {
    return b.points - a.points;
  });
  console.log('Skylab Bingo: RANKING!')
  for (let i = 0; i < users.length; i++) {
    console.log('Rank ' + users.indexOf(users[i]) + ': ' + users[i].name + ' with ' + users[i].points + ' points.')
  }
};



function userIntro() {
  let intro = prompt("¡Enter your name!");
  if (intro === "") {
      console.log("You introduced an empty name");
      userIntro()
  } else if (intro === null) {
      console.log("Have a nice day. Come back soon!");
  } else {
      userName = intro;
      console.log("Welcome " + userName + ".");
      bingo();
  }
}
userIntro();
