/* Skylab Airlines! ✈ ������
(Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro
código)
Programa una interfaz de usuario para una aerolínea (por terminal...). Esta aerolínea
dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos deben estar
declarados de manera global, cuando se llame a la función:
● Se preguntará por el nombre de usuario y dará la bienvenida.
● El usuario visualizará todos los vuelos disponibles de una forma amigable: El
vuelo con origen: Barcelona , y destino: Madrid tiene un coste de XXXX€ y no
realiza ninguna escala.
● A continuación, el usuario verá el coste medio de los vuelos.
● También podrá ver cuántos vuelos efectúan escalas.
● Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día,
muestra al usuario sus destinos. */

var flights = [
    { id : 00 , to : 'Bilbao' , from : 'Barcelona' , cost : 1600 , scale : false },
    { id : 01 , to : 'New York' , from : 'Barcelona' , cost : 700 , scale : false },
    { id : 02 , to : 'Los Angeles' , from : 'Madrid' , cost : 1100 , scale : true },
    { id : 03 , to : 'Paris' , from : 'Barcelona' , cost : 210 , scale : false },
    { id : 04 , to : 'Roma' , from : 'Barcelona' , cost : 150 , scale : false },
    { id : 05 , to : 'London' , from : 'Madrid' , cost : 200 , scale : false },
    { id : 06 , to : 'Madrid' , from : 'Barcelona' , cost : 90 , scale : false },
    { id : 07 , to : 'Tokyo' , from : 'Madrid' , cost : 1500 , scale : true },
    { id : 08 , to : 'Shangai' , from : 'Barcelona' , cost : 800 , scale : true },
    { id : 09 , to : 'Sydney' , from : 'Barcelona' , cost : 150 , scale : true },
    { id : 10 , to : 'Tel-Aviv' , from : 'Madrid' , cost : 150 , scale : false }
    ];

function airlines() {   
    do var user = prompt("Por favor introduza su usuario: ");
    while (user =='');
    //login//
    alert("Bienvenido/a " + user); 
    for (var i = 0; i < flights.length; i++) { //info vuelos//
      if (flights[i].scale === false) console.log('El vuelo con Origen: ' + flights[i].from + ' y Destino: ' + flights[i].to + ' tiene un precio de ' + 
        flights[i].cost + '€ y no realiza ninguna escala.');
      else console.log('El vuelo con Origen: ' + flights[i].from + ' y Destino: ' + flights[i].to + ' tiene un precio de ' + 
        flights[i].cost + '€ y realiza escala.');
    }
    mediaCost = 0; //precio medio//
    for (var i = 0; i < flights.length; i++) mediaCost += flights[i].cost;
    mediaCost /= flights.length;
    alert('El precio medio de los vuelos es de ' + mediaCost.toFixed(2) + '€');
    vuelosEscala = 0; //escalas//
    for (var i = 0; i < flights.length; i++) {
      if (flights[i].scale === true) vuelosEscala++;
    }
    alert(vuelosEscala + ' vuelos hacen escala.');
    alert('Estos son los 5 últimos vuelos del día.'); //5 ultimos vuelos//
    for (var i = flights.length - 5; i < flights.length; i++) console.log('Origen: ' + flights[i].from + ' | Destino: ' + flights[i].to);
}
airlines();
