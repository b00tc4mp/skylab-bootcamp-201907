var flights = [{
    id: 00,
    to: 'Bilbao',
    from: 'Barcelona',
    cost: 1600,
    scale: false
  },
  {
    id: 01,
    to: 'New York',
    from: 'Barcelona',
    cost: 700,
    scale: false
  },
  {
    id: 02,
    to: 'Los Angeles',
    from: 'Madrid',
    cost: 1100,
    scale: true
  },
  {
    id: 03,
    to: 'Paris',
    from: 'Barcelona',
    cost: 210,
    scale: false
  },
  {
    id: 04,
    to: 'Roma',
    from: 'Barcelona',
    cost: 150,
    scale: false
  },
  {
    id: 05,
    to: 'London',
    from: 'Madrid',
    cost: 200,
    scale: false
  },
  {
    id: 06,
    to: 'Madrid',
    from: 'Barcelona',
    cost: 90,
    scale: false
  },
  {
    id: 07,
    to: 'Tokyo',
    from: 'Madrid',
    cost: 1500,
    scale: true
  },
  {
    id: 08,
    to: 'Shangai',
    from: 'Barcelona',
    cost: 800,
    scale: true
  },
  {
    id: 09,
    to: 'Sydney',
    from: 'Barcelona',
    cost: 150,
    scale: true
  },
  {
    id: 10,
    to: 'Tel-Aviv',
    from: 'Madrid',
    cost: 150,
    scale: false
  }
];
var finalCost = [];
var averageCost = "";

function startAirlines() {
  //Bienvenida
  var user = prompt("enter a name:");
  alert("Welcome to Skylab Airlines " + user);

  //Visualización de todos los vuelos:
  //array a 0 para los costes:
  // var finalCost=[];
  //array de destinos:
  var destinations = [];
  //for para buscar cada id
  for (var i = 0; i < flights.length; i++) {

    var escalas = "";
    if (flights[i].scale === true) {
      escalas = ("y tiene escalas.");
    } else if (flights[i].scale === false) {
      escalas = ("y no realiza ninguna escala.");
    } else {
      console.log("error");
    }
    console.log(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} € y ${escalas}`);
    //coste vuelos, se guardan en el array final Cost para todos los costes, cambiando el string por integer:
    costOne = Number(flights[i].cost);
    finalCost.push(costOne);
    //destinaciones, se guardan en el array destinations para todos los vuelos
    destination = (flights[i].to);
    destinations.push(destination);
  }
  //Coste medio de vuelos del array finalCost:
  //
  var total = 0;
  for (var i in finalCost) {
    total += finalCost[i];
  }
  console.log("This is the total cost of all flights: " + total + "€");
  averageCost = total / (flights.length);
  console.log("This is the average cost of all flight: " + Math.round(averageCost) + "€");

  //Destinos de los últmos 5 vuelos:
  console.log("Los últimos destinos de hoy són: " + destinations.slice(-5, ));
}

startAirlines();


// PRO
var user = prompt("Por favor seleccione el usuario: ADMIN o USER");
//Si eres ADMIN ********************************************************************************************************************
if (user === "ADMIN") {
  //funcion para crear vuelos mediante un objeto constructor y se pueden constuir uno a uno

  function createFlight() {
    var questionFlight = prompt("Desea crear un vuelo: si o no");
    if (questionFlight === "no") {
      console.log("No se han creado más vuelos")
    } else {
      if (questionFlight === "si") {

        const factory = (id, to, from, cost, scale) => {
          return {
            id,
            to,
            from,
            cost,
            scale,
          }
        }
        var id1="";
        function createIds(){
          var totalIds=[];
          var idFunction = prompt("Crea un id:");
          idFunction=parseInt(idFunction);
          // Check if the id exists
          for(var i=0;i<flights.length;i++){
            totalIds.push(flights[i].id);
          }
          function isInArray(value, array) {
              return array.indexOf(value) > -1;
          }
          if(isInArray(idFunction,totalIds)==true){
            alert("number exists, choose another number")
            createIds();
          }else{
            id1=idFunction;
          }
        }
        createIds();


        var to1 = prompt("Crea un destino:");
        var from1 = prompt("Crea un aeropuerto de salida:");
        var cost1 = prompt("Coste:");
        var scale1 = prompt("Selecciona escala: true o false");
        const newFlight = factory(id1, to1, from1, cost1, scale1);
        console.log(newFlight);
        flights.push(newFlight);
        if (flights.length <= 15) {
          createFlight();
        } else {
          alert("no puede añadir más vuelos")
        }

      }
      if (questionFlight === "no") {
        console.log("No quiere eliminar más vuelos");
      }

    }
  }
  createFlight();
  console.log("estos són los vuelos:");
  console.log(flights);


  //Poder eliminar vuelos mediante ID
  function eliminateFlights() {
    var eliminate = prompt("Quieres eliminar un vuelo: si / no");
    if (eliminate === "si") {
      var eliminateFlight = prompt("que ID quieres eliminar?");
      eliminateFlight = Number(eliminateFlight);
      // me da un erro si quiero eliminar otra vez otro ID ????????
      function searchAndEliminate(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id == nameKey) {
            console.log(myArray[i].id);
            myArray.splice(i, 1);
          }
        }
      }

      searchAndEliminate(eliminateFlight, flights);
      console.log(flights);

      // call la función para poder hacer otra vez si se quiere eliminar un vuelo:
      eliminateFlights()

    } else if (eliminate === "no") {
      console.log("no hay vuelos eliminados");
    } else {
      console.log("error");
    }


  }
  //call la función para eliminar vuelos
  eliminateFlights();


  // Si eres USER: ********************************************************************************************************************
} else if (user === "USER") {
  var flightsList = [];
  var price = prompt("Especifique el precio:")
  price = Number(price);
  var checkPrice = prompt("Como quiere buscar el precio: " + price + " mayor, menor o igual ");
  if (checkPrice === "mayor") {
    for (i = 0; i < flights.length; i++) {
      if (flights[i].cost >= price) {
        //Mostrar cada vuelo cuando es superior al precio

        console.log(flights[i]);
        flightsList.push(flights[i]);
      }
    }
  }
  if (checkPrice === "menor") {
    for (i = 0; i < flights.length; i++) {
      if (flights[i].cost <= price) {
        //Mostrar cada vuelo cuando es menor al precio
        console.log(flights[i]);
        flightsList.push(flights[i]);
      }
    }
  }
  if (checkPrice === "igual") {
    for (i = 0; i < flights.length; i++) {
      if (flights[i].cost == price) {
        //Mostrar cada vuelo cuando es igual al precio
        console.log(flights[i]);
        flightsList.push(flights[i]);
      }
    }
  }

  //Preguntar al usuario si quiere comprar un vuelo de los mostrados verificandolo con el ID
  var shop = prompt("Si desea comprar un vuelo de los mostrados indique el ID:")
  shop = Number(shop);
  //Mostrar el array con todos los vuelos que coinciden con el precio
  console.log(flightsList);
  for (var i = 0; i < flightsList.length; i++) {
    if (flightsList[i].id === shop) {
      console.log("Gracias por su compra")
    }
  }
}
