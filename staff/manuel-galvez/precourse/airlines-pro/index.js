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


var promptHeader = `******** SKYLAB AIRLINES ********\n\n`

var username = login();
if (username) {
    var role = checkRole();
    if (role === 'admin') {
        selectOption(role);
    } else if (role === 'user') {
        selectOption(role);
    }
} 



 function login() {
    /* Checks if username was properly entered */

    do {
        var username = prompt(`${promptHeader}Please, enter username:\n\n`);
        if (username === null) {
            alert(`${promptHeader}No username was provided. See you next time\n\n`);
            return false;
        }
    } while (username.trim() === '');

    if (username) {
        alert(`${promptHeader}Welcome ${username}!\n\n\n`);
        return username;
    }
}  

function checkRole() {
    /* Checks if role was properly entered */

    do {
        var role = prompt(`${promptHeader}Please, enter your role (admin/user):\n\n`);
        if (role === null) {
            alert(`${promptHeader}No valid role provided. Default role is user.\n\n`);
            return 'user';
        } 
    } while (role.trim() === '');

    if (role.toLowerCase() === 'admin') {
        return 'admin';
    } else if (role.toLowerCase() === 'user') {
        return 'user';
    } else {
        alert(`${promptHeader}No valid role provided. Default role is user.\n\n`);
        return 'user';
    }
} 

function selectOption(role) {
    /* Returns flights information based on option selected by the user */ 

    var userOptions = [
        '1. Show ALL the available flights.',
        '2. Show AVERAGE COST of available flights.',
        '3. Show how many flights have stopovers.',
        '4. Show LAST 5 DEPARTING flights today.',
        '5. Show all of the above.',
        '6. Search and purchase flight.'
    ];

    var adminOptions = [
        '1. Show ALL the available flights.',
        '2. Show AVERAGE COST of available flights.',
        '3. Show how many flights have stopovers.',
        '4. Show LAST 5 DEPARTING flights today.',
        '5. Show all of the above.',
        '6. Add new flights.',
        '7. Remove flights.'
    ];

    if (role === 'admin') {
        var optionsToShow = adminOptions
        var availableOptions = ['1','2','3','4', '5', '6', '7', 'exit'];
    } else {
        var optionsToShow = userOptions
        var availableOptions = ['1','2','3','4', '5', '6', 'exit'];
    }

    do {
        var option = prompt(`${promptHeader}Please, select one of the options below (type exit to leave):\n\n${optionsToShow.join('\n')}\n\n`)
        if (option === null) {
            alert(`${promptHeader}See you next time!\n\n`);
            return false;
        }
    } while (option.trim() === '');

    if (availableOptions.includes(option)) {
        switch (option.toLowerCase()) {
            case "1":
                showFlights(flights);
                selectOption(role);
                break;
            case "2":
                getAverageCost();
                selectOption(role);
                break;
            case "3":
                getStopoverFlights();
                selectOption(role);
                break;
            case "4":
                getLastFlights(); 
                selectOption(role);
                break;
            case "5":
                showFlights(flights);
                getAverageCost();
                getStopoverFlights();
                getLastFlights(); 
                selectOption(role);
                break;
            case "6":
                if (role !== 'admin') {
                    var success = searchFlights();
                    if (success) {
                        purchaseFlight();
                    }
                    selectOption(role);
                    break;
                } else {
                    addFlight();
                    selectOption(role);
                    break;
                };
            case "7":
                removeFlight();
                selectOption(role);
                break;
            case "exit":
                alert(`${promptHeader}See you next time.`);
                break;
            default:
                alert(`${promptHeader}See you next time.`);
                break;
        }
    } else {
        alert(`${promptHeader}That option is not in the list. Try again.\n\n`);
        selectOption();
    }
}


function showFlights(flightObj, headerMessage, noAlert) {
    flightOutput = []
    flightObj.forEach(function(flight) {
        if (flight.scale) {
            flightOutput.push(`Flight with ID ${flight.id} from ${flight.from} to ${flight.to} costs $${flight.cost}. It's a stopover flight.`);
        } else {
            flightOutput.push(`Flight with ID ${flight.id} from ${flight.from} to ${flight.to} costs $${flight.cost}. No stopovers.`);
        }
    })
    if (!headerMessage) {
        var headerMessage = `The following are all the flights available in the system:\n\n`;
    }
    if (noAlert) {
        return flightOutput;
    }
    alert(`${promptHeader}${headerMessage}${flightOutput.join('\n')}\n\n\n`)
}


function getAverageCost() {
    /* Returns average cost of all flights available */

    var totalSum = flights.reduce(function(sum, flight) {
        return sum + flight.cost;
    }, 0);
    var averageCost = (totalSum/flights.length).toFixed(2);
    alert(`${promptHeader}Average cost of all available flights is $${averageCost}\n\n`);
}


function getStopoverFlights() {
    /* Returns only those flights with stopovers */

    var stopoverFlights = flights.filter(function(flight) {
        return flight.scale;
    })
    alert(`${promptHeader}There are ${stopoverFlights.length} stopover flights.\n\n`);
}


function getLastFlights() {
    /* Returns the last 5 flights (based on object's incremental ID) */

    // Copy of original object, to avoid mutating it (sorting)
    var copyFlights = Array.from(flights);
    copyFlights.sort(function(a,b) {
        if (parseInt(a.id) < parseInt(b.id)) {
            return 1;
        } else if (parseInt(a.id) > parseInt(b.id)) {
            return -1;
        } else {
            return;
        }
    })
    var n = 5;
    var lastFlights = copyFlights.slice(0, n);
    var headerMessage = `These are the last ${n} departing flights:\n\n`;
    showFlights(lastFlights, headerMessage);
}

