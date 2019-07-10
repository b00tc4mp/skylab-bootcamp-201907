
/*BINGO GAME! 🎲🎰
Realiza un programa que simule un Bingo. Cuando se ejecute, pedir el nombre del jugador y deber guardarse. Durante el primer turno se mostrar un cartn con 15 nmeros (excluyendo el 0 siempre), para pasar al siguiente turno el usuario deber confirmar mediante confirm() visualizandose otro nmero, si coincide con alguno de los existentes en el cartn, cambiar por una "X" o un 0. El cartn se mostrar, al final de cada turno, con los cambios efectuados, indicando al usuario qu nmero se ha encontrado. El programa deber preguntar al usuario al inicio de cada turno si desea continuar, en caso de que se contine, seguir el mismo patrn que hasta el momento.

Por supuesto, cuando todos los nmeros de una misma lnea sean "X", mostrar un mensaje "LNEA!", pero la ejecucin seguir, el juego solo acabar cuando todos los nmeros estn a "X".

Cuando el juego concluya, deber decirle al usuario en cuantos turnos se ha completado el cartn. Por ltimo, deber preguntar si desea volver a jugar.
Empieza por la versin ms bsica!
Why?
Comenzar por una versin muy pequea y bsica nos har tener un programa de principio a fin, es decir, que empieza, que acaba y haga lo que queramos a muy pequea escala, una vez lo tengamos todo bien dividido podremos empezar a extenderlo tanto como queramos.
Si funciona con 5 nmeros deber funcionar con 15, no? 😁

Requisitos de la versin mnima:
Cartn con solo 5 nmeros, sin necesidad de ser generados random. Solo
necesitamos un nmero random cuando recorramos el cartn y veamos si hay
alguna coincidencia. No necesitamos asegurarnos que el nmero random de cada turno no haya salido en turnos anteriores, recuerda que estamos en la mnima versin posible, eso ya lo solucionaremos. Si hay coincidencia, vamos a reemplazar el nmero por una 'X' y mostramos el cartn modificado
Separarlo todo en funciones, englobado en una funcin global llamada bingo(), tal que:
function() => Generar Numero Random Bombo
function() => Nuevo turno (Match carton[i] === randomNum)
function() => Preguntar Nuevo Turno
WorkFlow:

PRO
 Cuando se muestre la carta, se preguntar al usuario si realmente quiere ese
cartn o generar otro, si realmente quiere ese cartn, deber responder "Yes"
para proceder
 Establece un sistema de puntos, en cuantos ms turnos se complete el
cartn, menos puntos (el sistema de puntos intgralo como quieras), por el
contrario, a menos turnos, ms puntos.
 Antes de empezar el juego, muestra el sistema de puntos al usuario.
 Ranking de usuarios (ordenado por puntos).
var bingoCard = [
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false },
//next line
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false },
{ number : randomNumber, matched : false }
];
*/


//--------------------------DATA BASE USERS--------------------------------
//función que crea usuarios
function user(name,points){
  this.name = name;
  this.points = points;
};
var usersArr=[]
var Anna= new user("Anna",150)//usuario default
var Edu= new user("Edu",250)//usuario default
var Mireia= new user("Mireia",2000)//usuario default
usersArr.push(Anna,Edu,Mireia)


//--------------------------VARIABLES--------------------------------
var newCarton=[]//cartón modificado según números encontrados en partida
var carton=[]//15 números cartón ordenados
var numbers=[]//15 números random del 1-90
var turn=0// turnos en partida
var bombo=[]//90 números random
var ball//la bola escogida del bombo en cada turno
var final//acabar partida
var linea//se ha encontrado línea
var newPoints=[]//puntos de la partida
var helloUserName//nombre de usuario guardado para partida
var newUser// usuario nuevo turno añadido a base de datos




