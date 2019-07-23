/*Programa una interfaz de usuario para una aerolínea (por terminal...). Esta aerolínea dispondrá de 10 vuelos
para el dia de hoy, para empezar, estos vuelos deben estar declarados de manera global, cuando se llame a la función:
Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino:
Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuántos vuelos efectúan escalas.
Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.*/

alert("Hi!");

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
var user= prompt("Add your user name, please");
alert ("Welcome to Skylab Airlines mr/ms. "+ user);

vuelosDisp();
vuelosCosteMedio();
cuantosVuelosEscalan();
losUltimos_5();

//var vuelos=[];
function vuelosDisp(){
    for (var i=0; i<flights.length; i++){
        if (flights[i].scale){
            alert('El vuelo con origen: '+flights[i].from+', y destino '+flights[i].to+' tiene un coste de '+flights[i].cost+'€ y realizará escala');
        }else{
            alert('El vuelo con origen: '+flights[i].from+', y destino '+flights[i].to+' tiene un coste de '+flights[i].cost+'€ y no reaizará ninguna escala');
        }
    }
}

function vuelosCosteMedio(){
    var media= 0;
    for (var i=0; i<flights.length; i++){
        media += (flights[i].cost);
    }
    media /= flights.length ;
    alert('El coste medio de todos los vuelos para hoy es: ' + media.toFixed(2));
}

/*function sumarValoresArray(param){
    var array=[];
    for (var a=0;a<=array.length;a++){
        array.push(a);
    }
}*/

function cuantosVuelosEscalan(){
    var contador = 0
    for (var i = 0; i<flights.length; i++){
        if(flights[i].scale){
            contador+=1;
        }else{
            contador;
        }
    }
    alert ('De los vuelos de hoy ' +contador+' efectuarán escala en su trayecto');
}

function losUltimos_5(){
    for (var i = flights.length-5; i<flights.length; i++){
        alert ('El '+i+'º último vuelo del dia sale de '+flights[i].from+' con destino a '+flights[i].to+'. Feliz viaje!');
    }
}