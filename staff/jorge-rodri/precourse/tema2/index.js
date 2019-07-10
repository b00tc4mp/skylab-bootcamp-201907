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
function welcome(){
    let midCost=0;
    let countScale=0;
    let arr=flights.slice(6)
    let userName=prompt("Bienvenido a Skylab Airlines, introduzca su nombre: ");
    console.log(`------------\nHola ${userName}.\n------------`);
    flights.map((elemento)=>console.log(`El vuelo con origen:${elemento.to}, y destino: ${elemento.from} tiene un coste de ${elemento.cost}€ y ${elemento.scale?"si":"no"} realiza escala.`))
    flights.map((elemento)=>{midCost+=elemento.cost;elemento.scale?countScale++:null})
    console.log(`------------\nEl precio medio del billete es ${(midCost/flights.length).toFixed(2)}€.`);
    console.log(`------------\n${countScale} vuelos efectuan escalas.`)
    console.log(`------------\nLos destinos de los ultimos cinco vuelos son: `)
    arr.map((elemento)=>console.log(`${elemento.from}`))
}

welcome()