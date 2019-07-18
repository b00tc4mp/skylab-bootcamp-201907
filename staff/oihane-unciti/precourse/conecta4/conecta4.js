
// play with yourself and machine
// check if sb win

  var auxHR = 0;
  var auxHB = 0;
  var auxVR = 0;
  var auxVB = 0;
  var auxDiagDR = 0;
  var auxDiagDB = 0;
  var auxDiagRR = 0;
  var auxDiagRB=0
  
var boardCells = [];

var continuePlaying = true;

var userSelection = "";
var playerTurn = 0;
var position ="";
 var playComputer = document.getElementById("playComputer");

function clicked(event){


 if (continuePlaying ==true) {
  for(var j =5; j>=0; j--){
        if(boardCells[j][event.target.getAttribute("data-column")].style.background == "white"){

          if (playerTurn == 0){
             boardCells[j][event.target.getAttribute("data-column")].style.background = "red";
              
              setTimeout(function(){
              
              if (playComputer.classList.contains('active')) {
                document.getElementById("turn").innerHTML = "Introduzca ficha jugador rojo";
                   var numberRandom = Math.floor((Math.random() * 6) + 1);
                  for(var v=5 ; v>=0;v--){
                   
                    if(boardCells [v][numberRandom].style.background == "white"){
                     boardCells [v][numberRandom].style.background = "blue";
  
                     break;
                    }
                  }
                  
             }

             }, 1000);
            
              
          break; 

        } else if (playerTurn == 1){
            boardCells[j][event.target.getAttribute("data-column")].style.background = "blue";
            }
          break; 
        }
        }

   if (!playComputer.classList.contains('active')){
      player();
   }else{
       document.getElementById("turn").innerHTML = "Introduzca ficha jugador rojo";
   }

  
  checkWin();
  }
 } 
  



function initialize(){
 
 console.log(restart.value)
  boardCells = []


   if(start.value == "Empezar"){
        continuePlaying = true;
        document.getElementById("start").value = "Terminar";
        var th = document.getElementsByTagName("th");
              for(var i = 0; i<th[i]; i++){       
                  th[i].style.background = "white";
              }
        document.getElementById("turn").innerHTML = "Empieza el jugador rojo";
        playerTurn = 0;
    }
    else if (start.value == "Terminar" || restart.value == "Reiniciar"){
      continuePlaying = false;
      document.getElementById("start").value = "Empezar";
    }

    function reInit(){
      continuePlaying = false;
      document.getElementById("start").value = "Empezar";
    }



     //document.getElementById("restart").onclick = function() {initialize()};


playWith();

var t = document.getElementById("board_table");
var rows = t.rows;

  for(var row = 0; row < rows.length; row++){

      var auxCells = [];

      for(var column = 0; column < rows[row].cells.length; column++){
        rows[row].cells[column].setAttribute("data-column", column)
        rows[row].cells[column].style.background="white";
        rows[row].cells[column].addEventListener("click",clicked);



        auxCells.push(rows[row].cells[column])
    
          //tablero[fila][columna]
      }
      boardCells.push(auxCells);
  }

  console.log(boardCells)
}





 function player(){
  if (playerTurn == 0) {
        document.getElementById("turn").innerHTML = "Introduzca ficha jugador azul";

        playerTurn=1;
       
    } else {
         document.getElementById("turn").innerHTML = "Introduzca ficha jugador rojo";
        playerTurn=0;
    
    }


 }

 function playComputer(){
  
   if (playComputer.classList.contains('active')) {
                document.getElementById("turn").innerHTML = "Introduzca ficha jugador rojo";
                  var numberRandom = Math.floor((Math.random() * 6) + 1);
                  for(var v=5 ; v>=0;v--){
                    if(boardCells[v][event.target.getAttribute("data-column")].style.background == "white"){
                     boardCells[v][event.target.getAttribute("data-column")].style.background = "blue";
  
                     break;
                    }
                  }
                  
             }

 }


