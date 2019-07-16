var bingoCard = [];
var user = {name: 'anon', puntos: 100, turnos: 0};
var ranking = []
var numerosBingo = []
var cantobingo = false

function welcome(){
    user.name = '';
    user.name = prompt('¿Cuál es tu nombre?');
    user.puntos = 100;
    user.turnos = 0;
    numerosBingo = []
    cantobingo = false
    var message1 = `¡Bienvenido, ${user.name}!`
    var separator = '-'
    var message2 = `Este es el bingo que he diseñado para ti. No difiere mucho de cualquier otro bingo:\n
- Recibirás un cartón con 15 números.\n
- En cada nuevo turno saldrá una bola aleatoria del bombo.\n
- Si la bola coincide con un número de tu cartón, se tachará automáticamente.\n
- Cuando completes una línea, el sistema la detectará y la cantará.\n
- Y cuando completes todos los números de tu cartón, ¡Bingo!\n
- Por cierto: como soy un bingo magnánimo, comienzas con 100 puntos...\n
- ... y perderás un punto por turno, porque soy magnánimo y cruel.\n
- Pero ganarás 5 puntos por cada línea, y 10 puntos por el bingo.\n
- Si abandonas el juego antes de terminar, tu puntuación será 0. \n
- Me olvidaba: podría haber alguna pequeña, pequeñísima penalización escondida por allí :)\n
- ¡Mucha suerte, ${user.name}!`
    console.log(`${message1}\n${separator.repeat(message1.length)}\n${message2}`)
    var continuar = confirm('¿Deseas comenzar a jugar?');
    switch(continuar){
        case true:
            bingoCardGenerator();
            break;
        case false:
            console.log(`¡Hasta luego, ${user.name}! ¡Vuelve cuando estés listo!`);
            break;
    }
}

function bingoCardGenerator(){
    bingoCardAttempt()
    var bingoCardMessage = `Jugador: ${user.name}, ${user.puntos} puntos, ${user.turnos} turnos.`
    var separator = '-';
    console.log(bingoCardMessage);
    console.log('Este es tu cartón:\n')
    for (var i = 0; i < bingoCard.length; i++){
        var lineaActualizada = []
        for (var j in bingoCard[i]){
            lineaActualizada.push(bingoCard[i][j].number)
        }
        console.log(lineaActualizada.join(' | '));
    }
    continuar = confirm(`${user.name}: si te gusta tu cartón, presiona OK para continuar...\nSi no te gustan tus números, presiona ESC... Voy a generarte un nuevo cartón, pero recuerda que todo tiene un precio :)`);
    switch(continuar){
        case true:
            console.log(`¡A jugar entonces, ${user.name}!\n${separator.repeat(bingoCardMessage.length)}`)
            bingo();
            break;
        case false:
            alert(`Ufff, cuánto trabajo me das, ${user.name}... te quitaré 5 puntos... creo que es un precio justo.`);
            user.puntos = user.puntos-5;
            console.log(`Regenerar cartón del pesado de ${user.name} || Costo: 5 puntos.`)
            bingoCardGenerator()
            break;

    }
}

function randomNumber(yaSalieron){
    var number = Math.floor(Math.random() * 50) + 1;
    while(yaSalieron.includes(number)){
        number = Math.floor((Math.random() * 50) + 1);
    }
    return number
}

function bingoCardAttempt(){
    var controlArray = []
    var preBingoCard = []
    for (var i = 0; i < 15; i++){
        var number = randomNumber(controlArray)
        controlArray.push(number)
    };
    for (var i = 0; i < 15; i++){
        preBingoCard.push({number: controlArray[i], matched: false})
    }
    bingoCard[0] = preBingoCard.slice(0, 5);
    bingoCard[1] = preBingoCard.slice(5, 10);
    bingoCard[2] = preBingoCard.slice(10, 15);
}

