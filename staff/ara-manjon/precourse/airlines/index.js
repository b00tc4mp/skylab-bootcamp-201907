/*Skylab Airlines! ✈ 🛩
(Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro
código)
Programa una interfaz de usuario para una aerolínea (por terminal...). Esta aerolínea
dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos deben estar
declarados de manera global, cuando se llame a la función:
● Se preguntará por el nombre de usuario y dará la bienvenida.
● El usuario visualizará todos los vuelos disponibles de una forma amigable: El
vuelo con origen: Barcelona , y destino: Madrid tiene un coste de XXXX€ y no
realiza ninguna escala.
● A continuación, el usuario verá el coste medio de los vuelos.
● También podrá ver cuántos vuelos efectúan escalas.
● Sabiendo que los últimos 5 vuelos*/


let flights = [
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
    
    //PROYECTO 2
    //saludo
    function datosUsiario(){
    var hola= 'Bienvenido a Skylab Airlines! Indicanos tu nombre de usuario:'
      console.log(hola)
    
    //visualizar todos los vuelos de hoy
    flights.forEach(function(obj){
      if(obj.scale===false){
      console.log('El vuelo con origen: '+obj.from+', y destino: '+obj.to+' tiene coste de '+ obj.cost+' y no realizara ninguna escala.')}
      else{
    console.log('El vuelo con origen: '+obj.from+', y destino: '+obj.to+' tiene coste de '+ obj.cost+' y tiene escala.')
      }
    })
    
    //coste medio
    var acc=0;
    flights.forEach(function(obj){
      acc+=obj.cost
    })  
    console.log('El coste medio de los vuelos para el dia de hoy es de '+ acc/10+' euros.')
    
    //vuelos con escala
    var acc1=0
    flights.forEach(function(obj){
      if(obj.scale===true){
     acc1 += 1;
        }})
    console.log('Existen '+acc1+' vuelos que efectuaran escala en el dia de hoy.')
    
    //5 ultimos vuelos
    var destinos= []
    flights.forEach(function(obj){
      if(obj.id>5){
     destinos.push(obj.to);
        }})
    console.log('Los ultimos vuelos para el dia de hoy son con destino a: '+destinos+'.')
    }
    datosUsiario(flights)
    