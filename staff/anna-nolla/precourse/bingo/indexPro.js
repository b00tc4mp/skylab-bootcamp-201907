/*  ●	Cuando se muestre la carta, se preguntará al usuario si realmente quiere ese cartón o generar otro,
        si realmente quiere ese cartón, deberá responder "Yes" para proceder
    ●	Establece un sistema de puntos, en cuantos más turnos se complete el cartón, 
        menos puntos (el sistema de puntos intégralo como quieras), por el contrario, a menos turnos, más puntos.
    ●	Antes de empezar el juego, muestra el sistema de puntos al usuario.
    ●	Ranking de usuarios (ordenado por puntos). */

var usuario = [];

function bingo(){
    var player1 = new participante ();
    
    player1.name = prompt("Buenos días Usuario seria tan amable de darnos su nombre ??");
    
    var bingoCard = [
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    //next line
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
     //next line
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false }
];
    var number = new Array(15);
    var matchNumber = new Array(35);
    var mLine = 0;
    var turnos = {};
    var points = 0;
    var j = 0;
    var yes = ["Y", "y", "yes"];
    var no = ["N", "n", "no"]
    console.log("Bienvenido " + usuario);

    puntos();
    getBingo();
    showBingo();
    newCard();
    randomGen();
    getNumber();
    rank();
    return;
    
    function getBingo() {
        
        for (i = 0; i < number.length; i++){
            number[i]= 0;
        }
    
        for (i = 0; i < number.length; i++){
            randomNumber =  Math.floor(Math.random() * 35) + 1;
            while (number.includes(randomNumber) == true){
                randomNumber =  Math.floor(Math.random() * 35) + 1;
                }
           number[i] = randomNumber;
           }
        
        for (i =0; i < bingoCard.length; i++){
            bingoCard[i].number = number[i];
            }
           return number;
    }
    
    function showBingo(){
        var numbers = new Array(15);
    
        for (i =0; i < bingoCard.length; i++){
            numbers[i] = bingoCard[i].number;
        }
        
        console.log(numbers.slice(0, 5) + "\n" + numbers.slice(5, 10) + "\n" + numbers.slice(10, 15));

        if (numbers.slice(0, 5).every(x => x === "X") === true && mLine === 0){
            alert("LINEA !!");
            mLine = 1;
        }

        if (numbers.slice(5, 10).every(x => x === "X") === true && mLine === 0){
            alert("LINEA !!");
            mLine = 1;
        }

        if (numbers.slice(10, 15).every(x => x === "X") === true && mLine === 0){
            alert("LINEA !!");
            mLine = 1;
        }

        if (numbers.every(x => x === "X") === true){
            turnos = j;
            puntos();
            player1.points = points;
            player1.turnos = turnos;
            alert("BINGO ! ! (en " + turnos + " turnos! ) obtiene " + points + " puntos.");
            usuario.push(player1);
            console.log("BINGO ! ! (en " + turnos + " turnos! ) obtiene " + points + " puntos.");
            do {
                var newGame = prompt("Would you like to play again ?? Y/N");
                } 
            while (!yes.includes(newGame) && !no.includes(newGame));

            if (yes.includes(newGame)){
                j = 0;
                points = 0;
                getBingo();
                showBingo();
                newCard();
                randomGen();
                return;
            }

            else{console.log("Have a nice day ! !");
            usuario.push(player1);
            return;}
        }
    }

    function newCard() {
        
        do {
            var newBingo = prompt("Would you like new numbers ?? Y/N");
            } 
        while (!yes.includes(newBingo) && !no.includes(newBingo));

        if (yes.includes(newBingo)){
            getBingo();
            showBingo();
            newCard();
        }
    }   
    
    function randomGen (){

        for (i = 0; i < matchNumber.length; i++){
            matchNumber[i]= 0;
        }
        for (i = 0; i < matchNumber.length; i++){
            var matchNumb = Math.floor(Math.random() * 35) + 1;

            while (matchNumber.includes(matchNumb) == true){
                matchNumb =  Math.floor(Math.random() * 35) + 1;
                }
            matchNumber[i] = matchNumb;
        }
    }

    function getNumber (){

        bingoCard.forEach(function(item){
            if (item.number == matchNumber[j]){
                item.number = "X";
                }
        })
        alert("el num es " + matchNumber[j]);
        
        do {
            var getNum = prompt("desea continuear ?? Y/N")
            } 
            while (!yes.includes(getNum) && !no.includes(getNum));

        if (yes.includes(getNum)){
            j++;
            showBingo();
            getNumber();  
        }

        else {console.log("Que tenga un buen dia !");}
    }

    function puntos(){
        
        switch(true){
            case turnos >= 15 && turnos < 20:
                points = 100;
                break;
            case turnos >= 20 && turnos < 25:
                points = 75;
                break;
            case turnos >= 25 && turnos < 30:
                points = 50;
                break;
            case turnos >= 30 && turnos < 35:
                points = 25;
                break;
            case turnos == 35:
                points = 0;
                break;
            }
    }

    function participante (name, points, turnos){
        this.name = name;
        this.points = points; 
        this.turnos = turnos;
    }

    function rank(){

        function compare (a, b) {
            if (a.points < b.points) return 1;
            if (a.points > b.points) return -1;
            return 0;
        }

        usuario.sort(compare);
        console.log("Ranking:");
        usuario.forEach( usuario => (console.log(usuario.name + " tiene una puntuacion de " + usuario.points + ".")));

    }
    
}

bingo();