function bingo(){
    linea = {1: false, 2: false , 3: false}
    for (var i = 0; i<numerosBingo.length; i++){
        for (var j = 0; j<bingoCard.length; j++){
            for (var k = 0; k<bingoCard[j].length; k++){
                if(bingoCard[j][k].number === numerosBingo[i]){
                console.log(`¡MATCH! ¡El número ${numerosBingo[i]} está en la línea ${j+1}!`);
                bingoCard[j][k].number = 'X'
                bingoCard[j][k].matched = true
                }
            }
        }
    }
    console.log('Este es tu cartón actualizado:')
    for (var i = 0; i < bingoCard.length; i++){
        var lineaActualizada = []
        for (var j in bingoCard[i]){
            lineaActualizada.push(bingoCard[i][j].number)
        }
        console.log(lineaActualizada.join(' | '));
    }
    for (var i = 0; i < bingoCard.length; i++){
        switch(linea[i+1]){
            case true:
                break;
            case false:
            var counter = 0
            for (var j in bingoCard[i]){
                if(bingoCard[i][j].matched === true){
                    counter++
                }
            }
            if (counter === 5){
                console.log(`¡LÍNEA! ¡Has completado la línea ${i+1}!`)
                linea[i+1] = true
            }
        }
    }
    if (linea[1] === true && linea[2] === true && linea[3] === true){
        victory();
    } else {
        preguntarNuevoTurno()
    }
}


function preguntarNuevoTurno(){
    var nuevoturno = confirm('¿Sacamos una bolilla?');
    switch (nuevoturno){
        case true:
            turno();
            break;
        case false:
            var seguro = confirm('Perderás todos tus puntos, ¿Seguro que quieres salir?\nPresiona OK si quieres salir, o ESC para volver');
            switch(seguro){
                case true:
                    user.puntos = 0
                    console.log(`¡Adiós, ${user.name}!`);
                    scoring();
                    break;
                case false:
                    preguntarNuevoTurno();
                    break;
            }
    }
}

function turno(){
    user.turnos++
    user.puntos--
    console.log(`TURNO Nº ${user.turnos} || Jugador: ${user.name}, ${user.puntos} puntos`);
    bombo()
};

function bombo(){
    var bolilla;
    bolilla = randomNumber(numerosBingo);
    numerosBingo.push(bolilla);
    console.log(`¡${bolilla}! Vamos a ver si hay coincidencia...`)
    bingo()
}

function victory(){
    cantobingo = true
    user.puntos = user.puntos+10
    console.log(`¡¡¡BINGO!!!\nFinalmente has logrado vencerme, ${user.name}...\nAcepto la derrota... con moderada humildad.`);
    scoring()
}

function scoring(){
    var bingoface
    var mensajeRanking1 = 'RANKING DE POSICIONES'
    var mensajeRanking2 = `(:D --> Hizo bingo || :'( --> Abandonó la partida)`
    var separator = '-';
    if(cantobingo === false){
        bingoface = ':\'('
    } else if (cantobingo === true){
        bingoface = ':D'
    };
    ranking.push({name: user.name, puntos: user.puntos, turnos: user.turnos, bingo: bingoface});
    ranking.sort((a,b) => (a.puntos < b.puntos) ? 1 : ((b.puntos < a.puntos) ? -1 : 0));
    console.log(`${mensajeRanking1}\n${mensajeRanking2}\n${separator.repeat(mensajeRanking2.length)}`);
    for (var i = 0; i < ranking.length; i++){
        console.log(`${i+1}. ${ranking[i].name}, ${ranking[i].puntos} puntos, ${ranking[i].turnos} turnos, ${ranking[i].bingo}.`);
    };
    continuar = confirm('Presiona OK para jugar nuevamente, o ESC para salir:')
    switch(continuar){
        case true:
            welcome();
            break;
        case false:
            console.log(`${separator.repeat(mensajeRanking2.length)}\n¡Adiós, ${user.name}!\n${separator.repeat(mensajeRanking2.length)}`);
            break;
    }
}
welcome()