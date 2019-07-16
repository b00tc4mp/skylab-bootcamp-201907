var players = []; //variable fuera de la funcion principal para no machacar la lista de jugadores

function bingo() {
    var bingoCard = [
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        //next line
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        //next line
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false },
        { number : 0, matched : false }
        ];
    
    var numbers = []; //mostrar los numeros en filas
    var randomNumbers = [];
    var turns = 0; //recorre randomNumbers en busca de coincidencia con bingoCard
    var showedLine1 = 0; //mostrar solo una vez el mensaje de LINEA!! al completar la linea
    var showedLine2 = 0;
    var showedLine3 = 0;
    var points = null;

    var player = {name: null, points: null};

    player.name = prompt('Introduzca su nombre.');
    alert('Bienvenido ' + player.name);
    alert('Sistema de Puntos:\n' + '15 turnos -> 1000 puntos.\n' +
                '16 a 19 turnos -> 800 puntos.\n' + '20 a 24 turnos -> 600 puntos.\n' +
                '25 a 27 turnos -> 400 puntos.\n' + '28 a 29 turnos -> 300 puntos.\n' + 
                '30 turnos -> 200 puntos.\n');
    createCard();
    random(); //obetnemos nuevos numeros para compararlos con la bingoCard
    newTurn();
    return 'Ciao';
        
    function newTurn() {
        if (bingoCard.every((x => x.matched === true)) === true) {
            ranking();
            var newGame = confirm('Desea empezar una nueva partida?');
            if (newGame === true) {
                bingo();
                return;
            }
            else return;
        }
        var turn = confirm('Desea continuar?');
        if (turn === true) {
            alert('El numero es el ' + randomNumbers[turns]);
            bingoCard.forEach(function(item) {
            if (item.number  === randomNumbers[turns]) {
                item.matched = true;
            }
            });
            turns++;
            showNumbers();
            newTurn();
        }
        else return;
    }

    function createCard () {
        random();  
        bingoCard.forEach(function(item, index) { //introduce los primeros 15 numeros aleatorios de randomNumbers en bingoCard
            item.number = randomNumbers[index];
        });
        showNumbers();
        var carton = confirm('Desea mantener este carton?');
        if (carton === false) createCard();
        else return;
    }

    function random() { //crea un array de 30 numeros del 1 al 20 ordenados aleatoriamente
        for (i=0; i<30; i++) randomNumbers[i] = i + 1;
        var currentIndex = randomNumbers.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = randomNumbers[currentIndex];
            randomNumbers[currentIndex] = randomNumbers[randomIndex];
            randomNumbers[randomIndex] = temporaryValue;
        }
    }

    function showNumbers() {
        bingoCard.forEach(function(item, index) {
            if (item.matched === true) numbers[index] = 'X';
            else numbers[index] = item.number;
        });
        if (numbers.slice(0,5).every((x => x === 'X')) === true && showedLine1 === 0) {
            alert(numbers.slice(0,5) + ' -> LINEA!!\n' + numbers.slice(5,10) + '\n' + numbers.slice(10,15));
            showedLine1 = 1; 
        }
        else if (numbers.slice(5,10).every((x => x === 'X')) === true && showedLine2 === 0) {
            alert(numbers.slice(0,5) + '\n' + numbers.slice(5,10) + ' -> LINEA!!\n' + numbers.slice(10,15));
            showedLine2 = 1;
        }
        else if (numbers.slice(10,15).every((x => x === 'X')) === true && showedLine3 === 0 ) {
            alert(numbers.slice(0,5) + '\n' + numbers.slice(5,10) + '\n' + numbers.slice(10,15) + ' -> LINEA!!');
            showedLine3 = 1;
        }
        else alert(numbers.slice(0,5) + '\n' + numbers.slice(5,10) + '\n' + numbers.slice(10,15));
    }

    function ranking() {
        switch (true) {
                case (turns === 15):
                    points = 1000;
                    break;
                case (turns >= 16 && turns < 20):
                    points = 800;
                    break;
                case (turns >= 20 && turns < 25):
                    points = 600;
                    break;
                case (turns >= 25 && turns <28):
                    points = 400;
                    break;
                case (turns >= 28 && turns < 30):
                    points = 300;
                    break;
                case (turns === 30):
                    points = 200;
                    break;
        }
        alert('Bingo completado en ' + turns + ' turnos' + ' tu puntuacion es: ' + points + ' puntos.');
        player.points = points;
        players.push(player);
        players.sort(compare);
        alert('RANKING!!')
        players.forEach(function(item,index) {
            alert('Posicion ' + (index + 1) + ' -> ' + item.name +  ' -> ' + item.points + ' puntos');
        });
        }

    function compare (a, b) { //pasamos como parametro a .sort para ordenar por puntuacion
        if (a.points < b.points) return 1;
        if (a.points > b.points) return -1;
        return 0;
    }
}
