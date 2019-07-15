//USER_ID INTERFACE
var userIcon = function(gender){
    src='img/';
    switch(gender){
        case 'w':
            src += 'female_user_icon.jpeg';
            break;
        case 'm':
            src += 'male_user_icon.jpeg';
            break;
    }
    return(src);
}

//presentation message
var presentation = function(name , gender){
    str='';
    switch(gender){
        case 'w':
            str=`Hello <span>Mrs ${name}</span>. Nice to meet you!`;
            break;
        case 'm':
            str=`Hello <span>Mr ${name}</span>. Nice to meet you!`;
            break;
    }
    var userID = document.getElementById('userId').style.visibility='visible';
    var infoFlights = document.getElementById('infoFlights').style.visibility='visible';
    return(str);
}

//get the user's gender
var getGender = function(name , users){
    gender = '';
    for(user in users){
        if(name == users[user].name){
            gender = users[user].gender;
        }
    }
    return gender;
}

// get the user's profile
var getProfile = function(name , users){
    profile = '';
    for(user in users){
        if(name == users[user].name){
            profile = users[user].profile;
        }
    }
    return profile;
}

//RETRIEVE AVALAIBLE FLIGHTS
var messageAvalaibleFlights = function(objFlights){
    var counterScales = 0;
    for(flight in objFlights){
        if(objFlights[flight].scale === false){counterScales++};
    }
    var str = `Today there are ${counterScales} flights with stopovers.`;
    return str;
};

var retrieveAvalaibleFlights = function(objFlights){
    var currentList = '';
    for(fligth in objFlights){
        if(!objFlights[fligth].scale){
            currentList += `<li class="list-group-item"><img class='glyph-icon' src="img/glyph/svg/si-glyph-airplane.svg"/>`;
            currentList += `The flight with origin in <span>${objFlights[fligth].from}</span> and destination in <span>${objFlights[fligth].to}</span> has a cost of <span>${objFlights[fligth].cost}€</span> and doesn't make any stopovers.</li>`;
        }
    }
    return currentList;
};

//AVERAGE COST
var calculateAvegareFlights = function(objFlights){
    var amount = 0;
    for(fligth in objFlights){
        amount += objFlights[fligth].cost;
    }
    var average = amount/objFlights.length;
    var str = `The average cost of the flights is ${average.toFixed(2)}€.`;
    return str;
}

// NON STOPOVER FLIGHTS ACCOUNT
var countScaleFlights = function(objFlights){
    var counterScales = 0;
    for(flight in objFlights){
        if(objFlights[flight].scale){counterScales++};
    };
    var str = `Today there are ${counterScales} flights with stopovers.`;
    return str;
};

// LAS FLIGHTS
var messageLastFlights = function(totalLastFlights){
    var str = `The destiny of the last ${totalLastFlights} flights are the following ones:`;
    return str;
};

var retrieveLastFlights = function(totalLastFlights , objFlights){
    var str = `<p>The destiny of the last ${totalLastFlights} flights are the following ones:</p>`;
    var limit = objFlights.length - totalLastFlights;
    var currentList = '';
    for(var i = limit ; i < objFlights.length ; i++){
        currentList += `<li class="list-group-item"><img class='glyph-icon' src="img/glyph/svg/si-glyph-airplane.svg"/>`;
        currentList +=`ID: <span>${objFlights[i].id}</span> => Destiny: <span>${objFlights[i].to}</span>.</li>`;
    }
    return currentList;
};


