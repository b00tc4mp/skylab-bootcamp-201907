// Proyecto 2 - Skylab Airlines
console.log('Skylab Airlines!');

/*
Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

  - Se preguntará por el nombre de usuario y dará la bienvenida.
  - El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
  - A continuación, el usuario verá el coste medio de los vuelos.
  - También podrá ver cuantos vuelos efectúan escalas.
  - Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
*/

// información de los vuelos
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

// Nueva ARRAY con los 5 últimos vuelos del día
var lastFlights = flights.slice(-5);

// Bienvenida:
// Le pedimos su nombre:
var name = prompt('Buenas tardes, ¿Me puede facilitar su nombre para dirigirme a usted?');
verify ();


function verify () {
    // Creamos una condicional por si deja el campo vacío o clicka 'cancel':
    if (name == 'null') {
        alert('Al pulsar cancelar entedemos que quiere abortar misión. Esperamos verlo en otra ocasión. ¡Que pase un buen día!');
    } else if (name == '') {
        verifyTwo ();
    } else {
        panel ();
    }
}

var scale;

function panel () {
    // Saludo de bienvenida después de comprobar que todo está correcto:
    alert('Bienvenido ' + name + '! Skylab Airlines está encantada de acompañarle en su viaje. Ahora le mostraremos en pantalla los vuelos disponibles\n¿Comenzamos?');

    // Variables para luego calcular el promedio y escalas:
    var sum = 0;
    var calcScale = 0;

    // Iterancia para recorrer el objeto:
    flights.forEach(function(element, index, array) {
        // Para mostrar el mensaje de la escala:
        if (flights[index].scale == false) {
            scale = 'No hay escalas.'
        } else {
            scale = 'Existen escalas.'
        }
        //Mostramos la información de los vuelos:
        alert('El vuelo con origen en ' + (flights[index].from).toUpperCase() + ', con destino a ' + (flights[index].to).toUpperCase() + ', tiene un coste de ' + flights[index].cost + '€. ATENCIÓN: ' + scale);
        // Calculamos la suma de todos los vuelos para calcular el promedio:
        sum += flights[index].cost;
        // Calculamos el número de escalas que existen
        if (flights[index].scale == true) {
            calcScale++;
        }
    });
    
    // Calculamos el promedio y lo mostramos:
    var avg = sum/flights.length;
    alert('El coste medio de los vuelos es de ' + avg.toFixed(3) + '€');

    // Mostramos el número de escalas que existen:
    alert('Ahora mismo hay ' + calcScale + ' vuelos con escala.')

    // Presentación de los 5 últimos vuelos
    alert('A continuación le mostramos la información de los últimos 5 vuelos del día:')

    // Iterancia para recorrer los últimos vuelos:
    lastFlights.forEach(function(element, index, array) {
        //Mostramos la información de los los últimos vuelos:
        alert('ID: ' + lastFlights[index].id + ' | Origen ' + (lastFlights[index].from).toUpperCase() + ' | destino ' + (lastFlights[index].to).toUpperCase() + ' | ' + lastFlights[index].cost + '€. ATENCIÓN: ' + scale);
    });
}

// Segunda verficación para que nadie se escape (genera un bucle si no introduces nada):
function verifyTwo () {
    name = prompt('Parece que no he entendido bien su nombre ¿Me lo puede repetir por favor? (PISTA: debe introducir su nombre en la casilla. ¡De nada!)');
    if (name == 'null') {
        alert('Al pulsar cancelar entendemos que quiere abortar misión. Esperamos verlo en otra ocasión. ¡Que pase un buen día!');
    } else if (name == '') {
        verifyTwo ();
    } else {
        panel ();
    }
}