//--------------------------FUNCIÓN PADRE--------------------------------
function bingoGame(){
////////////////////////////FUNC 1////////////////////////////
//--------------------------TICKET--------------------------------
function generarCarton(){
var cantidad=15//cantidad de números en cartón

function numbersCarton(){
//15 números random sin ordenar
while(numbers.length<cantidad){
var numerosAleatorios= (Math.random()*90).toFixed()
var existe= false;
for(var i=0; i<numbers.length;i++){
  if(numbers[i]==numerosAleatorios||numbers[i]==0){
    existe=true;
    break;
  }
}
if(!existe){
  numbers[numbers.length] = numerosAleatorios;
}}
};
numbersCarton()

function mostrarCarton(){
//ordenar números
numbers.sort(function compareNumbers(a, b) {
return a - b;})
//generar 3 filas
let n1 = numbers.splice(0,(numbers.length/3));
carton.push(n1);
let n2 = numbers.splice(0,(numbers.length/2));
carton.push(n2);
let n3= numbers.splice(0,(numbers.length));
carton.push(n3);
//imprimir cartón
return carton
};
mostrarCarton() 
};


////////////////////////////FUNC 2////////////////////////////
//-------------------------WELCOME USER-----------------------
//iniciar saludo
function start(){
  helloUser();
  }start()
//función saludo
function helloUser(){
var helloUser= prompt('¡¡Bienvendio al BINGO Skylab!! Introduce tu nombre de usuario.')
if(helloUser){

var userExist=[]//si el usuario está en la base de datos, guardamos su nombre en esta variable
var userExistPoints= []// si el usuario está en la base de datos, guardamos sus puntos en esta variable
for(prop in usersArr){
if(helloUser===usersArr[prop].name){
  userExist.push(usersArr[prop].name)
  userExistPoints.push(usersArr[prop].points)
}
};
if(userExist==helloUser){
for(prop in usersArr){  
alert(`Encantados de volver a verte ${userExist}. Actualmente tienes un resgistro de ${userExistPoints} puntos. Puedes comprobar el ranking de puntos en la pantalla principal.`);
  helloUserName=helloUser
  ranking();
  scoreSystem();
  
  break;
}}else{
alert('Hola '+helloUser+'. Eres nuevo en BINGO Skylab. Puedes comprobar el ranking de puntos en la pantalla principal.');
newUser= new user(helloUser,0)
usersArr.push(newUser)
helloUserName=helloUser
ranking();
scoreSystem();
}
}else{

 var introduce= prompt('No has introducido un nombre de usuario. ¿Qué deseas hacer?','inicio, salir')
 if(introduce){
   if(introduce==='inicio'){
     start();
   }else if(introduce==='salir'){
   alert('¡¡Hasta pronto!! :)');
   }else{
     start();
   }}else{
     start();
  }
}}



////////////////////////////FUNC 3////////////////////////////
//--------------------------RANKING LIST-----------------------------
function ranking(){
var alertRanking=[]
usersArr.sort(function(a,b){
  return b.points - a.points;
})
console.log('---------The ranking bingo---------');
for(prop in usersArr){
   var ind = prop.length+(parseInt(prop))
   console.log(`\n${ind} => ${usersArr[prop].name} con ${usersArr[prop].points} puntos.`)
   alertRanking.push(`\n${ind} => ${usersArr[prop].name} con ${usersArr[prop].points} puntos.`)
}
alert(`---------The ranking bingo---------\n ${alertRanking}`)
}


////////////////////////////FUNC 4////////////////////////////
//--------------------------SCORE SYSTEM-----------------------------
function scoreSystem(){

let a= confirm(`------------Score System------------\n BINGO en 15 turnos: 1000 PUNTOS.\n BINGO entre 16 y 70 turnos: 800 PUNTOS.\n BINGO entre 71 y 80 turnos: 500 PUNTOS.\n BINGO entre 81 y 90 turnos: 200 PUNTOS.\n El jugador con más puntos gana. ¿Empezamos? `);
console.log(`------------Score System------------\n BINGO en 15 turnos: 1000 PUNTOS.\n BINGO entre 16 y 70 turnos: 800 PUNTOS.\n BINGO entre 71 y 80 turnos: 500 PUNTOS.\n BINGO entre 81 y 90 turnos: 200 PUNTOS.\n El jugador con más puntos gana.`);

if(a){
 escogerCarton()
}else{
  alert('Esperamos verte pronto '+helloUserName+'.')
}
}


////////////////////////////FUNC 5////////////////////////////
//--------------------------CHOOSE THE TICKET------------------------
function escogerCarton(){
alert('A continuación se generará tu cartón de bingo.')
generarCarton();
alert(`------------Your bingo card------------\n ${carton[0]}\n ${carton[1]}\n ${carton[2]}`);
let b= prompt('¿Quieres jugar con este cartón?', 'sí/no')
if(b){
if(b==='sí'||b==='si'){
  alert(`Que empieze el juego. Buena suerte ${helloUserName}🎲🎲.`)
  //imprimir carton
  console.log('Your bingo card is => ')
  console.log(carton)
  allBalls();
  newTurn();
}else{
  carton.length=0;
  numbers.length=0;
   return escogerCarton();
}}else{
  let c= prompt('No has escogido ningún cartón. Indicanos si quieres escoger un nuevo cartón o salir','nuevo/salir')
  if(c==='nuevo'){
    carton.length=0;
    numbers.length=0;
    return escogerCarton();
  }else if(c==='salir'){
    alert('Esperamos verte pronto '+helloUserName+'.')
  }else{
    alert('Esperamos verte pronto '+helloUserName+'.')
  }
}
}


////////////////////////////FUNC 6////////////////////////////
//--------------------------BOMBO--------------------------------
function allBalls(){
while(bombo.length<90){
var numerosAleatorios= ((Math.random()*90).toFixed());
if(!bombo.includes(numerosAleatorios)&&numerosAleatorios!=0){
bombo.push(numerosAleatorios)
}}}


////////////////////////////FUNC 7////////////////////////////
//--------------------------NEW TURN--------------------------------
function newTurn(){
//--------------------------NEW BALL--------------------------------
function newBall(){
var selected=Math.floor(Math.random()*bombo.length);
ball=bombo[selected];
bombo.splice(bombo.indexOf(ball),1)
}
newBall();

//--------------------------CHECK IF MATCH-----------------------------
function checkMatch(){

alert('The new ball has the number: '+ball) 
for(var i=0;i<carton.length;i++){
  for(var j=0;j<carton[i].length;j++){
if(ball==carton[i][j]){
    alert('We match '+ball+' in your card.')
    carton[i][j]='0';}
  }}
newCarton = carton;
} 
checkMatch();
//--------------------------CHECK LINEN O BINGO-----------------------------
function lineaBingo(){
function matchLinea(arr){
var acc=0
function sum(){
for(var i=0;i<arr.length;i++){
acc= acc+parseInt(arr[i]) }
if(acc === 0){
  alert('🎉🎉¡GENIAL! HAS CONSEGUIDO LÍNEA,¡VAMOS A POR BINGO!🎉🎉');
  linea = true;
}}
sum()}
if(!linea){
for(var j=0;j<newCarton.length;j++){
matchLinea(newCarton[j])
}}

function matchBingo(){
var accb=0
for(var x=0; x<newCarton.length;x++){
for(var y=0;y<newCarton[x].length;y++){
 accb= accb+parseInt(newCarton[x][y])
}}
if(accb===0){
final=true;
}}matchBingo()
}
lineaBingo() 
//--------------------------ASK NEW TURN----------------------------- 
function askUser(){
if(!final){
var continuePlaying =prompt(`------------Your bingo card------------\n ${newCarton[0]}\n ${newCarton[1]}\n ${newCarton[2]}\n ¿Quieres continuar la partida? sí/no`,`sí`)

if(continuePlaying==='sí'|| continuePlaying==='si'){
turn++
return newTurn();
}else{
var askAgain= prompt(`¿Estás seguro de que quieres abandonar la partida?`,`sí/no`)

  if(askAgain==='sí'|| askAgain==='si'){
    alert(`¡Gracias por participar! Has jugado ${turn} turnos, ha faltado poco para bingo.\nEsperamos verte pronto ${helloUserName}.`)
  }else{
    turn++
    return newTurn(); 
  }
}
}else{
  alert(`🎉🎉¡BINGOOOOOOO!🎉🎉\nHas conseguido bingo en ${turn} turnos. Puedes ver el resultado de las puntuaciones en la pantalla principal.`)
lastPaths()
}
}askUser()
}

////////////////////////////FUNC 8////////////////////////////
function lastPaths(){
//--------------------------CALCULATE POINTS-----------------------------
function funcNewPoints(){
var result=[]
if(turn===15){
  newPoints.push(1000)
}else if(turn<=70&&turn>=16){
  newPoints.push(800)
}else if(turn<=80&&turn>=71){
  newPoints.push(500)
}else{
  newPoints.push(200)
}
for(prop in usersArr){
if(helloUserName === usersArr[prop].name){
  var n1=usersArr[prop].points;
  var n2=newPoints;  
  result.push(parseInt(n1)+parseInt(n2));
  usersArr[prop].points=result;
  }}
}funcNewPoints()
//--------------------------FINAL RANKING LIST---------------------------------
ranking();
//--------------------------PLAY NEW BINGO---------------------------------
function newBingo(){
var bingoAgain= prompt('¿Quieres jugar una partida nueva?','sí/no')
if(bingoAgain==='sí'||bingoAgain==='si'){
    console.clear()
//--------------------------VARIABLES--------------------------------
newCarton=[]
carton=[]
numbers=[]
turn=0
bombo=[]
ball
final=undefined
linea=undefined
newPoints=[]
helloUserName
newUser
helloUser();
}else if(bingoAgain==='no'){
var areSure= prompt('¿Estás seguro de que quieres finalizar?','sí,no')
if(areSure==='si'||areSure==='sí'){
  alert('Esperamos verte pronto '+helloUserName+' :).')
}else{
  return newBingo();
}
  }else{
    var areSure= prompt('¿Estás seguro de que quieres finalizar?','sí,no')
if(areSure==='si'||areSure==='sí'){
  alert('Esperamos verte pronto '+helloUserName+' :).')
}else{
  return newBingo();
}
  }
}newBingo()
}}

