
//Info de todos los vuelos
var flights = [
    { id: 0, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 1, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 2, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 3, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 4, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 5, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 6, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 7, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 8, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 9, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];
//console.log(flights[0].to);

//Inicio con welcome
function skylabAirlines (){
    var usuario = prompt('Introduce tu nombre de usuario');
       alert(`Bienvenido a Skylab Airlines ${usuario}`);

       //Mostramos todos los vuelos disponibles al usuario de forma amigable
       console.log('Estos son los vuelos disponibles para hoy' + ' ' + usuario);
        for (var i = 0; i < flights.length; i++){
            let escalas = '';
            if(flights[i].scale === true){
                escalas = 'tiene escalas';
            } else {
                escalas = 'no tiene escalas';
            }
                console.log(`El vuelo con origen: ${flights[i].to} y destino: ${flights[i].from} tiene un coste de: ${flights[i].cost} y ${escalas}`);
        }
        //espacio para que sea mas visual
            console.log('');
        //ciclo para mostrar un recordatorio de que vuelos tienen escala
            console.log(usuario + ', ' + 'Te recordamos que los siguientes vuelos tienen minimo una escala.')
        for (var j = 0; j < flights.length; j++){
                if(flights[j].scale === true){
                    console.log(`${flights[j].to} con destino ${flights[j].from}`);
                }
    }
        //precio medio de los vuelos, ponemos todos los precios en un array y con un for los sumamos entre ellos
    
            let totalCost = [];
        for(var x = 0; x < flights.length; x++){
            totalCost[x] = flights[x].cost;
        }
            let totalCostAV = 0;
        for(var t = 0; t < totalCost.length; t++){
           totalCostAV = totalCostAV + totalCost[t];
        } 
            totalCostAV = totalCostAV / flights.length;
            console.log('El precio medio de todos los vuelos es de: ' + totalCostAV.toFixed(1));
            console.log('');

            //ultimos 5 vuelos del dia recordatorio
            console.log('Los ultimos 5 vuelos del dia de hoy son los siguientes vuelos:');

        for(var p = flights.length - 1; p > 5; p--){
            console.log(flights[p].to + ' ' + 'con destino ' + flights[p].from);
        }
        
}

skylabAirlines();

