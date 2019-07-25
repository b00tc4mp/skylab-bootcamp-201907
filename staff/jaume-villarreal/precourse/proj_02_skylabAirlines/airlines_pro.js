// ============DATA MODEL=============
// flights data
const flights = [
    { id: 0, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 1, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 2, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 3, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 4, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 5, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 6, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 7, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 8, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 9, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

// users data
const users = [
    { name: 'Jaume Villarreal' , gender: 'm' , profile: 'admin'},
    { name: 'John Lennon' , gender: 'm', profile: 'admin'},
    { name: 'Paul McCartney' , gender: 'm' , profile: 'user'},
    { name: 'George Harrison' , gender: 'm' , profile: 'user'},
    { name: 'Ringo Starr' , gender: 'm' , profile: 'user'},
    { name: 'Freddie Mercury' , gender: 'm' , profile: 'admin'},
    { name: 'Bryan May' , gender: 'm' , profile: 'user'},
    { name: 'John Deacon' , gender: 'm' , profile: 'user'},
    { name: 'Roger Taylor' , gender: 'm' , profile: 'user'},
    { name: 'Hulio' , gender: 'm' , profile: 'admin'},
    { name: 'Janis Joplin' , gender: 'w' , profile: 'admin'},
    { name: 'Cher' , gender: 'w' , profile: 'user'},
    { name: 'Mafalda' , gender: 'w' , profile: 'admin'},
    { name: 'Princesa Leia' , gender: 'm' , profile: 'admin'},
    { name: 'Amidala' , gender: 'm' , profile: 'admin'},
    { name: 'Wonder Woman' , gender: 'm' , profile: 'admin'},
    { name: 'Siri Apple' , gender: 'm' , profile: 'user'}
];

// ============METHODS=============


const getUserProfile = (arrayUsers , name) => {
    for(let i = 0 , arrayLength = arrayUsers.length ; i<arrayLength ; i++){
        if(name === arrayUsers[i].name){
            return arrayUsers[i].profile;
        }
    }
    return false;
};

// check prompt => validation system depending on array length ===>> called by insertPrompt() 
const checkPrompt = array => {
    let flag = array.length == 4 ? true : false ;
    return flag;
};

// insert prompt => insert pseudoform ===> called by insertFlight()
const insertPrompt = () => {
    let insertString = prompt('Insert a new flight data [to - from - cost - scale] separated by commas.');
    let insertArray = insertString.split(',');
    if(checkPrompt(insertArray)){
        return(insertArray);
    }
    else{
        alert('Wrong data')
        insertFlight(flights , counterID);
    };
};

// delete prompt => insert id flight to delete ===> called by deleteFlight()
const deletePrompt = () => {
    let insertString = prompt('Insert an ID flight, please.');
    let insertID = parseInt(insertString);
    return insertID;
};

//show avalaible flights => list of avalaible flights ===> called by insertFlig
const getAvalaibleFlights = flights => {
    let listString = '';
    flights.forEach(flight => {
    listString += `ID: ${flight.id} => FROM: ${flight.from} -> TO: ${flight.to} <<>> COST ${flight.cost}€ <> [SCALES: ${flight.scale}]\n`;
    });
    return(listString);
};

// insert flight => insert a new flight in data object ===> called by getActionUser()
const insertFlight = (flights , counterID) => {
    let insertDataFlight = insertPrompt();
    if(checkPrompt(insertDataFlight) && flights.length<limitInsert){
        let insertRow = {id: counterID, to: insertDataFlight[0], from: insertDataFlight[1], cost: insertDataFlight[2], scale: insertDataFlight[3]};
        flights.push(insertRow);
        counterID++;
        let askNewInsert = prompt('New insert? y/n');
        if(askNewInsert === 'y'){
            insertFlight(flights , counterID);
        }else{
            getActionAdmin();
        };  
        console.log(getAvalaibleFlights(flights));
    }else{
        alert('DB capacity excedeed.');
    };
};

// delete flight => delete a flight in data object by ID===> called by getActionUser()
const deleteFlight = (flights) => {
    let insertID = deletePrompt();
    flights.splice(insertID, 1);
    console.log(getAvalaibleFlights(flights));
};

// get action user => get the action choosen by admin profile ===> called by actionUser()
const getActionAdmin = () => {
    let action = prompt('Insert flight=> press "i" \nDelete flight => press "d" \nexit => press "q"');
    return action;
}

const filterFlightsByCost = (flights) => {
    let average = parseInt(prompt('Insert a price, please'));
    let actionCost = prompt("List of flights depending on price.\nPress 'm' for minus, 'e' for equal or 'p' for plus");
    let arrayByCost = [];
    if(actionCost === 'm'){
        arrayByCost = flights.filter(flight => flight.cost < average);
    }
    else if(actionCost === 'p'){
        arrayByCost = flights.filter(flight => flight.cost > average);
    }
    else{
        arrayByCost = flights.filter(flight => flight.cost === average);
    }
    let flightByID = prompt(`These are the filtered flights by price:\n${(getAvalaibleFlights(arrayByCost))}\nInsert an ID in order to buy it.`);
    let okPurchase = `You have bought a ticket for the flight with ID: ${flightByID}. Thank you for your purchase. Come back soon!`;
    let cancelPurchase = `Thanky you for your visit! See you soon.`;
    let userPurchase = flightByID!=null ? okPurchase : cancelPurchase;
    alert (userPurchase);
};


const actionUser = (users , userName , flights , counterID) => {
    let userProfile = getUserProfile(users , userName);
    switch(userProfile){
        case 'admin':   
            let action = getActionAdmin();
            switch(action){
                case 'i':
                    insertFlight(flights , counterID);
                    actionUser(users , userName , flights , counterID);
                    break;
                case 'd':
                    deleteFlight(flights);
                    actionUser(users , userName , flights , counterID);
                    break;
                case 'q':
                    alert(`Good bye!`);
                    break;
            }
            break;
        case 'user':
            filterFlightsByCost(flights);
            break;
        default:
            alert(`${userName} is not registered in our DB.`);
            break;
    }
}

// ============MAIN=============
let counterID = flights.length;
const limitInsert = 15;

const userName = prompt('Insert your name, please');
actionUser(users , userName , flights , counterID);
    