function checkWin(){



  horizontal();
  vertical();
  diagonalArriba();
  diagonalAbajo();
  }


    function diagonalAbajo(){

      auxDiagDB = 0;
      auxDiagDR = 0; 

      for (var j = 0; j < boardCells.length; j++) {     
        for (var i = 0; i < boardCells[0].length; i++) {
        
          if (boardCells[j][i].style.background == "blue") {

            auxDiagDB++;

            for(var k = 1; k < 4; k++){

              var newI = i + k;
              var newJ = j + k;

              if(newI >= boardCells[0].length || newJ >= boardCells.length){
                break;
              }

               if (boardCells[newJ][newI].style.background == "blue") {
                  auxDiagDB++;
               }

            }
            
            if(auxDiagDB === 4){
               alert("Has ganado DiagDB diagonalAbajo")
               continuePlaying = false;
               document.getElementById("start").value = "Empezar";
            } else {
              auxDiagDB = 0;
            }

          }else if(boardCells[j][i].style.background == "red"){
             auxDiagDR++;

            for(var k = 1; k < 4; k++){

              var newI = i + k;
              var newJ = j + k;

              if(newI >= boardCells[0].length || newJ >= boardCells.length){
                break;
              }

               if (boardCells[newJ][newI].style.background == "red") {
                  auxDiagDR++;
               }

            }
            
            if(auxDiagDR === 4){
               alert("Has ganado auxDiagDR diagonalAbajo")
               continuePlaying = false;
               document.getElementById("start").value = "Empezar";
            } else {
              auxDiagDR = 0;
            }

          }      
        }
    }

    }

    function diagonalArriba(){

      auxDiagDB = 0;
      auxDiagDR = 0;


      for (var j = 0; j < boardCells[0].length; j++) {     
        for (var i = 0; i < boardCells.length; i++) {
        
          if (boardCells[i][j].style.background == "blue") {

            auxDiagDB++;

            for(var k = 1; k < 4; k++){

              var newI = i - k;
              var newJ = j + k;

               if(newI < 0 || newJ >= boardCells[0].length){
                break;
              }

               if (boardCells[newI][newJ].style.background == "blue") {
                  auxDiagDB++;
               }

            }
            
            if(auxDiagDB === 4){
               alert("Has ganado DiagDB")
               continuePlaying = false;
               document.getElementById("start").value = "Empezar";
            } else {
              auxDiagDB = 0;
            }

          }else if(boardCells[i][j].style.background == "red"){
             auxDiagDR++;

            for(var k = 1; k < 4; k++){

              var newI = i - k;
              var newJ = j + k;

               if(newI < 0 || newJ >= boardCells[0].length){
                break;
              }

               if (boardCells[newI][newJ].style.background == "red") {
                  auxDiagDR++;
               }

            }
            
            if(auxDiagDR === 4){
               alert("Has ganado auxDiagDR")
               continuePlaying = false;
               document.getElementById("start").value = "Empezar";
            } else {
              auxDiagDR = 0;
            }

          }      
        }
    }


    }

    function horizontal(){

      

      for (var j = 0; j < boardCells.length; j++) {     
        auxHB = 0;
        auxHR = 0;
        for (var i = 0; i < boardCells[0].length; i++) {
        
          if (boardCells[j][i].style.background == "blue") {
            auxHB++;
            auxHR = 0;
            if(auxHB === 4){
               alert("Has ganado horizontal")
               continuePlaying = false;
               document.getElementById("start").value = "Empezar";
            }

          }else if(boardCells[j][i].style.background == "red"){
             auxHR++;
             auxHB = 0;
            if(auxHR === 4){
               alert("Has ganado Horizntal Red")
               continuePlaying = false;
               document.getElementById("start").value = "Empezar";
            }

          }
                   
        }
    }
    }

    function vertical(){

      

       for (var j = 0; j < boardCells[0].length; j++) {     
        auxVB = 0;
        auxVR = 0;
        for (var i = 0; i < boardCells.length; i++) {
            
              if (boardCells[i][j].style.background == "blue") {
                auxVB++;
                auxVR = 0;
                if(auxVB === 4){
                   alert("Has ganado vertical")
                   continuePlaying = false;
                   document.getElementById("start").value = "Empezar";
                }

              }else if(boardCells[i][j].style.background == "red"){
                 auxVR++;
                 auxVB = 0;
                if(auxVR === 4){
                   alert("Has ganado vertical")
                   continuePlaying = false;
                   document.getElementById("start").value = "Empezar";
                }

              }
                       
            }
        }

    }

   
  function playWith(){
    var header = document.getElementById("playwith");
    var btns = header.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
          });
        }
  }