/*Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse. 
Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), para pasar al siguiente 
turno el usuario deberá confirmar mediante confirm() visualizandose otro número, si coincide con alguno de los 
existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará, al final de cada turno, con los cambios
 efectuados, indicando al usuario qué número se ha encontrado. El programa deberá preguntar al usuario al inicio 
 de cada turno si desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.
Por supuesto, cuando todos los números de una misma línea sean "X", mostrará un mensaje "LÍNEA!", pero la ejecución
 seguirá, el juego solo acabará cuando todos los números estén a "X".	
Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. Por último, deberá
 preguntar si desea volver a jugar.
Empieza por la versión más básica!
Why?
Comenzar por una versión muy pequeña y básica nos hará tener un programa de principio a fin, es decir, que empieza, 
que acaba y haga lo que queramos a muy pequeña escala, una vez lo tengamos todo bien dividido podremos empezar a 
extenderlo tanto como queramos.
Si funciona con 5 números deberá funcionar con 15, no? 😁
Requisitos de la versión mínima:
Cartón con solo 5 números, sin necesidad de ser generados random. Solo necesitamos un número random cuando recorramos 
el cartón y veamos si hay alguna coincidencia. No necesitamos asegurarnos que el número random de cada turno no haya 
salido en turnos 
anteriores, recuerda que estamos en la mínima versión posible, eso ya lo solucionaremos. Si hay coincidencia, vamos 
a reemplazar el número por una 'X' y mostramos el cartón modificado
Separarlo todo en funciones, englobado en una función global llamada bingo(), tal que:
function()=> Generar Numero Random Bombo
function()=> Nuevo turno (Match carton[i] === randomNum)
function() => Preguntar Nuevo Turno*/

alert("Welcome to the BINGO game!");
var player = prompt('Please enter your name','Hi player1!');
interact();
generadorCarton();   //n = Math.random()+1


function interact () {
    do {
        if (player == "" || player == " "){
            player = prompt('Please enter your name','Hi player1!')
        }else{
            alert('Hey '+ player.toUpperCase()+'! do you accept a new game');
        }
    }while (player == "" || player == " ");
};

function generadorCarton (){
    var cartonRandom = [];
    var n = Math.floor(Math.random() * (15 - 1)) + 1;
    cartonRandom.push(n);
    
    do{
        debugger
        for (i=1;i<5;i++){
            var repetido = 0
            n = Math.floor(Math.random() * (15 - 1)) + 1;
            for(j=0; j<cartonRandom.length;j++){
                if (n == cartonRandom[j]) repetido += 1;
                //n = Math.floor(Math.random() * (15 - 1)) + 1 //repetido += 1;
            }
            if (repetido == 0) cartonRandom.push(n);
        }
    }while ( cartonRandom.length < 5);
    alert (cartonRandom);  
};      


var aciertos = 0;

function score (){
     return aciertos += 1;
};

function bingo(){
    num = bomboRandom()
    do{
        for (var i=0;i<cartonRandom.length;i++){
            if(cartonRandom[i] = num){
                cartonRandom[i]="X";
                score();
            }
        }

    }while(aciertos = cartonRandom.length);
};

function bomboRandom(){
    return Math.floor(Math.random() * (15 - 1)) + 1;   
};
    
//bingo tiles
/*
function cartones,
function numerosAleatorios
function comprobarNúmeroVScarton,
function noRepetirNumerosAleatorios,
function linea,
function bingo,
interfaz usuario.
*/