bingoGame()








































/*
//-------------------------WELCOME USER-----------------------
//funcion que crea usuarios
function user(name,points){
    this.name = name;
    this.points = points;
};

var Anna= new user("Anna",150)//usuario default
var Edu= new user("Edu",250)//usuario default
var newUser// usuario nuevo turno

var helloUserName
var usersArr=[] //todos los usuarios en array
usersArr.push(Anna,Edu)

function helloUser(){
var helloUser= prompt('Bienvendio al BINGO Skylab!! Introduce tu nombre de usuario')
   if(helloUser === ''){
   var introduce= prompt('No has introducido un nombre de usuario. Que deseas hacer?','salir, inicio')
   if(introduce==='inicio'){
     this.helloUser()
   }else{
    alert('Hasta pronto!! :)');
    }
   }else if(helloUser !== null){
var userExist=[]
for(prop in usersArr){
  if(helloUser===usersArr[prop].name){
    userExist.push(usersArr[prop].name)}
};

if(userExist==helloUser){
for(prop in usersArr){  
  alert('Encantados de volver a verte '+helloUser+ '. Actualmente tienes un resgistro de '+ usersArr[prop].points+' puntos. Puedes comprobar el ranking de puntos en la pantalla principal.');
    helloUserName=helloUser
    ranking();
    scoreSystem();
    
    break;
}}else{
  alert('Hola '+ helloUser+'. Eres nuevo en BINGO Skylab. Puedes comprobar el ranking de puntos en la pantalla principal.');
  newUser= new user(helloUser,0)
  usersArr.push(newUser)
  helloUserName=helloUser
  ranking();
  scoreSystem();
  
}}else{
    alert('Hasta pronto!! :)')
   }}

helloUser();
//--------------------------RANKING LIST---------------------------------
function ranking(){
  usersArr.sort(function(a,b){
    return b.points - a.points;
  })
  console.log('---------The ranking bingo---------');
  for(prop in usersArr){

    console.log( prop +'=>'+ usersArr[prop].name+ ' with '+usersArr[prop].points+ ' puntos.')
  }
}
//--------------------------SCORE SYSTEM-----------------------------
function scoreSystem(){
  let a= confirm(`------------Score System------------\n BINGO en 15 turnos: 1000 PUNTOS.\n BINGO entre 16 y 30 turnos: 500 PUNTOS.\n BINGO entre 31 y 60 turnos: 250 PUNTOS.\n BINGO entre 61 y 90 turnos: 100 PUNTOS.\n El jugador con mas puntos gana. Empezamos? `);
 if(a){
   escogerCarton()
 }else{
   return
 }
}
//--------------------------CHOOSE THE TICKET-----------------------------
function escogerCarton(){
alert('A continuacin se generara tu carton de bingo.')
generarCarton();
alert(`------------Your bingo card------------\n ${carton[0]}\n ${carton[1]}\n ${carton[2]}`);
let b= prompt('Quieres jugar con este carton?', 'yes/no')
if(b){
  if(b==='yes'){
    alert(`Que empieze el juego. Buena suerte ${helloUserName}🎲🎲`)
    //imprimir carton
    console.log('Your bingo card is => ')
    console.log(carton)
    allBalls();
    newTurn();
  }else if(b==='no'){
    carton.length=0;
    numbers.length=0;
    this.escogerCarton()
  }
}else{
  return
}
}

////////////////////////////////////////////////////////////////
//--------------------------BOMBO--------------------------------
function allBalls(){
while(bombo.length<90){
var numerosAleatorios= ((Math.random()*90).toFixed());
if(!bombo.includes(numerosAleatorios)&&numerosAleatorios!=0){
  bombo.push(numerosAleatorios)
}}}

////////////////////////////////////////////////////////////////
//--------------------------NEW TURN--------------------------------
function newTurn(){
//--------------------------NEW BALL--------------------------------
function newBall(){
  var selected=Math.floor(Math.random()*bombo.length);
ball=bombo[selected];
bombo.splice(bombo.indexOf(ball),1)
}
newBall();

//--------------------------CHECK IF MATCH-----------------------------
function checkMatch(){

alert('The new ball has the number: '+ball) 
  for(var i=0;i<carton.length;i++){
    for(var j=0;j<carton[i].length;j++){
  if(ball==carton[i][j]){
      alert('We match '+ball+' in your card!!')
      carton[i][j]='x';}
    }}
newCarton = carton;
} 
checkMatch();
//--------------------------CHECK LINEN O BINGO-----------------------------  
function liniaBingo(){
  for(var i=0;i<newCarton.length;i++){
  if(newCarton[i]===linia){
    alert('Has conseguido LINIA!!!Y vamos para BINGO!!!')
    askUser();
  }};
  if(newCarton===bingo){
    final=true;
    askUser();
  }else{
    final=false;
    askUser();
  }
}liniaBingo()   
//--------------------------ASK NEW TURN----------------------------- 
function askUser(){
if(final===false){
var continuePlaying =prompt(`------------Your bingo card------------\n ${newCarton[0]}\n ${newCarton[1]}\n ${newCarton[2]}\n Quieres continuar la partida?yes/no`,`yes`)
if(continuePlaying){
  if(continuePlaying==='yes'){
  turn++
  this.newTurn();
  }else{
  alert(`Gracias por participar!!Has jugado ${turn.length} turnos, ha faltado poco para bingo!!\n Esperamos verte pronto ${helloUserName}!!`)};
  }}else{
    alert(`BINGOOOOOOO!!!\n Has conseguido bingo en ${turn.length}. Puedes ver el resultado de las puntuaciones en la pantalla principal!!`)
  }
}
};
*/





