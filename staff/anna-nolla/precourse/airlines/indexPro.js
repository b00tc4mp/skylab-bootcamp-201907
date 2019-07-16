/* ●	Se preguntará por el nombre de usuario y dará la bienvenida. */

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
        console.log("Id: " + flights[i].id + " Vuelo " + flights[i].from + " -> " + flights[i].to + " = " + flights[i].cost + "€," + " sin escala" + "\n");   
        }
        else {
            console.log("Id: " + flights[i].id + " Vuelo " + flights[i].from + " -> " + flights[i].to + " = " + flights[i].cost + "€," + " con escala" + "\n"); 
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
    console.log("Los ultimos vuelos del dia son" + destinos);
}
lastDestiny();

/* Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, 
dependiendo de la elección, el programa se comportará de la siguiente manera: 
    Si eres ADMIN, la función debería permitir:
        ●	Poder crear, más vuelos, pidiendo la información por prompt(), 
        sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
        ●	Poder eliminar vuelos mediante el ID.
    Si eres USER la función debería permitir:
        ●	Buscar por precio (más alto, más bajo o igual),
        el usuario debería mostrar los datos de los vuelos encontrados y,
        indicando el ID, el programa responderá: "Gracias por su compra, vuelva pronto." */

var usuarioAU = prompt("Es usted ADMIN o USER ??");


/* - Afegim la funcio per crear més vols - */
function addFlights (){

    var addFlight = {};
    /* - No vull que hem pregunti per la id del vol, nomes q es posi automatica - */ 
    var lastFlights = flights[flights.length - 1];
    addFlight.id = lastFlights.id + 1;

    if(addFlight.id == 14){
        alert("Tienes el maximo numero de vuelos introduciodos");
        deleteFlights();
        return;
    }
                    
    addFlight.to = prompt("Indique el destino:");
    addFlight.from = prompt("Indique la salida:");
    
    do {
        addFlight.cost = prompt("Indique el coste:");
    } while (isNaN(addFlight.cost) == true);
        parseInt(addFlight.cost);

    addFlight.scale = prompt("Escala Y / N ??");
    if(addFlight.scale == "Y" || addFlight.scale == "y" || addFlight.scale == "yes"){
        addFlight.scale = true;
    }
    else if(addFlight.scale == "N" || addFlight.scale == "n" || addFlight.scale == "no"){
        addFlight.scale = false;
    }
    else{
        console.log("Tenga un buen dia !");
    }
    /* - Ho afegim a la var flights - */
    flights.push(addFlight);
    
    /* - mirem si volen afegir més vols i si no que ens mostri tots els vols que hem afegit - */
    var newFlight = prompt("Desea crear otro vuelo ?? Y / N");
    switch(newFlight){
        case "Y":
        case "y":
        case "yes":
             console.log(flights);
             addFlights();
            break;
            
        case "N":
        case "n":
        case "no":
            console.log(vuelo());
            deleteFlights();
    } 
}

function deleteFlights (){
    var deleteFlight = prompt("Desea eliminar un vuelo Y / N ??");
        if(deleteFlight == "Y" || deleteFlight == "y" || deleteFlight == "yes"){
            /* - Podem eliminarlos atraves de la id donat que es la mateixa posicio de larray - */
           var deleteF = prompt("Marque la id de vuelo que desea eliminar:");
            flights.splice(deleteF, 1);
            for(i = 0; i < flights.length; i++){
                /* - Recoloquem la posicio de la id i ho mostrem per si en volem eliminar mes - */
                flights[i].id = i;
            }
            console.log(vuelo());
            deleteFlights();
            return;
        }
        else if(deleteFlight == "N" || deleteFlight == "n" || deleteFlight == "no"){
            console.log("Que tenga muy buen día !");
            newFlights = "N";
            return;
        }   
        else{
            console.log("Que tenga un buen dia ");
        }
}

 /* --Busqueda per preu--- */
function price(){
    do {
        var priceFlights = prompt("Indique el precio medio de su busqueda:");
    } while (isNaN(priceFlights) == true);
        parseInt(priceFlights);
    
    var flightsF = [];
    function flightsPrices(){      
        /* - No acavo dentrendre aquest funcio sort, funciona per objectes dins un array - */
        flightsF.sort((a, b) => (a.cost > b.cost) ? 1 : -1);
        
        for( i = 0; i < flightsF.length; i++){
            if (flightsF[i].scale == false){
                console.log("Id: " + flightsF[i].id + " Vuelo " + flightsF[i].from + " -> " + flightsF[i].to + " = " + flightsF[i].cost + "€," + " sin escala" + "\n");   
            }
            else {
                console.log("Id: " + flightsF[i].id + " Vuelo " + flightsF[i].from + " -> " + flightsF[i].to + " = " + flightsF[i].cost + "€," + " con escala" + "\n"); 
                }
        }
    }
        var flightsSearch = prompt("Desea vuelo de Mayor precio (marque 1), Menor (marque 2) o Igual (marque 3)");
        switch(flightsSearch){
            case "Mayor":
            case "1":
                for(i = 0; i < flights.length; i++){
                    if(flights[i].cost > priceFlights){
                    flightsF.push(flights[i]); 
                    }
                }
                flightsPrices();
                break;
                
            case "Menor":
            case "2":
                    for(i = 0; i < flights.length; i++){
                        if(flights[i].cost < priceFlights){
                        flightsF.push(flights[i]); 
                        }
                    }
                    flightsPrices();
                    break;

            case "Igual":
            case "3":
                    for(i = 0; i < flights.length; i++){
                        if(flights[i].cost == priceFlights){
                        flightsF.push(flights[i]); 
                        }
                    }
                    if(flightsF.length == 0){
                        alert("We could not find any match, try again");
                        price();
                    }
                    flightsPrices();
                    break;
    }
}

function compra(){
    var flightsC = parseInt(prompt("Indique la Id del vuelo que desea comprar:"));

    for(i = 0; i < flights.length; i++){
        if(flightsC == flights[i].id){
            var yourFlight = flightsC;    
        }
    }
    if(flightsC == yourFlight){
        alert("Gracias por su compra, Vuelo Id: " + flightsC + ", vuelva pronto.");
    }
    else{
        alert("Id erronea, intentelo de nuevo");
        compra();
    }   
}

function adminUser () {
    if (usuarioAU == "ADMIN" || usuarioAU == "admin" || usuarioAU == "Admin"){
        var newFlights = prompt("Desea crear un nuevo vuelo Y / N ??");

        if(newFlights == "Y" || newFlights == "y" || newFlights == "yes"){
            addFlights();
        }
        else if(newFlights == "N" || newFlights == "n" || newFlights == "no"){
            deleteFlights ();
        }
    }
    if (usuarioAU == "USER" || usuarioAU == "user" || usuarioAU == "User"){
        price();
        compra();
        }
    else{
            console.log("Que tenga un buen dia");
        }
    }
adminUser();

