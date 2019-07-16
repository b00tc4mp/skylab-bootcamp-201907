//mètode de creació d'un nou array per a l'objecte 'flights'
var newFligth = function(newID , newTo , newFrom , newCost , newScale){  
    objFligth = {
        id: newID,
        to: newTo,
        from: newFrom,
        cost: parseInt(newCost),
        scale: newScale};
        currentQttyFlights++;
    return objFligth;
}

//mètode d'avís/confirmació de la inserció d'un nou vol 
var alertNewFligth = function(newID , newTo , newFrom , newCost , newScale){  
    var str = 'A new flight has been inserted in our database:\n';
    str += `id: ${newID-1}\n`;
    str += `to: ${newTo}\n`;
    str += `from: ${newFrom}\n`;
    str += `cost: ${newCost}€\n`;
    str += `scales: ${newScale}\n`;
    return alert(str);
}

//limit flights of DB
var limitFlightsDataBase = function(limit){
    var str = `Our DB has the capacity to store ${limit} flights.`;
    return str;
}

//current total flights in DB
var totalFlightsDataBase = function(currentTotal){
    var str = `The current total stored in our DB is ${currentTotal} flights.`;
    return str;
}

//remaining flights in DB
var remainingFlightsDataBase = function(limit , currentTotal){
    var str = `The remaining capacity in our DB is ${limit - currentTotal} flights.`;
    return str;
}

//currentFlightsList in DB
var currentFlightsListDB = function(objFlights){
    str='';
    for(flight in objFlights){
        str += `<div class='infoFligthsTable'>`;
        str += `<p><img class='glyph-icon' src="img/glyph/svg/si-glyph-airplane.svg"/></p>`;
        str += `<p class='infoFlight'>ID: ${objFlights[flight].id} => FROM: ${objFlights[flight].from} <> TO: ${objFlights[flight].to}.</p>`;
        str += `<p class='infoFlightButton pointer' onclick='showFlightInfo(${objFlights[flight].id})'><img class='glyph-icon' src="img/glyph/svg/si-glyph-circle-info.svg"/></p>`;
        str += `<p class='deleteFlightButton pointer' onclick='deleteFlight(${objFlights[flight].id})'><img class='glyph-icon' src="img/glyph/svg/si-glyph-trash.svg"/></p>`;
    }
    return str;
}

//get data flight
var getFlight = function(id , objFlights){
    for(flight in flights){
        if(id === objFlights[flight].id)
        return objFlights[flight];
    }
    return false;
};

//alert info flight
var alertInfoFlight = function(flight){
    var alertString='';
    alertString += `Identification code: ${flight.id}\n`;
    alertString += `ORIGIN: ${flight.from}\n`;
    alertString += `DESTINATION: ${flight.to}\n`;
    alertString += `COST: ${flight.cost}€\n`;
    alertString += `SCALE: ${flight.scale}\n`;
    return alertString;
}

//INFO & DELETE buttons behaviour
var showFlightInfo = function(id){
    var idFlight = getFlight(id , flights);
    alert('INFO FLIGHT:\n' + alertInfoFlight(idFlight));
};

var deleteFlight = function(id){
    var idFlight = getFlight(id , flights);
    alert('DELETED FLIGHT:\n' + alertInfoFlight(idFlight));

    var filtered = flights.findIndex((flight, i) => {
        if(flight.id === id){
            return i;
        }
    });
    
    filteredFlight = filtered == -1 ? 0 : filtered; // el mètode findIndex() retorna -1 per a la posició 0. Es rectifica per evitar inconsistències en l'esborrat de les dades
    flights.splice(filteredFlight , 1);

    //set current total DB
    $('#totalFlightsDataBase').text(totalFlightsDataBase(flights.length));

    //set total remaining DB
    $('#remainingFlightsDataBase').text(remainingFlightsDataBase(limitFlightsDB , flights.length));

    //set flights in DB
    $('#listCurrentFlightsDB').html(currentFlightsListDB(flights));
};



