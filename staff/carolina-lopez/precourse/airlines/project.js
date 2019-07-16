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

function airlines(){
  
  // Saludo

  var nomUsuario = prompt('Por favor escriba su nombre de usuario');
  alert(`${nomUsuario}, bienvenido/a a Skylab Airlines`);

  // Vuelos y escalas

  var confirmar = confirm(`¿${nomUsuario}, desea visualizar los vuelos disponibles?`);

  if(confirmar){
   
    vls = '';
    for(i = 0; i < flights.length; i++){
      if(flights[i].scale == true){
        scale = `vuelo con escalas`
      } else{
        scale = `vuelo sin escalas`;
      }
      vls += `El vuelo desde ${flights[i].from} con destino ${flights[i].to} tiene un coste de ${flights[i].cost}€ y es un ${scale}.\n`
    };
    console.log(`Vuelos disponibles:\n\n${vls}`);

    // Coste medio  

    var confirmar2 = confirm(`¿${nomUsuario}, desea visualizar el coste medio?`);
  
    if(confirmar2){
      var sum = flights.reduce(function(a,b){
        return{
          cost: a.cost + b.cost};
        }, {cost: 0});
    
      sumCost = Object.values(sum);
      var costMed = sumCost/flights.length;
      var cm = costMed.toFixed(2);

      console.log(`El coste medio de los vuelos es de ${cm}€.`);

      // Vuelos con escala 

      var confirmar3 = confirm(`¿${nomUsuario}, desea visualizar los vuelos con escala?`); 

      if(confirmar3){
        
        var scl = '';
        for(var i = 0; i<flights.length; i++){
          if(flights[i].scale == true){
            scl += `Desde ${flights[i].from} con destino ${flights[i].to}.\n`;
          }
        }
        console.log(`Los siguientes vuelos harán escalas:\n\n${scl}`);

        // Últimos 5 vuelos 

        var confirmar4 = confirm(`¿${nomUsuario}, desea visualizar los últimos vuelos del día?`);

        if(confirmar4){
          
          var ult = '';
          for(i = (flights.length - 5); i < flights.length; i++){
            ult += `Desde ${flights[i].from} con destino ${flights[i].to}.\n`;
          }; 
          console.log(`Los últimos vuelos del día son:\n\n${ult}`);

          alert(`Hasta pronto, gracias por visitar Skylab Airlines.`);


        } else if(!confirmar4){
          alert(`Hasta pronto, gracias por visitar Skylab Airlines.`);
        }

      } else if (!confirmar3){
        alert(`Hasta pronto, gracias por visitar Skylab Airlines.`);
      }

    } else if (!confirmar2){
      alert(`Hasta pronto, gracias por visitar Skylab Airlines.`);
    }

  } else if (!confirmar){
    alert(`Hasta pronto, gracias por visitar Skylab Airlines.`);
  }
}
airlines();
