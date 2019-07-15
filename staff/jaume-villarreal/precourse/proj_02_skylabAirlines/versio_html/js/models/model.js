// flights data
var flights = [
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
var users = [
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

//total last flights
//..requerida com a paràmetre per les funcions 'stopOverFlightsMessage()' i 'stopOverFlightsMessage()'
var totalLastFlights = 5;

//limit flights DataBase
//..requerida com a paràmetre per la funció 'limitFlightsDataBase()'
var limitFlightsDB = 30;

//current quantity flights
//..requerida com a paràmetre per la funció 'newFlight()'
//..s'incrementa a cada insert per evitar inconsistències en la definició dels ID dels vols
var currentQttyFlights = flights.length;
