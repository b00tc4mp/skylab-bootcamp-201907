 var boat4 = [];
    var boat3 = [];
    var boat2 = [];
    var boat = 0

    var board = [
        ["?", "?", "?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?", "?", "?"]
    ];
    var hireBoard = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    var totalBoats = 0;

    /*
    createBoat4();
    createBoat3();
    createBoat2();
    */

    createBoats();

    console.table(board)
    console.table(hireBoard)
    newGame();


    //cada vez que hunda un barco boat ++; 

    function newGame() {

        while (boat != totalBoats) {
            var askPosition = prompt("Introduce las coordenadas con espacio del 0 al 6. Por ejemplo: 3 6")
            alert("totalBoats: " + totalBoats + " - boat: " + boat)
            if (askPosition) {
                var number = askPosition.split(" ");
                for (var i = 0; i < number.length; i++) {
                    if (!isNaN(number[i]) && number[i] != "" && number[i] >= 0 && number[i] < 7) {
                        number[i] = parseInt(number[i])
                    } else {
                        alert("Debes introducir dos números comprendidos entre el 0 y el 6")
                        askPosition = prompt("Introduce las coordenadas con espacio del 0 al 6. Por ejemplo: 3 6")
                    }

                }

                checkIfBoat(number);
            }else{
              break;
            }

        }
    }

    function checkIfBoat(numbers) {
        var number1 = 0;
        var number2 = 0
        var aux = 0;
        for (var i = 0; i < numbers.length; i++) {
            number1 = numbers[0];
            number2 = numbers[1];
        }

        if (hireBoard[number1][number2] == 0) {
            hireBoard[number1][number2] = "X"
            board[number1][number2] = "🌊"
            alert("agua")
        } else if (hireBoard[number1][number2] == 2) {
            hireBoard[number1][number2] = "9";
            for (var i = 0; i < boat2.length; i++) {

                if (boat2[i] == 2) {
                    boat2[i] = 9
                    break
                }
            }

            for (var i = 0; i < boat2.length; i++) {
                if (boat2[i] == 9) {
                    aux++;
                }
            }

            if (aux == 2) {
                board[number1][number2] = "🏴‍☠️"
                alert("Hundido");
                boat++;
            } else {
                board[number1][number2] = "🚢"
                alert("Tocado")
                aux = 0
            }

        } else if (hireBoard[number1][number2] == 3) {
            hireBoard[number1][number2] = "8";
            for (var i = 0; i < boat3.length; i++) {

                if (boat3[i] == 3) {
                    boat3[i] = 8
                    break
                }
            }

            for (var i = 0; i < boat4.length; i++) {
                if (boat3[i] == 8) {
                    aux++;
                }
            }

            if (aux == 3) {
                board[number1][number2] = "🏴‍☠️"
                alert("Hundido");
                boat++;
            } else {
                board[number1][number2] = "🚢"
                alert("Tocado")
                aux = 0
            }

        } else if (hireBoard[number1][number2] == 4) {
            hireBoard[number1][number2] = "7";

            for (var i = 0; i < boat4.length; i++) {

                if (boat4[i] == 4) {
                    boat4[i] = 7
                    break
                }
            }

            for (var i = 0; i < boat4.length; i++) {
                if (boat4[i] == 7) {
                    aux++;
                }
            }

            if (aux == 4) {
                board[number1][number2] = "🏴‍☠️"
                alert("Hundido");
                boat++;
            } else {
                board[number1][number2] = "🚢"
                alert("Tocado")

                aux = 0
            }


        } else {
            alert("Coordenadas repetidas")
        }


        console.table(board)
        console.table(hireBoard)



    }

    function createBoats(){

      var boatLayout = [
        { boatSize: 4, arrayUsed: boat4, totalBoats: 1 },
        { boatSize: 3, arrayUsed: boat3, totalBoats: 3 },
        { boatSize: 2, arrayUsed: boat2, totalBoats: 2 },
      ] 

      for(var layoutIndex = 0; layoutIndex < boatLayout.length; layoutIndex++){

        totalBoats += boatLayout[layoutIndex].totalBoats;
        console.log("totalBoats: " + totalBoats)

        for(var total = 0; total < boatLayout[layoutIndex].totalBoats; total++){

          var boatCreated = false;

          while(!boatCreated){

            x = numberRandomX(hireBoard[0].length - boatLayout[layoutIndex].boatSize);
            y = numberRandomY();

            let boatFits = true;
            for(var i = 0; i < boatLayout[layoutIndex].boatSize; i++){
              if(hireBoard[y][x + i] !== 0){
                boatFits = false;
              }
            }

            if(boatFits){

              for (var i = 0; i < boatLayout[layoutIndex].boatSize; i++) {
                hireBoard[y][x] = boatLayout[layoutIndex].boatSize;
                boatLayout[layoutIndex].arrayUsed.push(hireBoard[y][x]);
                x++;
              }

              boatCreated = true;

            }

          }

        }

      }

    } 

    function createBoat3() {
        var aux = 0;
        var position1 = numberRandomX();
        var position2 = numberRandomY();
        for (var i = 0; i < 3; i++) {
            if (hireBoard[position1][position2] !== 0) {
                aux = 0; //no hace falta ponerlo verdad?
                createBoat3();

            } else if (hireBoard[position1][position2] == 0) {
                aux++
            }
            position2++;
            boat3.push(hireBoard[position1][position2]);
        }

        if (aux == 3) {
            hireBoard[position1][position2 - 2] = 3;
            hireBoard[position1][position2 - 1] = 3
            hireBoard[position1][position2] = 3

        }
    }

    function createBoat2() {
        var aux = 0;
        var position1 = numberRandomX();
        if (position1 == 7) {
            position1 = numberRandomX();
        }
        var position2 = numberRandomY();
        for (var i = 0; i < 2; i++) {
            if (hireBoard[position1][position2] !== 0) {
                aux = 0; //no hace falta ponerlo verdad?
                createBoat2();

            } else if (hireBoard[position1][position2] == 0) {
                aux++
            }
            position2++;
            boat2.push(hireBoard[position1][position2]);
        }

        if (aux == 2) {
            hireBoard[position1][position2 - 1] = 2;
            hireBoard[position1][position2] = 2;
        }
    }

    console.table(board)
    console.log(hireBoard)


    //usuario mete coordenadas, si las mete mal debe repetir
    //Si hay barco --> Tocado
    //Si consigue el barco entero hundido
    //Si no hay barco agua
    //Si todos los barcos esta encontrados ha ganado.

    function numberRandomX(maxNumber) {
        return Math.floor(Math.random() * (hireBoard[0].length - maxNumber));
    }

    function numberRandomY() {
        return Math.floor((Math.random() * hireBoard.length));
    }