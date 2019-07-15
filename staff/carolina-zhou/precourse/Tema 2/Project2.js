// PROYECTO 2: Skylab Airlines!
/*Programa una interfaz de usuario para una aerolínea (por terminal...). Esta aerolínea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos deben estar declarados de manera global, cuando se llame a la función:
Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuántos vuelos efectúan escalas.
Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.*/

let flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shanghai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

function airlines() {
    
    for (i=0; i < flights.length; i++) {
        if (flights[i].scale === true) {
            console.log("El vuelo con origen: " + flights[i].to + ", y destino: " + flights[i].from + ", tiene un coste de " + flights[i].cost + "€ y realiza escala");
        } else {
            console.log("El vuelo con origen: " + flights[i].to + ", y destino: " + flights[i].from + ", tiene un coste de " + flights[i].cost + "€ y no realiza ninguna escala");
        }
    }

    let sum = flights[0].cost + flights[1].cost + flights[2].cost + flights[3].cost + flights[4].cost + flights[5].cost + flights[6].cost + flights[7].cost + flights[8].cost + flights[9].cost + flights[10].cost;
    let costeMedio1 = sum / 11;
    let costeMedio2 = costeMedio1.toFixed(2);
    console.log("El coste medio de los vuelos es de " + costeMedio2 + " euros.");

    let lastDest = [flights[06].to, flights[07].to, flights[08].to, flights[09].to, flights[10].to];
    console.log("Los últimos vuelos tienen destino: " + lastDest);
    
};

let response1 = prompt("Introduzca su nombre antes de continuar");
if (response1 === null || response1 === "") {
    console.log("Ha cancelado o introducido un nombre vacío");
} else {
    console.log("Bienvenido/a a Skylab Airlines, " + response1 + ".");
    airlines();
}



let response2 = prompt("Introduce: ADMIN or USER");

if (response2 ==="ADMIN") {
    admin();
} else if (response2 ==="USER") {
    user();
}

function admin() {
  let continuar = "YES";
  while (continuar === "YES") {
    let x = prompt("Introduce: CREAR o BORRAR");
    if (x === "CREAR") {
      if (flights.length === 15) {
          alert("No se pueden crear más vuelos.")
      } else {
          let crearTo = prompt("A (destinación):")
          let crearFrom = prompt("Desde:")
          let crearCost = prompt("Coste:")
          let crearScale = prompt("Escala (true o false):")
          let nuevoFlight = {}
              nuevoFlight["id"] = i++;
              nuevoFlight["to"] = crearTo;
              nuevoFlight["from"] = crearFrom;
              nuevoFlight["cost"] = Number(crearCost);
              nuevoFlight["scale"] = crearScale.toLowerCase === "true";
              flights.push(nuevoFlight)
              for (j=0; j < flights.length; j++) {
                if (flights[j].scale === true) {
                    console.log("El vuelo con origen: " + flights[j].to + ", y destino: " + flights[j].from + ", tiene un coste de " + flights[j].cost + "€ y realiza escala");
                } else {
                    console.log("El vuelo con origen: " + flights[j].to + ", y destino: " + flights[j].from + ", tiene un coste de " + flights[j].cost + "€ y no realiza ninguna escala");
                }
              }
              
        }
    } else if (x === "BORRAR") {
          let y = prompt("Introduce ID del vuelo a borrar:")
          console.log("Has eliminado el vuelo con ID " + y + ". Destino: " + flights[y].to + " .")
          delete flights[y];
          console.log(flights);
    } else {
          console.log("Error. Introduce una de las dos opciones");
    }
    continuar = prompt("¿Continuar? YES o NO");
  }
};

function user() {
    let z = prompt("¿Busca vuelo por precio? Introduzca: MAYOR A, MENOR A o IGUAL A. ¿Busca comprar un vuelo? Introduzca COMPRA.");
    if (z === "COMPRA") {
        let b = prompt("¿Quiere comprar un vuelo? Introduzca: YES o NO.")
        if (b === "YES") {
            let c = prompt("Introduzca ID de vuelo");
            console.log("Vuelo con ID: " + c + ". Gracias por su compra, vuelva pronto.")
        } else if (b === "NO") {
            console.log("Le esperamos. Vuelva pronto.")
        } else {
            console.log("Error. Elija una de las dos opciones (YES o NO).")
        }
    } else if (z === "MAYOR A" || z === "MENOR A"|| z === "IGUAL A") {
        let a = prompt("Introduzca la cantidad de dinero en números:");

            if (z === "MAYOR A") {
                const result1 = flights.filter(flight => flight.cost > a);
                for (k=0; k < result1.length; k++) {
                    if (result1[k].scale === true) {
                        console.log("El vuelo con origen: " + result1[k].to + ", y destino: " + result1[k].from + ", tiene un coste de " + result1[k].cost + "€ y realiza escala");
                    } else {
                        console.log("El vuelo con origen: " + result1[k].to + ", y destino: " + result1[k].from + ", tiene un coste de " + result1[k].cost + "€ y no realiza ninguna escala");
                    }
                }
            } else if (z === "MENOR A") {
                const result2 = flights.filter(flight => flight.cost < a);
                for (m=0; m < result2.length; m++) {
                    if (result2[m].scale === true) {
                        console.log("El vuelo con origen: " + result2[m].to + ", y destino: " + result2[m].from + ", tiene un coste de " + result2[m].cost + "€ y realiza escala");
                    } else {
                        console.log("El vuelo con origen: " + result2[m].to + ", y destino: " + result2[m].from + ", tiene un coste de " + result2[m].cost + "€ y no realiza ninguna escala");
                    }
                }
            } else if (z === "IGUAL A") {
                const result3 = flights.filter(flight => flight.cost = a);
                for (n=0; n < result3.length; n++) {
                    if (result3[n].scale === true) {
                        console.log("El vuelo con origen: " + result3[n].to + ", y destino: " + result3[n].from + ", tiene un coste de " + result3[n].cost + "€ y realiza escala");
                    } else {
                        console.log("El vuelo con origen: " + result3[n].to + ", y destino: " + result3[n].from + ", tiene un coste de " + result3[n].cost + "€ y no realiza ninguna escala");
                    }
                }
            }

    }
};