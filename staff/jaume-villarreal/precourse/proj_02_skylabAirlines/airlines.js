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

//greeting question
let greetingQuest = () => {
    let userName = prompt('Insert your name, please.');
    return(`===SKYLAB AIRLINES===\nWelcome ${userName}\nThese are our avalaible flights:`);
};

//get avalaible flights
let getAvalaibleFlights = objFlights => {
    let listString = '';
    objFlights.forEach(flight => {
    listString += `ID: ${flight.id} => FROM: ${flight.from} -> TO: ${flight.to} <<>> COST ${flight.cost}€ <> [SCALES: ${flight.scale}]\n`;
    });
    return(listString);
}

let averageCost = objFlights => {
    let acc = 0;
    for(var i = 0 , objLength = objFlights.length ; i<objLength ; i++){
        acc += objFlights[i].cost;
    }
    let average = (acc/objFlights.length).toFixed(2);
    return(`The average cost of Skylab Airlines flights is ${average}€`);
};

let getScaleFlights = objFlights => {
    let currentString = 'These are the flights with scale:\n';
    for(var i = 0 , objLength = objFlights.length ; i<objLength ; i++){
        if(objFlights[i].scale){
            currentString += `ID: ${objFlights[i].id} <> FROM ${objFlights[i].from} => TO ${objFlights[i].to}\n`;
        }
    }
    return(currentString);
}

let getLastFlights = (objFlights , qttyFlights) => {
    let init = objFlights.length - qttyFlights;
    let currentString = `The last ${qttyFlights} destinations for today are the following ones:\n`;
    for(var i = init , objLength = objFlights.length ; i<objLength ; i++){
        currentString += `Flight ID: ${objFlights[i].id} => Destination: ${objFlights[i].to}\n`;
    }
    return(currentString);
} 

//MAIN
const lastFlights = 5;
let airlines = () => {
    console.log(greetingQuest());
    console.log(getAvalaibleFlights(flights));
    console.log(averageCost(flights));
    console.log(getScaleFlights(flights));
    console.log(getLastFlights(flights , lastFlights));
};

//EXE
airlines();


