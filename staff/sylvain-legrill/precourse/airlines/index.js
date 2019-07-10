// Skylab Airlines! ✈️🛩
/*
    (Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)
Programa una interfaz de usuario para una aerolínea (por terminal...). Esta aerolínea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos deben 
estar declarados de manera global, cuando se llame a la función:
Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ 
y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuántos vuelos efectúan escalas.
Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

console.log(flights[0].to); //output: Bilbao

*/

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
var name = window.prompt("Welcome to Skylab Airlines! Please add your name:", "");
    document.write("Hello ", name);

for ( let i = 0; i<flights.length; i++){
    if (flights[i].scale == true) {
        console.log(` El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de: ${flights[i].cost}€ y  realiza una escalada`)
    }
    else{
        console.log(` El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de: ${flights[i].cost}€ y no realiza escaladas`)
    }
}

var arr = []
for (let j = 0;j<flights.length; j++){
    arr.push(flights[j].cost)
} 
arrAvg = function(arr){
    return arr.reduce(function(a,b){
      return a + b
    }, 0)/ arr.length;
  };
  console.log( `Today, the average price for a flight is ${Math.round(arrAvg(arr))} EUR` );

var arrScale = []
for (let k = 0;k<flights.length; k++){
    if (flights[k].scale ==true){
      arrScale.push(flights[k].scale)
    }
} console.log(`Today, ${arrScale.length} flights have scales. `);

console.log(`Last flight destinations for Today are the followings:`)
for (let l = 0;l<flights.length; l++){
    if (flights[l].id >= 06){
        console.log( flights[l].to )
    }
} 
