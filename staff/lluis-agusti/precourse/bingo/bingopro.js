function bingo() {

    var name = [];
    var preCarton = [];
    var linea1 = [];
    var linea2 = [];
    var linea3 = [];
    var matchedNumbers = [];
    var numberOfTurns = [];
    var rankingPosition = [];
    var indexCarton = [];


    // Ranking

    function ranking() {
        if (numberOfTurns.length < 60) {
            rankingPosition = 100;
            alert("Wow! Felicidades! Su puntuación: " + rankingPosition);
            console.log("Wow! Felicidades! Su puntuación: " + rankingPosition);
        } else if (numberOfTurns.length >= 60 && numberOfTurns.length < 80) {
            rankingPosition = 50;
            alert("Felicidades! Su puntuación: " + rankingPosition);
            console.log("Felicidades! Su puntuación: " + rankingPosition);
        } else if (numberOfTurns.length >= 80 && numberOfTurns.length < 110) {
            rankingPosition = 25;
            alert("Felicidades! Su puntuación: " + rankingPosition);
            console.log("Felicidades! Su puntuación: " + rankingPosition);
        } else if (numberOfTurns.length >= 110 && numberOfTurns.length < 150) {
            rankingPosition = 15;
            alert("Felicidades! Su puntuación: " + rankingPosition);
            console.log("Felicidades! Su puntuación: " + rankingPosition);
        } else {
            rankingPosition = 5;
            alert("Ha terminado! Su puntuación: " + rankingPosition);
            console.log("Ha terminado! Su puntuación: " + rankingPosition);
        }
    }

    // Nuevo cartón

    function newCarton() {
        var preCarton = [];
        for (var i = 0; preCarton.length < 15; i++) {
            var number = Math.floor(Math.random() * 99) + 1;
            if (preCarton.includes(number)) {} else {
                preCarton.push(number);
            }
        }

        function sliceCarton() {
            linea1 = preCarton.slice(0, 5);
            linea2 = preCarton.slice(5, 10);
            linea3 = preCarton.slice(10, 15);
        }
        sliceCarton();

        console.log("Se ha generado el siguiente cartón:");
        console.log(linea1);
        console.log(linea2);
        console.log(linea3);
    }

    // Cartón OK?

    function askCarton() {

        var nextCarton = prompt("¿Le gusta en cartón? ¿Quiere jugar? Escriba Yes o No.");
        console.log("¿Le gusta en cartón? ¿Quiere jugar? Escriba Yes o No.");
        switch (nextCarton) {
            case "Yes":
            case "yes":
            case "YES":
            case "yES":
                console.log("Empecemos!")
                turn();
                break;
            case "No":
            case "no":
            case "nO":
            case "NO":
                console.log("No le ha gustado el cartón.")

                function askOtherCarton() {
                    var yesOrNot = prompt("¿Desea otro cartón? Escriba Yes o No. Si no desea otro cartón saldrá del programa.");
                    console.log("¿Desea otro cartón? Escriba Yes o No. Si no desea otro cartón saldrá del programa.");
                    switch (yesOrNot) {
                        case "Yes":
                        case "yes":
                        case "YES":
                        case "yES":
                            console.log("Generando nuevo cartón.");
                            preCarton = [];
                            linea1 = [];
                            linea2 = [];
                            linea3 = [];
                            newCarton();
                            askCarton();
                            break;
                        case "No":
                        case "no":
                        case "nO":
                        case "NO":
                            console.log("No le ha gustado el cartón. Saliendo...");
                            endProgram();
                            break;
                        default:
                            console.log("Debe escribir Yes o No");
                            askOtherCarton();
                            break;
                    }
                }
                askOtherCarton();
                break;
            default:
                console.log("Debe escribir Yes o No");
                askCarton();
                break;
        }
    }

    // Turno

    function turn() {
        var randomTemporary = generarRandom();

        function generarRandom() {
            var numberBombo = Math.floor(Math.random() * 99) + 1;
            //console.log("Ha salido el " + numberBombo + ".");
            if (numberOfTurns.includes(numberBombo)) {
                //console.log("Ha salido uno repetido. El " + numberBombo + ". No cuenta como turno.");
                generarRandom();
            } else {
                console.log("Ha salido el " + numberBombo + ", " + tradicionViejuna(numberBombo) + ".");
                numberOfTurns.push(numberBombo);
                randomTemporary = Number(numberBombo);
                xInsteadNumber();
            }
        }
      
    // Eso que dicen en el Bingo
      
    function tradicionViejuna(whatever) {
    switch (whatever) { case 1: return "El Galán"; break; case 2: return "El Sol"; break;case 3: return "El Niño"; break;case 4: return "La Cama"; break;case 5: return "La Espina"; break;case 6: return "El Corazón"; break;case 7: return "La Pipa"; break;case 8: return "La Dama"; break;case 9: return "El Zapato"; break;case 10: return "La Rosa"; break;case 11: return "El Clavel"; break;case 12: return "Los Huesos"; break;case 13: return "La Mala Pata"; break;case 14: return "La Cerveza"; break;case 15: return "La Niña Bonita"; break;case 16: return "La Guitarra"; break;case 17: return "El Barco"; break;case 18: return "Los Ojos"; break;case 19: return "San José"; break;case 20: return "El Tío Del Queso"; break;case 21: return "La Primavera"; break;case 22: return "Los Patitos"; break;case 23: return "El Melón"; break;case 24: return "Nochebuena"; break;case 25: return "Navidad"; break;case 26: return "Los Pollos"; break;case 27: return "La Pajarera"; break;case 28: return "Alicante"; break;case 29: return "El Viaje"; break;case 30: return "El León"; break;case 31: return "Los Caballos"; break;case 32: return "La Bomba"; break;case 33: return "La Edad De Cristo"; break;case 34: return "El Garrote"; break;case 35: return "El Fuego"; break;case 36: return "La Sangre"; break;case 37: return "La Puñalá"; break;case 38: return "El Perro"; break;case 39: return "El Toro"; break;case 40: return "La Campana"; break;case 41: return "El Carbón"; break;case 42: return "La Estrella"; break;case 43: return "La Corona"; break;case 44: return "Los Tacones"; break;case 45: return "El Tambor"; break;case 46: return "El Sombrero"; break;case 47: return "El Mundo"; break;case 48: return "La Negra"; break;case 49: return "La Breva"; break;case 50: return "El Cartucho"; break;case 51: return "La Cabra"; break;case 52: return "El Tomate"; break;case 53: return "El Pimiento"; break;case 54: return "El Cólera"; break;case 55: return "Los Civiles"; break;case 56: return "La Lechuga"; break;case 57: return "La Zanahoria"; break;case 58: return "Los Limones"; break;case 59: return "El Canario"; break;case 60: return "La Abuela"; break;case 61: return "La Pipa"; break;case 62: return "El Piojo"; break;case 63: return "La Cebolla"; break;case 64: return "La Casa"; break;case 65: return "La Pelea"; break;case 66: return "Las Monjas"; break;case 67: return "El Cura-Fraile"; break;case 68: return "El Rosario"; break;case 69: return "La Postura"; break;case 70: return "El Albaricoque"; break;case 71: return "El Maestro"; break;case 72: return "El Higo"; break;case 73: return "El Conejo"; break;case 74: return "La Escalera"; break;case 75: return "El Gato"; break;case 76: return "El Agua"; break;case 77: return "Las Banderas"; break;case 78: return "La Cuchara"; break; case 79: return "El Cerdo"; break;case 80: return "La Lavandera"; break;case 81: return "El Matrimonio"; break;case 82: return "La Escupidera"; break;case 83: return "La Dama y El Niño"; break;case 84: return "El Casamiento"; break;case 85: return "La Palmera"; break;case 86: return "La Mierda"; break;case 87: return "El Pescado"; break;case 88: return "Las Preñadas"; break;case 89: return "Ls Gamba"; break;case 90: return "El Abuelo"; break;case 91: return "El Borracho"; break;case 92: return "Los Palomos"; break;case 93: return "La Revolución"; break;case 94: return "La Rata"; break;case 95: return "El Pavo"; break;case 96: return "El Paseo"; break;case 97: return "La Gallina"; break;case 98: return "El Borrego"; break;case 99: return "La Agonia"; break; }
    }
    
        function comprobador(whatever) {
            return whatever == "X";
        }

        function xInsteadNumber() {
            if (linea1.every(comprobador) === true && linea2.every(comprobador) === true && linea3.every(comprobador) === true) {
                endProgramForWinners();
            } else if (linea1.includes(randomTemporary) === true) {
                matchedNumbers.push(randomTemporary);
                indexCarton = linea1.findIndex(whatever => whatever === randomTemporary);
                linea1[indexCarton] = "X";
                console.log("El número " + randomTemporary + " está en su cartón! Estado actual del cartón:");
                console.log(linea1);
                console.log(linea2);
                console.log(linea3);
                if (linea1.every(comprobador) === true && linea2.every(comprobador) === false &&linea3.every(comprobador) === false) {
                    console.log("Línea! Seguimos jugando!");
                    alert("Línea! Seguimos jugando!");
                    oneMoreTurn();
                } else {
                    oneMoreTurn();
                }

            } else if (linea2.includes(randomTemporary) === true) {
                matchedNumbers.push(randomTemporary);
                indexCarton = linea2.findIndex(whatever => whatever === randomTemporary);
                linea2[indexCarton] = "X";
                console.log("El número " + randomTemporary + " está en su cartón! Estado actual del cartón:");
                console.log(linea1);
                console.log(linea2);
                console.log(linea3);
                if (linea2.every(comprobador) === true && linea1.every(comprobador) === false &&linea3.every(comprobador) === false) {
                    console.log("Línea! Seguimos jugando!");
                    alert("Línea! Seguimos jugando!");
                    oneMoreTurn();
                } else {
                    oneMoreTurn();
                }

            } else if (linea3.includes(randomTemporary) === true) {
                matchedNumbers.push(randomTemporary);
                indexCarton = linea3.findIndex(whatever => whatever === randomTemporary);
                linea3[indexCarton] = "X";
                console.log("El número " + randomTemporary + " está en su cartón! Estado actual del cartón:");
                console.log(linea1);
                console.log(linea2);
                console.log(linea3);
                if (linea3.every(comprobador) === true && linea2.every(comprobador) === false &&linea1.every(comprobador) === false) {
                    console.log("Línea! Seguimos jugando!");
                    alert("Línea! Seguimos jugando!");
                    oneMoreTurn();
                } else {
                    oneMoreTurn();
                }

            } else if (linea1.includes(randomTemporary) === false) {
                oneMoreTurn();
            } else if (linea2.includes(randomTemporary) === false) {
                oneMoreTurn();
            } else if (linea3.includes(randomTemporary) === false) {
                oneMoreTurn();
            }
        }
        //xInsteadNumber(); ----------> Aquí estaba el problema!
        }

        // Otro turno?

        function oneMoreTurn() {
            var pregunta = confirm("¿Sacamos un número del bombo?");
            if (pregunta === true) {
                turn();
            } else {
                alert("Ha seleccionado no continuar.");
                console.log("Ha seleccionado no continuar.");
                endProgram();
            }
        }


        // Inicio

        function start() {
            console.log("INCIO DE PROGRAMA");

            function userName() {
                name = prompt("Bienvenid@! Introduzca su nombre.");
                if (typeof name != "string") {
                    alert("Por favor, escriba su nombre.");
                    userName();
                } else if (name.trim().length === 0) {
                    alert("Por favor, escriba su nombre.");
                    userName();
                } else {
                    alert("Bienvenid@ " + name + ".");
                    console.log("Bienvenid@ " + name + "."); // no hauria de poder estar empty!
                    console.log("Ranking : \n  Hacer bingo en menos de 60 turnos: 100 puntos \n  Hacer bingo en menos de 80 turnos: 50 puntos \n  Hacer bingo en menos de 110 turnos: 25 puntos \n  Hacer bingo en menos de 150 turnos: 15 puntos \n  Hacer bingo en más de 150 turnos: 5 puntos");
                }
            }
            userName();
            console.log("¿Quiere jugar una partida?");
            var startButton = confirm("¿Quiere jugar una partida?");
            switch (startButton) {
                case false:
                    alert("Ha seleccionado no jugar una partida.");
                    console.log("Ha seleccionado no jugar una partida.");
                    break;
                case true:
                    console.log("Inicio de partida.");
                    newCarton();
                    askCarton();
                    //oneMoreTurn();
                    break;
            }
        }
        start();


        // Función salida + no ranking + ciao!

        function endProgram() {
            console.log("¿Por qué se va? Ha hecho " + numberOfTurns.length + " turnos.");
            if (numberOfTurns.length == 0) {
                console.log("Queda excluido del ranking.");
                console.log("No se admiten devoluciones.");
                console.log("Ciao!");
            } else {
                console.log("Han coincidido los números => " + matchedNumbers);
                console.log("Estado final del cartón => ");
                console.log(linea1);
                console.log(linea2);
                console.log(linea3);
                console.log("Al no haber terminado la partida queda excluid@ del ranking.");
                console.log("No se admiten devoluciones.");
                console.log("Ciao!");
            }
        }


        // Función salida + ranking + play again? + ciao!

        function endProgramForWinners() {
            console.log("BINGO! Ha ganado!");
            console.log("Ha realizado " + numberOfTurns.length + " turnos.");
            console.log("Han coincidido los números => " + matchedNumbers);
            console.log("Estado final del cartón => ");
            console.log(linea1);
            console.log(linea2);
            console.log(linea3);
            ranking();
            var winnerYesOrNot = confirm("¿Desea jugar otra partida?");
            console.log("¿Desea jugar otra partida?");
            switch (winnerYesOrNot) {
                case true:
                    console.log("Ha seleccionado jugar otra partida.");
                    numberOfTurns = [];
                    matchedNumbers = [];
                    preCarton = [];
                    linea1 = [];
                    linea2 = [];
                    linea3 = [];
                    newCarton();
                    turn();
                    break;
                case false:
                    console.log("Ha seleccionado no jugar otra partida.")
                    console.log("Ciao!");
                    break;
                default:
                    console.log("Debe escribir Yes o No");
                    break;
            }
        }
        console.log("Si cree que tiene un problema con el juego, seguramente lo tiene. Contacte con Jugadores Anónimos: +34933457318.");
        console.log("FIN DE PROGRAMA");

        }
        bingo();

        // END 