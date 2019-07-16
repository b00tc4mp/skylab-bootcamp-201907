$(document).ready(function(){
    // USER ID
    var userName = getURLparameters();
    // $('#adminID').html(`<p>${userName}</p>`);
    // var userGender = getGender(userName , users);
    // var userProfile = getProfile(userName , users);

    //header
    var headerIconHTML = headerIconContent(userName);
    var headerUserID = headerUserIdentification(userName);
    var headerHTML = headerIconHTML+headerUserID;
    $('header').html(headerHTML);
    
    //INFO BOARD
    //limit DB
    $('#limitFlightsDataBase').text(limitFlightsDataBase(limitFlightsDB));

    //current total DB
    $('#totalFlightsDataBase').text(totalFlightsDataBase(flights.length));

    //total remaining DB
    $('#remainingFlightsDataBase').text(remainingFlightsDataBase(limitFlightsDB , flights.length));

    //current flights in DB
    $('#listCurrentFlightsDB').html(currentFlightsListDB(flights));
});