function addFlight() {

    // Check limit of 15 flights
    if (flights.length >= 15) {
        alert(`${promptHeader}There are already 15 flights in the system. You cannot add a new one unless you remove one first.\n\n`);
        return false;
       }

    do {
        var answerFrom = prompt(`${promptHeader}Flight departs from (add city):\n`);
        if (answerFrom === null) {
            alert(`${promptHeader}Add new flight cancelled. Select option.\n\n`);
            return false;
        }
    } while (answerFrom.trim() === '');

    do {
        var answerTo = prompt(`${promptHeader}Flight goes to (add city):\n`);
        if (answerTo === null) {
            alert(`${promptHeader}New flight creation aborted.`);
            return false;
        }
    } while (answerTo.trim() === '');

    do {
        var answerCost = prompt(`${promptHeader}The cost of the flight is:\n`);
        if (answerCost === null) {
            alert(`${promptHeader}Add new flight cancelled. Select option.\n\n`);
            return false;
        }
    } while (answerCost.trim() === '');

    do {
        var answerStopover = prompt(`${promptHeader}Stopover flight (yes/no):\n`);
        if (answerStopover === null) {
            alert(`${promptHeader}Add new flight cancelled. Select option.\n\n`);
            return false;
        }
    } while (answerCost.trim() === '');

    if (answerFrom && answerTo && answerCost && answerStopover) {
        // Get max ID of flight objects
        var ids = [];
        flights.forEach(function(flight) {
            ids.push(parseInt(flight.id));
        })
        var maxId = Math.max(...ids);

        // Determine if it is a stopover flight
        if (answerStopover.toLowerCase() === 'yes') {
            var scale = true;
        } else if (answerStopover.toLowerCase() === 'no') {
            var scale = false;
        }

        // Push new flight to flights object
        flights.push({
            id: maxId + 1, 
            to: answerTo, 
            from: answerFrom, 
            cost: parseInt(answerCost), 
            scale: scale
        });
        alert(`${promptHeader}Flight added successfully.\n\n`);
        return true;
    }
}

function removeFlight() {

    do {
        var idToRemove = prompt(`${promptHeader}Please, enter the ID of the flight you want to remove:\n`);
        if (idToRemove === null) {
            alert(`${promptHeader}Remove flight aborted.\n\n`);
            return false;
        }
    } while (idToRemove.trim() === '');

    for (i=0; i<flights.length;i++) {
        if (flights[i].id === parseInt(idToRemove)) {
            flights.splice(i, 1);
            alert(`${promptHeader}Flight with ID ${i} removed successfully.\n\n`);
            return;
        }
    }
    alert(`${promptHeader}Flight with ID ${idToRemove} not found. Try again.\n\n`);
    removeFlight();
}

function searchFlights() {

    do {
        var referencePrice = prompt(`${promptHeader}Please, enter the reference price:\n\n`);
        if (referencePrice === null) {
            alert(`Flight search cancelled. Select option.\n\n`);
            return false;
        }
    } while (referencePrice.trim() === '');

    referencePrice = parseInt(referencePrice);
    if (parseInt(referencePrice)) {
        var aboveReferencePrice = flights.filter(function(flight) {
            return flight.cost > referencePrice;
        });

        var belowReferencePrice = flights.filter(function(flight) {
            return flight.cost < referencePrice;
        });

        var exactReferencePrice = flights.filter(function(flight) {
            return flight.cost == referencePrice;
        });
        
        if (aboveReferencePrice.length) {
            var headerMessage = `Flights which cost is above the reference price ($${referencePrice}):\n\n`;
            showFlights(aboveReferencePrice, headerMessage);
        } else {
            alert(`No flights over $${referencePrice}\n\n`);
        }

        if (belowReferencePrice.length) {
            var headerMessage = `Flights which cost is below the reference price ($${referencePrice}):\n\n`;
            showFlights(belowReferencePrice, headerMessage);
        } else {
            alert(`No flights under $${referencePrice}\n\n`);
        }

        if (exactReferencePrice.length) {
            var headerMessage = `Flights which cost match the reference price ($${referencePrice}):\n\n`;
            showFlights(exactReferencePrice, headerMessage);
        } else {
            alert(`No flights that cost exactly $${referencePrice}\n\n`);
        }

        return true;

    } else {
        alert('Not a valid price. Try again.\n\n');
        var success = searchFlights();
        if (success) {
            purchaseFlight();
        }
    }
}

function purchaseFlight() {

    do {
        var purchaseID = prompt(`${promptHeader}Enter the ID of the flight you want to purchase:\n\n${showFlights(flights, ' ', true).join('\n')}\n\n`);
        if (purchaseID === null) {
            alert(`${promptHeader}Purchase canceled. Select option.\n\n`);
            return false;
        }
    } while (purchaseID.trim() === '');

    purchaseID = parseInt(purchaseID);
    if (purchaseID >= 0) {
        for (i=0;i<flights.length;i++) {
            if (flights[i].id === purchaseID) {
                alert(`${promptHeader}Thanks for purchasing a seat in flight with ID ${flights[i].id} from ${flights[i].from} to ${flights[i].to}. See you on board.\n\n`);
                return;
            }
        }
        alert(`${promptHeader}Sorry, there is no flight with that ID. Try again\n\n`);
        purchaseFlight();
    }
}



