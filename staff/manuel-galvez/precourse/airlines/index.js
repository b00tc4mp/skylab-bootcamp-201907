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
    selectOption();
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


function selectOption() {
    /* Returns flights information based on option selected by the user */ 

    var optionsText = [
        '1. Show ALL the available flights.',
        '2. Show AVERAGE COST of available flights.',
        '3. Show how many flights have stopovers.',
        '4. Show LAST 5 DEPARTING flights today.',
        '5. Show all of the above.'
    ];

    var availableOptions = ['1','2','3','4', '5', '6', 'exit'];

    do {
        var option = prompt(`${promptHeader}Please, select one of the options below (type exit to leave):\n\n${optionsText.join('\n')}\n\n`)
        if (option === null) {
            alert(`${promptHeader}See you next time!\n\n`);
            return false;
        }
    } while (option.trim() === '');

    if (availableOptions.includes(option)) {
        switch (option.toLowerCase()) {
            case "1":
                showFlights(flights);
                selectOption();
                break;
            case "2":
                getAverageCost();
                selectOption();
                break;
            case "3":
                getStopoverFlights();
                selectOption();
                break;
            case "4":
                getLastFlights(); 
                selectOption();
                break;
            case "5":
                showFlights(flights);
                getAverageCost();
                getStopoverFlights();
                getLastFlights(); 
                selectOption();
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

function showFlights(flightObj, headerMessage) {
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


