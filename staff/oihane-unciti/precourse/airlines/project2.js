

var name=prompt("what is your name?");
alert("Welcome "+ name)
var flightsMessage=""
var sumCost=0;
var flightScale=""
var flightsLast=""
var searchFlight= ""
var id=1;

var flights = [
    { id: id++, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: id++, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: id++, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: id++, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: id++, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: id++, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: id++, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: id++, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: id++, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: id++, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: id++, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];





for (var i = 0; i < flights.length; i++) {
    
        if(flights[i].scale==true){
            flights[i].scale= "si"
            flightScale+= "Origen: "+ flights[i].to+" - Destino: "+flights[i].from+"\n"
        }
        else{
            flights[i].scale="no"
        }
        if(flights[i].id >5){
            flightsLast+= "Origen: "+ flights[i].to+" - Destino: "+flights[i].from+"\n"
        }

        sumCost+= flights[i].cost
    flightsMessage+= "El vuelo con origen: "+ flights[i].to+" , y destino: "+flights[i].from+ " tiene un coste de "+flights[i].cost+ " y " +flights[i].scale+ " realiza escala.\n"

}


alert("Welcome "+ name +" \n"+ flightsMessage )

alert("El precio medio de los vuelos es de: "+sumCost/flights.length)

alert("Los siguientes vuelos tienen escala:\n"+flightScale)

alert("Los vuelos de última hora son:\n"+flightsLast)


 var x = prompt("user or admin");
 if(x=== "user"){
     var j= prompt("buscar/comprar")
     
     switch(j){
            case "buscar":
            var search= prompt("menor/mayor/igual")
            var money= prompt("Cuanto dinero?")
            for (var i = 0; i < flights.length; i++) {
    
                 if(search=="menor" && flights[i].cost< money){
  
                     searchFlight+= "Origen: "+ flights[i].to+" - Destino: "+flights[i].from+ " - Money: "+flights[i].cost+ "\n"
            
                }else if(search=="mayor" && flights[i].cost> money){
                     
                     searchFlight+= "Origen: "+ flights[i].to+" - Destino: "+flights[i].from+ " - Money: "+flights[i].cost+ "\n"

                }else if (search=="igual" && flights[i].cost==money){
          
                    searchFlight+= "Origen: "+ flights[i].to+" - Destino: "+flights[i].from+ " - Money: "+flights[i].cost+ "\n"
                }
                
            }
            alert(searchFlight);
            break;
            case "comprar":
            var buyID= prompt("Introduce el ID del vuelo que quieres comprar")

             for (var i = 0; i < flights.length; i++) {
    
                 if(buyID==flights[i].id){
                    
                     alert("Gracias por su compra\n Ha adquirido el vuelo con Origen: "+ flights[i].to+" - Destino: "+flights[i].from+  "\n") 
               
                }
            }
            break; 
    
    }

}else if(x==="admin"){

    var continueAsk="y";

    while(continueAsk=="y"){

        var y= prompt("new flight, delete flight");

        switch(y){
        case "new":

            if(flights.length==15){
                alert("No puede meter más vuelos.")
            }else{
                var newTo = prompt("To?")
                var newFrom = prompt("From?")
                var newCost = prompt("Cost?")
                var newScale = prompt("Scale?")

                var objNewFligth = {}
                objNewFligth["id"] = i++;
                objNewFligth["to"] = newTo
                objNewFligth["from"] = newFrom
                objNewFligth["cost"] = newCost
                objNewFligth["scale"] = newScale


                flights.push(objNewFligth)
                console.log(flights)
            }

           
        break;
        
        case "delete":
        var deleteID= prompt("ID que quieres eliminar")
        for (var i = 0; i < flights.length; i++) {
    
                 if(deleteID==flights[i].id){
                  alert("Has eliminado el vuelo con Origen: "+ flights[i].to+" - Destino: "+flights[i].from+  "\n") 
                    delete flights[i];
                    
                    
               
                }
            }
            console.log(flights)
     }

        continueAsk=prompt("desea continuar y/n")
    }

            
    }
