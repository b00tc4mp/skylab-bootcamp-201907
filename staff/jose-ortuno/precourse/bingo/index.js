console.log('¡Bienvenido al Bingo Skylab! Para comenzar llama a la función bingo')
/*
PROYECTO 3 - BINGO

Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse. 
Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), para pasar al siguiente 
turno el usuario deberá confirmar mediante confirm() visualizandose otro número, si coincide con alguno de los 
existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará, al final de cada turno, con los cambios 
efectuados, indicando al usuario qué número se ha encontrado. El programa deberá preguntar al usuario al inicio de 
cada turno si desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.
Por supuesto, cuando todos los números de una misma línea sean "X", mostrará un mensaje "LÍNEA!", pero la ejecución 
seguirá, el juego solo acabará cuando todos los números estén a "X".
Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. Por último, deberá 
preguntar si desea volver a jugar.

--> Empieza por la versión más básica!
    -> Why?
        Comenzar por una versión muy pequeña y básica nos hará tener un programa de principio a fin, es decir, que empieza, 
        que acaba y haga lo que queramos a muy pequeña escala, una vez lo tengamos todo bien dividido podremos empezar a 
        extenderlo tanto como queramos.

        ¡! Si funciona con 5 números deberá funcionar con 15, no?

    -> Requisitos de la versión mínima:
        Cartón con solo 5 números, sin necesidad de ser generados random. Solo necesitamos un número random cuando recorramos 
        el cartón y veamos si hay alguna coincidencia. No necesitamos asegurarnos que el número random de cada turno no haya 
        salido en turnos anteriores, recuerda que estamos en la mínima versión posible, eso ya lo solucionaremos. 
        Si hay coincidencia, vamos a reemplazar el número por una 'X' y mostramos el cartón modificado
        Separarlo todo en funciones, englobado en una función global llamada bingo(), tal que:

            function()=> Generar Numero Random Bombo
            function()=> Nuevo turno (Match carton[i] === randomNum)
            function() => Preguntar Nuevo Turno

PRO
    --> Cuando se muestre la carta, se preguntará al usuario si realmente quiere ese cartón o generar otro, si realmente quiere ese
        cartón, deberá responder "Yes" para proceder
    --> Establece un sistema de puntos, en cuantos más turnos se complete el cartón, menos puntos (el sistema de puntos intégralo
        como quieras), por el contrario, a menos turnos, más puntos.
    --> Antes de empezar el juego, muestra el sistema de puntos al usuario.
    --> Ranking de usuarios (ordenado por puntos).

SUMARIO
    --> Jugadores
    --> Generador de números
    --> Match
    --> Bombo
    --> Cartones
    --> Puntos
    --> Ciao!
*/

// JUGADORES
// Objeto donde guardanmos el listado de jugadores
var players = [];
// Variables para iniciar el juego: Jugador y bienvenida
var player;
var playerV;
var verify;
var carton;
var k = 0;

// Constructor del objeto de jugadores.
function listPlayers (id, player, line, line1, line2, line3, bingos, point, round, rxl, rxb) {
    this.configurable = true;
    this.enumerable = true;
    this.id = id;
    this.matches = [];
    this.player = player;
    this.line = line;
    this.line1 = line1;
    this.line2 = line2;
    this.line3 = line3;
    this.bingos = bingos;
    this.points = point;
    this.rounds = round;
    this.roundsxline = rxl;
    this.roundsxbingo = rxb;
    this.writable = true;
}

