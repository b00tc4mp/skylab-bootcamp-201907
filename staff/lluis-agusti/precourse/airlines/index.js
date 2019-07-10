var flights = [
    {id:00, to:"Bilbao", from: "Barcelona", cost:1600, scale: false},
    {id:01, to:"New York", from: "Barcelona", cost:700, scale: false},
    {id:02, to:"Los Angeles", from: "Madrid", cost:1100, scale: true},
    {id:03, to:"Paris", from: "Barcelona", cost:210, scale: false},
    {id:04, to:"Roma", from: "Barcelona", cost:150, scale: false},
    {id:05, to:"London", from: "Madrid", cost:200, scale: false},
    {id:06, to:"Madrid", from: "Barcelona", cost:90, scale: false},
    {id:07, to:"Tokyo", from: "Madrid", cost:1500, scale: true},
    {id:08, to:"Shangai", from: "Barcelona", cost:800, scale: true},
    {id:09, to:"Sydney", from: "Barcelona", cost:150, scale: true},
    {id:10, to:"Tel-Aviv", from: "Madrid", cost:150, scale: false},
];


function airlines() {
    var username = prompt("Introduzca su nombre de usuario. " + "\n" + " ...una pista es: usuario");
    console.log("Introduzca su nombre de usuario:");
    if (username !== "usuario") {
        console.log("Lo lamento, " + username + " no es un nombre de usuario correcto.");
        alert("Lo lamento, " + username + " no es un nombre de usuario correcto.");
    } else if (username == "usuario") {
        console.log("Bienvenido " + username + "!");
        alert("Bienvenido " + username + "!");

        var acceder = confirm("Desea ver todos los vuelos disponibles de una forma amigable?");
        if (acceder === false) {
            alert("Muy bien " + username + ", le deseamos un buen día.");
            console.log("Muy bien " + username + ", le deseamos un buen día.");
        } else {
            var sino = "";
            console.log("TODOS LOS VUELOS => ");
            for (i = 0; i < flights.length; i++) {
                if (flights[i].scale === true) {
                    sino = " y realiza escala."
                    console.log("Vuelo con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + sino);
                } else {
                    sino = " y no realiza ninguna escala.";
                    console.log("Vuelo con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + sino);
                }
            }

            var verCosteMed = confirm("Desea ver el coste medio de los vuelos?");
            if (verCosteMed === false) {
                console.log("No ha visto el coste medio de los vuelos.");
            } else {
                var suma = 0;
                for (var i = 0; i < flights.length; i++) {
                    suma += flights[i].cost;
                }
                var promedio = suma / flights.length;
                console.log("PRECIO PROMEDIO =>");
                console.log("El precio promedio de los vuelos es de " + promedio.toFixed(2) + "€.");

                var verScale = confirm("Desea ver los vuelos que hacen escala?");
                if (verScale === false) {
                    console.log("No ha visto los vuelos que hacen escala.");
                } else {
                    var contaEscalas = [];
                    console.log("VUELOS CON ESCALA => ");
                    for (i = 0; i < flights.length; i++) {
                        if (flights[i].scale === true) {
                            contaEscalas.unshift(" X");
                            console.log("Vuelo con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + ".");
                        }
                    }
                    console.log("Hay " + contaEscalas.length + " vuelos con escala.");

                    var verScale = confirm("Desea ver los últimos cinco vuelos del día?");
                    if (verScale === false) {
                        console.log("No ha visto los últimos cinco vuelos del día.");
                    } else {
                        console.log("DESTINOS DE LOS ULTIMOS CINCO VUELOS DEL DIA => ");
                        for (i = (flights.length - 5); i < flights.length; i++) {
                            console.log("Vuelo con destino " + flights[i].to + ".");
                        }
                    }
                }
            }
        }
    }
}

function airlinesUser() {
    var usrFilter = prompt("Hola USER!    1. Precio mayor    2. Precio menor" + "\n" + "3. Precio igual    4. Comprar vuelo    5. Salir");
    if (usrFilter == 5) {
        alert("Gracias USER, hasta pronto.");
        console.log("Gracias USER, hasta pronto.");
    } else if (usrFilter == 4) {
        var flightId = prompt("Escriba el ID del vuelo que desea comprar.");
        console.log("DATOS DE SU COMPRA => ");
        console.log("Ha comprado el vuelo con ID " + flights[flightId].id + " con un coste de " + flights[flightId].cost + "€ con destino " + flights[flightId].to + ".");
        console.log("Gracias por su compra, vuelva pronto.");
    } else if (usrFilter == 3) {
        var sino = "";
        var costFilter = prompt("Introduzca una cantidad:");
        var flightsFiltered = flights.filter(flight => flight.cost == costFilter);
        console.log("VUELOS CON PRECIO IGUAL A " + costFilter + " =>");
        for (i = 0; i < flightsFiltered.length; i++) {
            if (flightsFiltered[i].scale === true) {
                sino = " y realiza escala.";
                console.log("Vuelo con origen: " + flightsFiltered[i].from + " y destino: " + flightsFiltered[i].to + " tiene un coste de " + flightsFiltered[i].cost + sino);
            } else {
                sino = " y no realiza ninguna escala.";
                console.log("Vuelo con origen: " + flightsFiltered[i].from + " y destino: " + flightsFiltered[i].to + " tiene un coste de " + flightsFiltered[i].cost + sino);
            }
        }
    } else if (usrFilter == 2) {
        var sino = "";
        var costFilter = prompt("Introduzca una cantidad:");
        console.log("VUELOS CON PRECIO MENOR A " + costFilter + " =>");
        var flightsFiltered = flights.filter(flight => flight.cost < costFilter);
        for (i = 0; i < flightsFiltered.length; i++) {
            if (flightsFiltered[i].scale === true) {
                sino = " y realiza escala.";
                console.log("Vuelo con origen: " + flightsFiltered[i].from + " y destino: " + flightsFiltered[i].to + " tiene un coste de " + flightsFiltered[i].cost + sino);
            } else {
                sino = " y no realiza ninguna escala.";
                console.log("Vuelo con origen: " + flightsFiltered[i].from + " y destino: " + flightsFiltered[i].to + " tiene un coste de " + flightsFiltered[i].cost + sino);
            }
        }
    } else if (usrFilter == 1) {
        var sino = "";
        var costFilter = prompt("Introduzca una cantidad:");
        console.log("VUELOS CON PRECIO MAYOR A " + costFilter + " =>");
        var flightsFiltered = flights.filter(flight => flight.cost > costFilter);
        for (i = 0; i < flightsFiltered.length; i++) {
            if (flightsFiltered[i].scale === true) {
                sino = " y realiza escala.";
                console.log("Vuelo con origen: " + flightsFiltered[i].from + " y destino: " + flightsFiltered[i].to + " tiene un coste de " + flightsFiltered[i].cost + sino);
            } else {
                sino = " y no realiza ninguna escala.";
                console.log("Vuelo con origen: " + flightsFiltered[i].from + " y destino: " + flightsFiltered[i].to + " tiene un coste de " + flightsFiltered[i].cost + sino);

            }
        }
    } else {
        alert("No ha seleccionado ninguna de las opciones posibles.");
        console.log("No ha seleccionado ninguna de las opciones posibles.");

    }
    console.log("FIN DE PROGRAMA");
}

function airlinesAdmin() {

    var adminFilter = prompt("Hola ADMIN!" + "\n" + "1. Añadir vuelo    2. Eliminar vuelo    3. Salir");
    if (adminFilter == 3) {
        alert("Gracias ADMIN, hasta pronto.");
        console.log("Gracias ADMIN, hasta pronto.");
    } else if (adminFilter == 2) {
        var deleteFlightId = Number(prompt("Escribe el ID que quieres eliminar."));
        console.log("HA ELIMINADO EL SIGUIENTE VUELO => ");
        console.log("Id: " + deleteFlightId + "   Origen: " + flights[deleteFlightId].from + "   Destino: " + flights[deleteFlightId].to);
        delete flights[deleteFlightId];
    } else if (adminFilter == 1) {
        if (flights.length == 15) {
            alert("No es posible almacenar más vuelos.");
            console.log("No es posible almacenar más vuelos.");
        } else {
            var newTo = prompt("Destino:");
            var newFrom = prompt("Origen:");
            var newCost = prompt("Coste:");
            var newScale = confirm("Tiene Escala?     Cancelar: NO   Aceptar: SI");
            var newFlight = [];
            newFlight["id"] = i++;
            newFlight["to"] = newTo;
            newFlight["from"] = newFrom;
            newFlight["cost"] = Number(newCost);
            newFlight["scale"] = newScale;
            flights.push(newFlight);
            var sino = "";
            for (i = (flights.length - 1); i < flights.length; i++) {
                if (flights[i].scale === true) {
                    sino = "SI"
                    console.log("HA AÑADIDO EL SIGUIENTE VUELO => ");
                    console.log("Origen: " + flights[i].from + "  Destino: " + flights[i].to + "  Coste: " + flights[i].cost + "€  Escala: " + sino);
                } else {
                    sino = "NO";
                    console.log("HA AÑADIDO EL SIGUIENTE VUELO => ");
                    console.log("Origen: " + flights[i].from + "  Destino: " + flights[i].to + "  Coste: " + flights[i].cost + "€  Escala: " + sino);
                }
            }

        }


    } else {
        alert("No ha seleccionado ninguna de las opciones posibles.");
        console.log("No ha seleccionado ninguna de las opciones posibles.");
    }
    console.log("FIN DE PROGRAMA");
}

function userOrAdmin() {
    var usrAdm = prompt("Eres USER o ADMIN?");
    if (usrAdm == "USER") {
        console.log("Ha accedido como USER.");
        airlinesUser();
    } else if (usrAdm == "ADMIN") {
        console.log("Ha accedido como ADMIN.");
        airlinesAdmin();
    } else {
        alert("No ha accedido.");
        console.log("No ha accedido.");
        console.log("FIN DE PROGRAMA");
    }
}

function ejecutarAirlines() {
    console.log("INICIO DE PROGRAMA");
    var inicio = prompt("Hola, quiere ver el proyecto: " + "\n" + "    1. Básico     2. Pro");
    if (inicio == 2) {
        userOrAdmin();
    } else if (inicio == 1) {
        airlines();
    } else {
        alert("No ha seleccionado ninguna de las opciones posibles.");
        console.log("No ha seleccionado ninguna de las opciones posibles.");
        console.log("FIN DE PROGRAMA");
    }

}

ejecutarAirlines();