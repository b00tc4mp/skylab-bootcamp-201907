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

do{
  var usAd = prompt(`Por favor indique:\n1. Administrador\n2. Usuario`);

  function admin(usAd){
    if(usAd == 1){
      console.log(`Hola Admin`);
      
      var optAd = prompt(`Elija una de las siguientes opciones ingresando el número:\n1. Nuevo vuelo.\n2. Eliminar vuelo.`);
  
      switch(optAd){
        
        // nuevo vuelo:
        case '1': 
        if(flights.length === 15){
          alert(`¡No puede ingresar más vuelos!`);
        }else{
            var newFlgt = {};
            newFlgt.id = flights.length;
            newFlgt.to = prompt(`Ingrese destino:`);
            newFlgt.from = prompt(`Ingrese origen:`);
            newFlgt.cost = parseInt(prompt(`Ingrese precio:`),10);
            newFlgt.scale = prompt(`Escalas:\n1. Sin escalas.\n2. Con escalas.`);
            if(newFlgt.scale == 1){
              newFlgt.scale = false;
              scl = `sin escalas`;
            } else if(newFlgt.scale == 2){
              newFlgt.scale = true;
              scl = `con escalas`;
            } else{
              alert(`Por favor, ingrese 1 o 2`);
              return newFlgt.scale 
            }
            
          flights.push(newFlgt); 
          
          console.log(`Nuevo vuelo:\nDesde ${newFlgt.from} con destino a ${newFlgt.to}, coste ${newFlgt.cost}€ y es un vuelo ${scl}.`);
  
          if(flights.length === 15){
            alert(`No puede ingresar más vuelos`);
            break;
          }
          
        }
        break;
  
        case '2':
          var del = parseInt(prompt(`Ingrese el id del vuelo que desea eliminar:`),10);
          var removeId = flights.map(function(item){ 
            return item.id;}).indexOf(del);
            
            var delVol = '';
            for(var i = 0; i<flights.length; i++){
              if(flights[i].id == del){
                delVol += `Desde ${flights[i].from} con destino ${flights[i].to}`;
              }
            }
          console.log(`Vuelo ID:${del} ELIMINADO.\n${delVol}.`);
  
          flights.splice(removeId,1);   
  
      }
    }
  }
  admin(usAd);

  function user(usAd){
    switch(usAd){
    case  '2' :
      console.log(`Bienvenido, usuario.`);
      var optUser = prompt(`Elija una de las siguientes opciones ingresando el número\n1. Buscar por el precio más alto.\n2. Buscar por el precio más bajo.\n3. Buscar precio por rangos.\n4. Comprar vuelo.`);
    
      switch(optUser){
    
        case '1' : 
          function desc(a,b){
            return b.cost-a.cost;
          }
          flights.sort(desc);

          vlsDsc = '';
          for(i = 0; i < flights.length; i++){
            if(flights[i].scale == true){
              scale = `vuelo con escalas`
            } else{
              scale = `vuelo sin escalas`;
            }
            vlsDsc += `El vuelo desde ${flights[i].from} con destino ${flights[i].to} tiene un coste de ${flights[i].cost}€ y es un ${scale}.\n`
          };
          console.log(`Vuelos ordenados de mayor a menor precio:\n\n${vlsDsc}`);
        break;
     
        case '2' :
          function asc(a,b){
            return a.cost-b.cost;
          }
          flights.sort(asc);

          vlsAsc = '';
          for(i = 0; i < flights.length; i++){
            if(flights[i].scale == true){
              scale = `vuelo con escalas`
            } else{
              scale = `vuelo sin escalas`;
            }
            vlsAsc += `El vuelo desde ${flights[i].from} con destino ${flights[i].to} tiene un coste de ${flights[i].cost}€ y es un ${scale}.\n`
          };
          console.log(`Vuelos ordenados de menor a mayor precio:\n\n${vlsAsc}`);      
        break;
    
        case '3' :
          alert(`Por favor instroduzca el rango de precios que desea consultar:`);
          var pideRng1 = parseInt(prompt(`Ingrese el precio mínimo:`),10);
          var pideRng2 = parseInt(prompt(`Ingrese el precio máximo:`),10);
     
          var rango = flights.filter(rangos => rangos.cost >= pideRng1 && rangos.cost <= pideRng2)

          vlsRng = '';
          for(i = 0; i < rango.length; i++){
            if(rango[i].scale == true){
              scale = `vuelo con escalas`
            } else{
              scale = `vuelo sin escalas`;
            }
            vlsRng += `El vuelo desde ${rango[i].from} con destino ${rango[i].to} tiene un coste de ${rango[i].cost}€ y es un ${scale}.\n`
          };
          console.log(`Vuelos entre sus rangos de búsqueda, ${pideRng1}€ y ${pideRng2}€:\n\n${vlsRng}`);
        break;
      
        case '4' :
          vlsAct = '';
          for(i = 0; i < flights.length; i++){
            if(flights[i].scale == true){
              scale = `vuelo con escalas`
            } else{
              scale = `vuelo sin escalas`;
            }
            vlsAct += `El vuelo con ID:${flights[i].id} desde ${flights[i].from} con destino ${flights[i].to} tiene un coste de ${flights[i].cost}€ y es un ${scale}.\n`
          };
          console.log(`Vuelos disponibles:\n\n${vlsAct}`);

          var compId = parseInt(prompt(`Para comprar ingrese el Id del vuelo`),10);

            var compVol = flights.map(function(item){ 
              return item.id;}).indexOf(compId);
            
              var comp = '';
              for(var i = 0; i<flights.length; i++){
                if(flights[i].id == compId){
                  comp += `Desde ${flights[i].from} con destino ${flights[i].to}`;
                }
              }
            console.log(`Usted ha seleccionado el vuelo ID:${compId}:\n${comp}.`);
            alert(`Gracias por su compra`);

        break;
    
        default:
        console.log(`Error`);
    }
  }
  }
  user(usAd);

} while (usAd == '1' || usAd == '2');
alert(`¡Hasta pronto!`);