// Primero verificamos la introducción del nombre para que la casilla no se quede vacía:
function verificationTxt (txt) {
    if (txt == null) {
        bye ();
        verify = false;
    } else if (txt == '') {
        console.log('Has dejado la casilla vacía, prueba de nuevo.');
        verify = false;
    } else {
        var v = txt.toUpperCase();
        verify = true;
        return v;
    }
}
var lastPlayer = players.length;
// Pedimos el nombre al usuario y llamamos a la función verificadora. Un vez está todo correcto, saltamos al siguiente paso:
function bingo () {
    // Por si iniciamos juego de nuevo
    if (players.length > 0) {
        players[lastPlayer].line1 = 0;
        players[lastPlayer].line2 = 0;
        players[lastPlayer].line3 = 0;
        players[lastPlayer].line = 0;
        players[lastPlayer].rounds = 0;
        players[lastPlayer].roundsxline = 0;
        players[lastPlayer].roundsxbingo = 0;
        numMatch = [];
        panels = [];
        playPanel = [];
    }
    // Nombre
    player = prompt('Por favor, introduce tu nombre y comenzamos a jugar');
    playerV = verificationTxt (player);
    if (verify === true) {
        var count = k++;
        // Guardamos el nombre del jugador en el objeto
        players[count] = new listPlayers (count+1, playerV, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        bingoWelcome();
    }
}
// Damos la bienvenida y preguntamos si quieren comprar un cartón
function bingoWelcome () {
    console.log('Hola ' + playerV + ', acabas de iniciar tu aventura en el bingo. Te deseamos toda la suerte del mundo.');
    carton = confirm('Hola ' + playerV + ' ¿Quieres comprar un cartón?');
    if (carton === true) {
        cardGenerator ();
    } else {
        bye ();
    }
}

// GENERADOR DE NÚMEROS aleatorios del 1 al 99
// Generador
function numbersGenerator () {
    return Math.round(Math.random() * (99 - 1) + 1);
}

// MATCH
// Guardamos cada partida aquí
var matches = [];
// Activar bombo para que saque un número
var play;
var idx1;
var idx2;
var idx3;
// Guardamos cada coincidencia aquí
var numMatch = [];

// Partida:
function match () {
    var x = playPanel.length - 1;
    var y = players.length - 1;
    var t = cards.length - 1;

    // Primero comprobamos si es el inicio de la partida
    if (playPanel.length == 0 && z !== 15) {
        console.log('Comenzamos el bingo:');
        players[y].rounds += 1;
        getBombo ();
    } else {
        // Abrimos turno y mostramos la bola
        console.log('--------------------- \nNUEVO TURNO: ¡Bombo rodando! (' + players[y].rounds + ')');
        console.log('Ha salido el número: ' + playPanel[x]);

        // En el caso que hayan coincidencias:
        /* En orden:
            1. Buscamos coincidencia en cada línea
            2. Una vez encontrada, dentro de la línea encontramos el índice dondde está la coincidencia
            3. Gracias a ese dato podemos substituir el valor por un array
            4. Contabilizamos el acierto y reseteamos el índice.
        */
        if (cards[t].line1.includes(playPanel[x]) == true) {
            idx1 = cards[t].line1.indexOf(playPanel[x]);
            console.log('¡Felicidades tienes una coincidencia en la línea 1!');
            cards[t].line1.splice(idx1, 1, 'X');
            console.log('Tachado en linea 1 posición ' + (idx1+1));
            numMatch.push(playPanel[x]);
            players[y].line1 += 1;
            idx1 = -1;

        } else if (cards[t].line2.includes(playPanel[x]) == true) {
            idx2 = cards[t].line2.indexOf(playPanel[x]);
            console.log('¡Felicidades tienes una coincidencia en la línea 2!');
            cards[t].line2.splice(idx2, 1, 'X');
            console.log('Tachado en linea 2 posición ' + (idx2+1));
            numMatch.push(playPanel[x]);
            players[y].line2 += 1;
            idx2 = -1;
        } else if (cards[t].line3.includes(playPanel[x]) == true) {
            idx3 = cards[t].line3.indexOf(playPanel[x]);
            console.log('¡Felicidades tienes una coincidencia en la línea 3!');
            cards[t].line3.splice(idx3, 1, 'X');
            console.log('Tachado en linea 3 posición ' + (idx3+1));
            numMatch.push(playPanel[x]);
            players[y].line3 += 1;
            idx3 = -1;
        } else {
            console.log('¡Lo siento! No hay coincidencias. Sigue probando');
        }

        playCardPrint ();

        // Mostramos una línea con las coincidencias

        if (players[y].line !== 1) {
            if (players[y].line1 === 5) {
                players[y].points += 3;
                players[y].line += 1;
                players[y].roundsxline = players[y].rounds;
                console.log('--------------------- \n--------------------- \n--------------------- \n¡TENEMOS lÍNEA! Seguímos para Bingo. Línea 1 completa.');
                alert('¡TENEMOS LÍNEA!');
            } else if (players[y].line2 === 5) {
                players[y].points += 3;
                players[y].line += 1;
                players[y].roundsxline = players[y].rounds;
                console.log('--------------------- \n--------------------- \n--------------------- \n¡TENEMOS lÍNEA! Seguímos para Bingo. Línea 2 completa.');
                alert('¡TENEMOS LÍNEA!');
            } else if (players[y].line3 === 5) {
                players[y].points += 3;
                players[y].line += 1;
                players[y].roundsxline = players[y].rounds;
                console.log('--------------------- \n--------------------- \n--------------------- \n¡TENEMOS lÍNEA! Seguímos para Bingo. Línea 3 completa.');
                alert('¡TENEMOS LÍNEA!');
            } else {
                console.log('¡Seguimos jugando para línea!');
            }
        }

        // Imprimo los números eliminados:
        if (numMatch.length > 0) {
            console.log('--> Números tachados: ' + numMatch.length + '\n--> Números extraídos del bombo: ' + numMatch.join(', ') + '.');
        } else {
            console.log('No hay coincidencias por el momento.');
        }
    
        var z = players[y].line1 + players[y].line2 + players[y].line3;
        if (z === 15) {
            // Sumamos los puntos finales y el contador para el bingo
            players[y].points += 5;
            players[y].bingos += 1;
            players[y].roundsxbingo = players[y].rounds;
            
            // Guardamos los datos de los contadores históricos
            var q = players[y].matches.length;
            players[y].matches[q] = {
                roundsxline: players[y].roundsxline, 
                roundsxbingo: players[y].roundsxbingo, 
                cardPlay: cards[t].id, 
                cardNums: numMatch
            }

            // Imprimimos el bingo y el resumen de la partida
            console.log('--------------------- \n--------------------- \n--------------------- \n--------------------- \n--------------------- \n--------------------- \n¡TENEMOS BINGO!');
            console.log('RESUMEN:\n- Jugador: ' + players[y].player + '\n' + '- Total puntos: ' + players[y].points + '\n' + '- Rondas hasta la línea: ' + players[y].matches[q].roundsxline + '\n' + '- Rondas hasta el bingo: ' + players[y].matches[q].roundsxbingo);
            alert('¡TENEMOS BINGO!');

            // Una vez guardado, reseteamos los contadores temporales
            players[y].line1 = 0;
            players[y].line2 = 0;
            players[y].line3 = 0;
            players[y].line = 0;
            players[y].rounds = 0;
            players[y].roundsxline = 0;
            players[y].roundsxbingo = 0;
            numMatch = [];
            panels = [];
            playPanel = [];
            getOtherMatch ();
        } else {
            play = confirm('¿Otra bola?');
            if (play === true) {
                players[y].rounds += 1;
                getBombo ();
            } else if (playPanel.length === 99) {
                console.log('Ya no quedan más bolas en el bombo');
            } else {
                lastCall ();
            }
        }
    }
}

function getOtherMatch () {
    console.log('¿Quieres jugar de nuevo?');
    var otherMatch = confirm('¿Otra partida? Si quieres salir o cambiar de jugador pulsa [CANCELAR]');
    if (otherMatch) {
        cardGenerator ();
    } else {
        lastCall ();
    }
}
  
// BOMBO
// Array con todos los números que han salido en un mismo bombo
var panels = [];
var playPanel = [];

// Filtro para que no saque números repetidos en el bombo
function getBombo () {
    var num = numbersGenerator();
    if (playPanel.includes(num) === true) {
        getBombo();
    } else if (typeof num === 'undefined') {
        getBombo();
    } else if (num === 0) {
        getBombo();
    } else {
        playPanel.push(num);
        match ();
    }
}

// CARTONES
// Número de lineas y posiciones de cada línea
// ¡! MAX 3 Lines
var lines = 3;
// ¡! MAX 5 Positions
var positions = 5;

// Objetos donde guardamos los cartones: histórico de cartones e histórico de cartones
var cards = [];
var cardHist = [];

// Constructor inicial de cada cartón
function card (id) {
    this.configurable = true;
    this.enumerable = true;
    this.id = id;
    this.writable = true;
}

// Variables para el generador de cartones
var numCards = [];
var numLines = [];
var c = 0;

// Generador de cartones
function cardGenerator () {
    // Primero abrimos el objeto y los guardamos en cards
    var count = c++;
    cards[count] = new card (count+1);
    for (var i = 0; i < lines; i++) {
        // Luego le añadimos al objeto ya creado el valor de la linea
        var line = 'line'+(i+1);
        Object.defineProperty(cards[count],line,{
            value: numLines
        });
        for (var j = 0; j < positions; j++) {
            var num = numbersGenerator();
            // Igualamos a una variable el num random que devuelve esta función.
            if (numCards.includes(num) || !num || num == 0) { 
                j-- 
                /* Si el num cumple alguna de estos, lo unico que hacemos es restar 1 a la j, para que itere 
                de nuevo. De esta manera siempre nos dará 5 valores que no cumplan con esta condición.*/
            } else {
                numCards.push(num);
                numLines.push(num);
            } // Si todo ok, lo mismo que antes.
        }
        numLines = [];
    }
    numCards = [];
    
    console.log('Acabas de comprar un cartón:')
    playCardPrint ();
    points ();
    var playBingo = confirm('¿Estás preparado para comenzar a jugar?\n--> Descubre en la consola:\n - Tu cartón\n - Y el sistema de puntuación\n¡! Si pulsas cancelar abandonas el juego.')
    if (playBingo === true) {
        match ();
    } else if (playBingo === false) {
        bye ();
    }
}

// Imprimir cartón en juego
function playCardPrint () {
    var x = cards.length - 1;
    console.log('CARTÓN ID: ' + cards[x].id)
    if (lines === 3) {
        console.log('--> Línea 1: ' + cards[x].line1 + '\n' + '--> Línea 2: ' + cards[x].line2 + '\n' + '--> Línea 3: ' + cards[x].line3);
    } else if (lines === 2) {
        console.log('--> Línea 1: ' + cards[x].line1 + '\n' + '--> Línea 2: ' + cards[x].line2);
    } else if (lines === 1) {
        console.log('--> Línea 1: ' + cards[x].line1);
    }
}

// Imprimir histórico de cartones comprados
function totalCardPrint () {
    players.forEach(function(value,index,array) {
        console.log('RESUMEN TOTAL:\n- Jugador: ' + players[index].player + '\n' + '- Total puntos: ' + players[index].points);
        players[index].matches.forEach(function(value1,index1,array1) {    
            console.log('- PARTIDA: ' + index1+1 + '\n - CARTÓN: ' + players[index].matches[index1].cardPlay + '\n' + ' - Números del cartón jugado: ' + players[index].matches[index1].cardNums.join(', ') + '.');
        })
    })
}

// PUNTOS
// Explicación puntos
function points () {
     console.log('El sistema de puntuación funciona de la siguiente manera:\n- Por bingo la máquina te otorga 5 puntos\n- Por línea 3 puntos');
}

// Resumen total
function panel () {
    players.forEach(function(value,index,array) {
        console.log('RESUMEN TOTAL:\n- Jugador: ' + players[index].player + '\n' + '- Total puntos: ' + players[index].points);
        players[index].matches.forEach(function(value1,index1,array1) {    
            console.log('- PARTIDA: ' + index1+1 + '\n - Rondas hasta la línea: ' + players[index].matches[index1].roundsxline + '\n' + ' - Rondas hasta el bingo: ' + players[index].matches[index1].roundsxbingo);
        })
    })
} 

// CIAO!
function lastCall () {
    console.log('¿Qué quieres hacer?\nLlama a la función:\n--> bye - Si quieres terminar con esto\n--> bingo - Si quieres cambiar de jugador\n--> match - Si quieres seguir con la partida\n--> panel * - Si quieres ver el resumen total de las partidas\n--> totalCardPrint * - Si quieres imprimir todos los cartones jugados\n\n(*)Sólo mostrará datos si ha completado una ronda almenos.');
}

function reset () {
    cards = [];
    players = [];
}

function bye () {
    console.log('¡Hasta la próxima!\nLlama a la función:\n--> bingo - Si quieres comenzar de nuevo');
    reset ();
}