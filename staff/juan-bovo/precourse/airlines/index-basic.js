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

var usuario = "";

function welcome(){
    usuario = prompt('Le damos la bienvenida a Skylab Airlines. ¿Podrías decirnos su nombre?');
    var mensaje1 = alert(`Muchas gracias por su visita, ${usuario}. A continuación le mostraremos los vuelos disponibles para hoy.`);
    var mensaje2 = 'VUELOS DE HOY: \n';
    console.log(mensaje2);
    for (var i = 0; i< flights.length; i++) {
        if (flights[i].scale === true){
            console.log(`El vuelo con origen ${flights[i].from} y destino ${flights[i].to} tiene un coste de ${flights[i].cost} y tiene escalas.`);
        } else if (flights[i].scale === false){
            console.log(`El vuelo con origen ${flights[i].from} y destino ${flights[i].to} tiene un coste de ${flights[i].cost} y no tiene escalas.`);
        };
    };
    var costoTotalVuelos = 0
    for (var i = 0; i < flights.length; i++){
        costoTotalVuelos += flights[i].cost;
    };
    var mensaje3 = `\nPRECIO PROMEDIO: \nEl precio promedio de nuestros vuelos es de €${(costoTotalVuelos / flights.length).toFixed(2)}.`
    var conteoDeEscalas = 0
    for (var i = 0; i< flights.length; i++) {
        if (flights[i].scale === true){
        conteoDeEscalas++
        };
    };
    var mensaje4 = `\nESCALAS: \n${conteoDeEscalas} de nuestros vuelos tienen escalas.`
    var ultimosDestinos = []
    for (var i = flights.length - 5; i < flights.length ; i++){
        ultimosDestinos.push(flights[i].to);
    };
    var mensaje5 = `\nÚLTIMOS DESTINOS DEL DÍA: \n${ultimosDestinos.join(', ')}`;
    console.log(mensaje3, '\n', mensaje4, '\n', mensaje5);
    return mensaje1;
}

welcome();