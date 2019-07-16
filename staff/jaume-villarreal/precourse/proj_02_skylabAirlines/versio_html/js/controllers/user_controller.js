$(document).ready(function(){
    //get flight
    var getFlight = function(id , objFlights){
        for(flight in flights){
            if(id === objFlights[flight].id)
            return objFlights[flight];
        }
        return false;
    }; 

    $('#insertQueryBtn').click(function(){
        var queryID = parseInt($('#queryID').val());
        var queryFlight = getFlight(queryID , flights);
        if(queryFlight == false){
            alert('This ID flight is not registered in our DB. Insert a new ID, please.'); 
        }else{
            $('#fromBox').text(queryFlight.from);
            $('#toBox').text(queryFlight.to);
            $('#costBox').text(`${queryFlight.cost}€`);
            $('#scaleBox').text(queryFlight.scale);
        }
        $('#queryID').val(''); 
    });
});
