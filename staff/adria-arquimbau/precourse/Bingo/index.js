/*
coses que falten:
-crear carton de 15 numeros

*/


function bingoGame (){

    var name = '';
    var randomCarton = [];
    var randomNumber = '';
    var checkRepeat = [];
    var randomArray = [];

   // start();

   // function start(){ //tenia todo en funcion start para volver a inicializar pero he tenido que sacar y re-inicializar con bingo(), ya que no me funcionaba el randomizer()
        randomizer(100);
        userName();
        cartonRandom();
        
    //};

    function userName(){ // NOMBRE DE USUARIO
        name = prompt ('Introduce tu nombre de usuario.');
        alert('Bienvenido ' + name);
    };

    function randomizer(lengthOfArray){ //DEVOLVEMOS UNA ARRAY CON LOS X NUMEROS DESEADOS ALEATORIOS
        while(randomArray.length < lengthOfArray){ 
            var r = Math.floor((Math.random() * lengthOfArray) + 1);
                if((randomArray.indexOf(r) === -1)){
                    randomArray.push(r);
                }
        }
    };

    function cartonRandom(){ // GEENERAMOS CARTON RANDOM
        var randomNumber = '';
        for(var i=0; i<5; i++){
            randomNumber = Math.floor(Math.random() * 100);
            randomCarton[i] = randomNumber;
            randomNumber = '';
        }
        alert('Vamos a generarte un carton aleatorio.')
        mostrarCarton();
        cRn();
        function cRn(){//CONFIRMACION PARA SEGUIR CON CARTON ACTUAL O OTRO
        var cRnext = confirm(name +', en consola tienes tu nuevo carton aleatorio. Te gusta?');
            if(cRnext === true){
                alert('Genial! Vamos a sacar la primera bola...')
                intSeq();//LANZAMOS A FUNCION BUCLE INTERNA
            }else{
                cartonRandom();
            }
        };   
    };

    function intSeq(){//BUCLE INTERNO DE GENERAR NUM ALEATORIO CHEKEAR Y MARCAR
        checkNumber();
        repeat();//AL FINALIZAR LA COMPROBACION DE UN NUM EN TODAS CASILLAS PASAMOS A COMPROBACION DE LINEA
    };

    function mostrarCarton(){ //PARA MOSTRAR EL CARTON ACTUALIZADO
        console.log('Tu carton es el siguiente: ' + randomCarton);
    };

    function sacarNum(){
        randomNumber = randomArray.pop();   
        console.log('\n');
        console.log(`El numero que hemos sacado de la bolsa es el: ${randomNumber}!`);
        alert(`El numero que hemos sacado de la bolsa es el: ${randomNumber}!`);
    };

    function checkNumber(){ //CHEKEAMOS RECORRIENDO EL CARTON Y EN CASO DE QUE COINCIDA EL NUM IMPRIMIMOS MENSAJE DE ACIERTO O EN CASO QUE NO LO MISMO,
                            //A LA MISMA VEZ EN CASO DE COINCIDENCIA MODIFICAMOS EL NUM DEL CARTON POR UNA X
        sacarNum();// SACAMOS NUM ULTIMO DLE ARRAY CREADO DE NUMEROS //generateRanNum();   //GENERAMOS NUMERO ALEATORIO CADA VEZ QUE INICIAMOS FUNCION DE CHEKEAR NUMERO
        for(var i=0; i<randomCarton.length; i++){
            if(randomCarton[i] === randomNumber){
                randomCarton[i] = 'X';
                alert(`PREMIO! EL Numero: ${randomNumber} se encuentra en tu ${[i+1]}a casilla.`);
                console.log(`PREMIO! EL Numero :${randomNumber} se encuentra en tu ${[i+1]}a casilla.`);

            }else{
                console.log(`No tienes el numero: ${randomNumber} en tu casilla ${[i+1]}`);
            }
        }
        console.log('\n');
        mostrarCarton();
        console.log('Vamos a por el siguiente!');
    };

    

    function repeat(){//CHECK DE LINEA COMPLETA O NO
        for(var i=0; i<randomCarton.length; i++){
            if(randomCarton[i] === 'X'){
                checkRepeat[i] = 0;
            }else{
                checkRepeat[i] = 1;
            }
        }
        let sumCheckRepeat = checkRepeat.reduce((x,y) => x+y);
        if(sumCheckRepeat === 0){
            linea();//SI ESTA COMPLETADA PASAMOS A FUNC LINEA PARA VOLVER A JUGAR O SALIR
        }else{
            intSeq();//SI NO ESTA COMPLETA MANDAMOS A BUCLE INTERNO AGAIN
        }
    };

    function linea(){
        alert(`Felicidades ${name} has realizado una linea completa!`);
        var cnf = confirm(`${name}, quieres volver a jugar?`)
            if(cnf === true){
                bingoGame();
            }else{
                alert('Hasta la proxima!');
            }
    }
}

bingoGame();