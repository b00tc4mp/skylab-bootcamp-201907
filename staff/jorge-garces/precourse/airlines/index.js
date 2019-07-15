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



function aerolinea() {

var price;

let user1 = prompt('Welcome to Skylab Airlines, please enter your name.')
console.log(`Nice to see you ${user1}! Check the available flights:`)

let escalas = 0;

  for (var i = 0; i < flights.length; i++) {
    if (flights[i].scale === false) {
      console.log(`The flight from: ${flights[i].from}, destination: ${flights[i].to} has a cost of ${flights[i].cost}€ and is direct.`);
    } else {
      console.log(`The flight from: ${flights[i].from}, destination: ${flights[i].to} has a cost of ${flights[i].cost}€ and makes stops.`);
      escalas++;
    }
  };

let totalCost = 0;
for (var i = 0; i < flights.length; i++) {
 totalCost = totalCost + flights[i].cost;
}

let average = totalCost / flights.length;

console.log(`The average cost for a flight is ${average.toFixed(2)}€`)
console.log(`Of the available flights, ${escalas} make stops.`)

const lastFive = []
for (var i = flights.length - 1; i > flights.length - 6; i--){
  lastFive.push(flights[i].to);
  }

console.log(`This are the last five destinations for today: ${lastFive.join(", ") + '.'}`)

// function aerolinea() {

// Aerolinea PRO

var status = prompt(`${user1} are you a USER o an ADMIN?`)
if (status != null) {
  status = status.toLowerCase();
};
if (status === 'admin') {
  admin();
} else if (status == null) {
  exitApp();
} else if (status == 'user') {
  user();
}

// Admin functions

function admin() {
  console.clear();
  console.log('Welcome ADMIN, what do you want to do?')
  console.log('-----------------------------------------')
  console.log('1. LIST: Shows the available flights.')
  console.log('2. ADD: Adds a new flight to the list.')
  console.log('3. DELETE: Removes a flight from the list.')
  console.log('4. EXIT: Quits the application.')
  console.log('-----------------------------------------')
  var input = prompt('Select an option: LIST, ADD, DELETE or EXIT');
  if (input != null) {
  input = input.toLowerCase();
  };
  if (input == 'list' || input == 1) {
    listFlights();
  } else if (input == 'add' || input == 2) {
    addFlight();
  } else if (input == 'delete' || input == 3) {
    deleteFlight();
  } else if (input == 'exit' || input == null || input == 4) {
    exitApp();
  } else {
    console.log('Please enter LIST, ADD, DELETE or EXIT.');
    admin();
  }
};

function listFlights() {
    for (var i = 0; i < flights.length; i++) {
      console.log(`id: ${i} from: ${flights[i].from} to: ${flights[i].to} cost: ${flights[i].cost}€ stops: ${flights[i].scale}`);
  };
  yesNo();
};

function addFlight() {
  var to = prompt('Enter destination');
  var from = prompt('Enter source');
  var cost = prompt('Enter price');
  var stops = prompt('Stops? true/false');
  if (flights.length > 14) {
    alert('Maximum number of flights (15) reached. Please DELETE some before adding new ones');
    yesNo();
  } else if (to == '' || to == null || from == '' || from == null || cost == '' || cost == null|| stops == '' || stops == null) {
    console.log('You must fill-in every field.')
    addFlight();
  } else {
    var newFlight = {id: flights.length, to: to, from: from, cost: cost, scale: stops};
    flights.push(newFlight);
    console.log('You have added a new flight!');
    yesNo();
  }
};

function deleteFlight() {
  var flightDelete = prompt('Please enter the id of the flight you want to delete');
  if (flightDelete > flights.length - 1 || flightDelete == '') {
    console.log('Please enter a valid ID');
    deleteFlight();
  } else {
  flights.splice(flightDelete, 1);
  console.log(`Flight id ${flightDelete} has been removed`);
  yesNo();
  }
};

// User functions

function user() {
  console.clear();
  console.log('Welcome USER, what do you want to do?')
  console.log('-----------------------------------------')
  console.log('1. SEARCH: Looks for flights in your price range.')
  console.log('2. EXIT: Quits de application.')
  console.log('-----------------------------------------')
  var input = prompt('Select an option: SEARCH or EXIT.');
  if (input != null) {
  input = input.toLowerCase();
  };
  if (input == 'search' || input == 1) {
    searchFlights();
  } else if (input == 'exit' || input == null || input == 2) {
    exitApp();
  } else {
    console.log('Please enter SEARCH or EXIT.');
    user();
  }
};


function searchFlights() {
  price = prompt('Please enter your budget');
  console.clear();
  console.log('USER - Flight SEARCH menu')
  console.log('-----------------------------------------')
  console.log(`1. List flights costing MORE than ${price}€`)
  console.log(`2. List flights costing LESS than ${price}€`)
  console.log(`3. List flights costing ${price}€`)
  console.log(`4. EXIT.`)
  console.log('-----------------------------------------')
  var input = prompt('Select an option.');
  if (input != null) {
  input = input.toLowerCase();
  };
  if (input == 'more' || input == 1) {
    moreFlights();
  } else if (input == 'less' || input == 2) {
    lessFlights();
  } else if (input == 'same' || input == 3) {
    sameFlights();
  } else if (input == 'exit' || input == null || input == 4) {
    exitApp();
  } else {
    console.log('Please enter SEARCH or EXIT.');
    user();
  }
};

function moreFlights() {
    for (var i = 0; i < flights.length; i++) {
      if (flights[i].cost > price) {
      console.log(`id: ${i} from: ${flights[i].from} to: ${flights[i].to} cost: ${flights[i].cost}€ stops: ${flights[i].scale}`);
      }
  }
  buyFlight();
};

function lessFlights() {
  for (var i = 0; i < flights.length; i++) {
    if (flights[i].cost < price) {
    console.log(`id: ${i} from: ${flights[i].from} to: ${flights[i].to} cost: ${flights[i].cost}€ stops: ${flights[i].scale}`);
    }
  }
  buyFlight();
};

function sameFlights() {
  let count = 0;
  for (var i = 0; i < flights.length; i++) {
    if (flights[i].cost == price) {
    console.log(`id: ${i} from: ${flights[i].from} to: ${flights[i].to} cost: ${flights[i].cost}€ stops: ${flights[i].scale}`);
    count++;
    }
  }
  if (count < 1) {
    console.log('Sorry, there are no flights exactly matching your budget.');
    searchFlights();
  }
  buyFlight();
};


function buyFlight() {
  var flightBuy = prompt('Please enter the id of the flight you want to buy');
  if (flightBuy > flights.length - 1 || flightBuy == '') {
    console.log('Please enter a valid flight ID');
    buyFlight();
  } else {
  flights.splice(flightBuy, 1);
  console.log(`Thanks for purchasing flight ${flightBuy}. See you soon!`);
 // yesNo();
  }
};


// Common functions

function yesNo() {
  if (status == 'admin') {
  var question = prompt('Continue to ADMIN menu? y/n');
  if (question != null) {
  question = question.toLowerCase();
  }
  if (question == 'y' || question == 'yes') {
    admin();
  } else if (question == 'n' || question == 'no') {
    exitApp();
  } else if (question == null) {
    exitApp();
  } else {
    console.log('Please answer (Y)es or (N)o');
    yesNo();
  }
} else if (status == 'user') {
  var question = prompt('Continue to USER menu? y/n');
  if (question != null) {
  question = question.toLowerCase();
  }
  if (question == 'y' || question == 'yes') {
    user();
  } else if (question == 'n' || question == 'no') {
    exitApp();
  } else if (question == null) {
    exitApp();
  } else {
    console.log('Please answer (Y)es or (N)o');
    yesNo();
  }
}
 }

function exitApp() {
  console.log('See you soon!')
};





}



aerolinea()