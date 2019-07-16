/* Skylab Airlines! ✈ 🛩
PRO:
Después de ver toda la información el programa pedirá al usuario si es
ADMIN/USER, dependiendo de la elección, el programa se comportará de la
siguiente manera:
Si eres ADMIN , la función debería permitir:
● Poder crear, más vuelos, pidiendo la información por prompt(), sin poder
pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
● Poder eliminar vuelos mediante el ID.
Si eres USER la función debería permitir:
● Buscar por precio (más alto, más bajo o igual), el usuario debería mostrar los
datos de los vuelos encontrados y, indicando el ID, el programa responderá:
"Gracias por su compra, vuelva pronto." */

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
    var user = prompt("Por favor introduza su usuario: ");
    alert("Bienvenido/a " + user); 
    infoGeneral();
    //login Admin o User//
    do user = prompt("Por favor indica si eres ADMIN o USER: ");
    while (user !== 'ADMIN' && user !== 'USER');
    if (user == 'ADMIN') menu();
    if (user == 'USER') buscar();
    function infoGeneral() {
        console.log('*******************************************');
        for (var i = 0; i < flights.length; i++) { 
            if (flights[i].scale === false) console.log('El vuelo ' + flights[i].id  + ' con Origen: ' + flights[i].from + ' y Destino: ' + flights[i].to + ' tiene un precio de ' + 
            flights[i].cost + '€ y no realiza ninguna escala.');
            else console.log('El vuelo ' + flights[i].id  + ' con Origen: ' + flights[i].from + ' y Destino: ' + flights[i].to + ' tiene un precio de ' + 
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
        }   

    function menu() {
        do a = parseInt(prompt("Por favor introduzca la opción que desea realizar:  Opción 0 -> Agregar vuelo, Opción 1 -> Eliminar vuelo, Opción 2 - Salir"));
        while (a !== 0 && a !== 1 && a !==2);
        switch(a) {
            case 0:
                if (flights.length >= 15) {
                    alert('No es posible almacenar más de 15 vuelos');
                    menu();
                    break;
                }
                else addFlight();
                break;
            case 1:
                removeFlight();
                break;
            case 2:
                console.log('Gracias por su visita.');
                return;        
        }
    }//añadir vuelos//
    function addFlight() {
        var lastFlight = flights[flights.length - 1];
        var flight = {};
        var escala = '';
        flight.id = lastFlight.id + 1;
        flight.from = prompt("Indica el Origen del vuelo: ");
        flight.to = prompt("Indica el Destino del vuelo: ");
        do flight.cost = prompt("Indica el Precio del vuelo: ");
        while(flight.cost <= 0 || isNaN(flight.cost) == true);
        flight.cost = parseInt(flight.cost);
        do escala = prompt("Indica si el vuelo hace Escala: (Yes/No)");
        while (escala !== 'Yes' && escala !== 'No')
        if (escala == 'Yes') flight.scale = true;
        if (escala == 'No') flight.scale = false;
        flights.push(flight);
        infoGeneral();
        menu();
    }
    //eliminar vuelos//
    function removeFlight() {
        id = prompt("Indica el id del vuelo que quieres eliminar");
        flights.splice(id, 1);
        for (i = 0; i < flights.length; i++) flights[i].id = i; //Reasignar ids//
        infoGeneral()
        menu();
    }
    
    //buscar vuelos por precio//
    function buscar() {
    var bflights = [];
    do precio = prompt("Por favor introduzca el precio para la búsqueda o introduzca 0 si quiere salir");
    while (precio < 0 || isNaN(precio) == true);
    if (precio == 0) {
        console.log('Gracias por su visita');
        return;
    }
    precio = parseInt(precio);
    do valor = parseInt(prompt("Por favor introduzca la opción que desea realizar: Opcion 0 -> Superior, Opcion 1 -> Inferior, Opcion 2 -> Igual"));
    while (valor !== 0 && valor !== 1 && valor !==2);
    switch(valor) {
        case 0:
            for (var i = 0; i < flights.length; i++) {
              if (flights[i].cost > precio) bflights.push(flights[i]);
            }
            bflights.sort((a, b) => (a.cost > b.cost) ? 1 : -1); //ordenar de menor a mayor//
            verVuelos();
            comprarVuelo();
            break;
        case 1:
            for (var i = 0; i < flights.length; i++) {
                if (flights[i].cost < precio) bflights.push(flights[i]);
            }
            bflights.sort((a, b) => (a.cost > b.cost) ? 1 : -1); //ordenar de menor a mayor//
            verVuelos();
            comprarVuelo();
            break;
        case 2:
            for (var i = 0; i < flights.length; i++) {
                if (flights[i].cost === precio) bflights.push(flights[i]);
            }
            if (bflights.length == 0) {
                console.log('No existen vuelos con este precio');
                buscar();
                break;
            }
            else {
                verVuelos();    
                comprarVuelo();
                break;
            }
    }
        function verVuelos() {
            console.log('*******************************************');
            for (var i = 0; i < bflights.length; i++) { //info vuelos//
                if (bflights[i].scale === false) console.log('El vuelo ' + bflights[i].id  + ' con Origen: ' + bflights[i].from + ' y Destino: ' + bflights[i].to + ' tiene un precio de ' + 
                bflights[i].cost + '€ y no realiza ninguna escala.');
                else console.log('El vuelo ' + bflights[i].id  + ' con Origen: ' + bflights[i].from + ' y Destino: ' + bflights[i].to + ' tiene un precio de ' + 
                bflights[i].cost + '€ y realiza escala.');
            }
        }
        function comprarVuelo() {
            do {
                compra = parseInt(prompt('Introduzca el id del vuelo que desea comprar'))
                found = bflights.some(bflights => bflights.id == compra);
            }
            while (found != true);
            console.log('Gracias por su compra, vuelva pronto.');
            return;  
        }
    }
}