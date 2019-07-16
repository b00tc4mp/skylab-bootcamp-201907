$(document).ready(function(){
    //INDEX
    var userName = getURLparameters();
    var userGender = getGender(userName , users);
    var userProfile = getProfile(userName , users);

    //header
    var headerIconHTML = headerIconContent(userName);
    var headerUserID = headerUserIdentification(userName);
    var headerHTML = headerIconHTML+headerUserID;
    $('header').html(headerHTML);
              
    //user icon
    $('#userIcon').attr('src' , userIcon(userGender));

    // presentation text
    $('#presentation').html(presentation(userName , userGender));
    
    //non stopover fligths message
    $('#nonStopOverFlightsMessage').text(messageAvalaibleFlights(flights));
    
    //non stopover fligths list
    $('#nonStopOverFlightsList').html(retrieveAvalaibleFlights(flights));

    // average cost
    $('#averageCost').text(calculateAvegareFlights(flights));

    // non stopover flights
    $('#countStopOverFlights').html(countScaleFlights(flights));

    //stopover fligths message
    $('#stopOverFlightsMessage').text(messageLastFlights(totalLastFlights));
    
    //stopover fligths list
    $('#stopOverFlightsList').html(retrieveLastFlights(totalLastFlights , flights));

        

        //BUTTONS
        //admin button behaviour
        //..estableix el comportament del botó 'admin'
        $('#adminButton').click(function(){
            var thisText = $(this).text();
            if(thisText === userProfile){
                var stringQuery = `?username=${userName}`;
                window.location.href = `admin.html${stringQuery}`;
            }
            else{
                alert(`The user ${userName} hasn't got ADMIN profile.`);
            }
        });

        //user button behaviour
        // ..estableix el comportament del botó 'user'
        $('#userButton').click(function(){
            var thisText = $(this).text();
            if(thisText === userProfile){
                var stringQuery = `?username=${userName}`;
                window.location.href = `user.html${stringQuery}`;
            }
            else{
                alert(`The user ${userName} hasn't got USER profile.`);
            }
        });
});