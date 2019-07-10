var arrayUsers=[];  //array where you store the cardBoards
var bingoCard = [];
var checkNumbers=[];
var cardBoard=[
  [],
  [],
  [],
];
var turn=0;
var playing=true;

// check if user wants a new Carboard............................... NEWCARBOARD;
function newCarboards(){
  arrayUsers.push(cardBoard);
  var questionMore=prompt("Do you want another cardboard? y/n");
  if(questionMore.toLowerCase()=="y"){
    cardBoard=[
      [],
      [],
      [],
    ];
    generateCardBoard();
  }else{
    console.log(arrayUsers);

    arrayUsers.forEach(function(element) {
      console.log(element);
      addX(element);
    });
  }
}

// generate a new CardBoard...................................... GENERATE CARDBOARD
function generateCardBoard(){

  for(var i=0;i<5;i++){
    cardBoard[0].push((Math.floor(Math.random() * 50)+1));
  };

  for(var i=0;i<5;i++){
    cardBoard[1].push((Math.floor(Math.random() * 50)+1));
  };

  for(var i=0;i<5;i++){
    cardBoard[2].push((Math.floor(Math.random() * 50)+1));
  };
  console.log(cardBoard.join("\n"));
  newCarboards()
}

function checkEvery(){
  function checkIfX(currentValue) {
    return currentValue.toString().toUpperCase() == "X";
  }
  var one=(arrayUsers[0][0].every(checkIfX));
  var two=(arrayUsers[0][1].every(checkIfX));
  var three=(arrayUsers[0][2].every(checkIfX));

  if(one==true) console.log("line");
  if(two==true) console.log("line");
  if(three==true) console.log("line");
  if(one==true&&two==true&&three==true){
      alert("bingo");
      playing=false;
  }
}

//adds X......................................................... ADDS X
function addX(arrayUsers){

  turn ++;
  if(playing==true){

    randNumber(checkNumbers)
    console.log(checkNumbers);
    var lastNumber=checkNumbers[checkNumbers.length-1];
    console.log("THIS IS THE NEW NUMBER: "+lastNumber);

    for(var i=0;i<arrayUsers.length;i++){
      for(var j=0;j<arrayUsers[i].length;j++){

          if(arrayUsers[i][j]==lastNumber){
            console.log(arrayUsers[i]);
            arrayUsers[i][j]="X";
          }

      }
    }
    console.log(arrayUsers.join("\n"));

    while(playing==true){
      var continuePlaying=prompt("Do you want to keep playing? y/n");
      if(continuePlaying=="y"){
        checkEvery();
        addX(arrayUsers);
      }else{
        console.log("GOODBYE");
        playing=false;
        break;
      }
    }

  }
}

//creates a NEWNUMBER...............................................  NEWNUMBER
function randNumber(checkNumber){
  let newNumber=Math.floor(Math.random() * 50)+1;
  if(checkNumber.includes(newNumber)){
    randNumber(checkNumber);
  }else{
    if(checkNumber.indexOf(newNumber)===-1){
      checkNumber.push(newNumber);
    }
  }
}

// BEGIN THE GAME................................................. START
function begin(){
  var playerName = prompt("What is your name");
  console.log("Welccome to bingo "+ playerName);
  generateCardBoard()
}
begin();
