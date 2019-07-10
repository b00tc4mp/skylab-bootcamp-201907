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

var inputName = prompt('Insert your name, please.');
var inputGender = prompt('Are you a woman or a man? Insert w or m');

var LF = function(){
    console.log('========================');
}

var presentation = function(name , gender){
    str='';
    switch(gender){
        case 'w':
            str=`Hello Mrs ${name}. Nice to meet you!`;
            break;
        case 'm':
            str=`Hello Mr ${name}. Nice to meet you!`;
            break;
    }
    console.log(str);
}

var showAvalaibleFlights = function(objFlights){
    for(fligth in objFlights){
        if(!objFlights[fligth].scale){
            LF();
            console.log(`The flight with origin in ${objFlights[fligth].from} and destination in ${objFlights[fligth].to} has a cost of ${objFlights[fligth].cost}€ and doesn't make any stopovers.\n`);
        }
    }    
};

var showAvegareFlights = function(objFlights){
    var amount = 0;
    for(fligth in objFlights){
        amount += objFlights[fligth].cost;
    }
    var average = amount/objFlights.length
    LF();
    LF();
    console.log(`The average cost of the flights is ${average.toFixed(2)}€.`)
}

var showScaleFlights = function(objFlights){
    var counterScales = 0;
    for(flight in objFlights){
        if(objFlights[flight].scale){counterScales++};
    };
    LF();
    LF();
    console.log(`Today there are ${counterScales} flights with stopovers.`)
};

var showLastFlights = function(totalLastFlights , objFlights){
    LF();
    LF();
    console.log(`The destiny of the last ${totalLastFlights} flights are the following ones:`);
    var limit = objFlights.length - totalLastFlights;
    for(var i = limit ; i < objFlights.length ; i++){
        LF();
        console.log(`ID: ${objFlights[i].id} || Destiny: ${objFlights[i].to}.`);
    }
};

//interface
presentation(inputName , inputGender);
showAvalaibleFlights(flights);
showAvegareFlights(flights);
showScaleFlights(flights);
showLastFlights(5 , flights);

pressSpaceBar(event);
// var inputProfile = prompt('Are you Admin? => y/n');

