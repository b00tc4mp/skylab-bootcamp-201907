$(document).ready(function(){
    //comportament del botó INSERT
    $('#insertButton').click(function(){
        if(flights.length<limitFlightsDB){
            var newFrom = $('#fromInput').val();
            var newTo = $('#toInput').val();
            var newCost = $('#costInput').val();
            var newScale = $('#scaleInput').val();

            //creació de l'array de dades a partir del formulari
            //inclusió de l'array a l'objecte 'flights'
            var newFligthData = newFligth(currentQttyFlights , newTo , newFrom , newCost , newScale);
            flights.push(newFligthData);

            //set current total DB
            $('#totalFlightsDataBase').text(totalFlightsDataBase(flights.length));

            //set total remaining DB
            $('#remainingFlightsDataBase').text(remainingFlightsDataBase(limitFlightsDB , flights.length));

            //set flights in DB
            $('#listCurrentFlightsDB').html(currentFlightsListDB(flights));

            //set form inputs
            $('#fromInput').val('');
            $('#toInput').val('');
            $('#costInput').val('');
            $('#scaleInput').val('');

            alertNewFligth(currentQttyFlights , newTo , newFrom , newCost , newScale);  
        }
        else{
            alert('DataBase capacity excedeed');
        }
     
    });
});