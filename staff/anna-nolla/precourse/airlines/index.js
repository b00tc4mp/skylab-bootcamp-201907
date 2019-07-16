// ●	Se preguntará por el nombre de usuario y dará la bienvenida.


var usuario = prompt("Buenos días usuario seria tan amable de proporcionar-nos su nombre ??");
console.log("Bienvenid@ " + usuario + ", aqui encontrará todos los vuelos del día !!");

/* ●	El usuario visualizará todos los vuelos disponibles de una forma amigable:
        El vuelo con origen: Barcelona, y destino:
        Madrid tiene un coste de XXXX€ y no realiza ninguna escala.*/

var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

function vuelo () {
    for( i = 0; i < flights.length; i++){
        if (flights[i].scale == false){
        console.log("Vuelo " + flights[i].from + " -> " + flights[i].to + " = " + flights[i].cost + "€," + " sin escala" + "\n");   
        }
        else {
            console.log("Vuelo " + flights[i].from + " -> " + flights[i].to + " = " + flights[i].cost + "€," + " con escala" + "\n"); 
        }
    }
}
vuelo();      
// ●	A continuación, el usuario verá el coste medio de los vuelos.

function coste () {
    var medio = 0; 
    for (i = 0; i < flights.length; i++){
        medio += flights[i].cost;
    }
    medio /= flights.length;
    console.log("El precio medio de los vuelos es " + medio.toFixed(2) + " €.");
}
coste();

// ●	También podrá ver cuántos vuelos efectúan escalas.

function scales (){
    var escales = 0;
    for (i = 0; i < flights.length; i++){
        if (flights[i].scale === true){
            escales += 1;
        }
    }
console.log("Existen " + escales + " vuelos con escala.");
}
scales();

/* ●	Sabiendo que los últimos 5 vuelos 
        (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.*/

function lastDestiny(){
    var destinos = [];
    for (i = flights.length - 1; i >= flights.length -5; i--){
        destinos.push(" " + flights[i].to);
    }
    console.log("Los ultimos destinos del dia son" + destinos);
}
lastDestiny();