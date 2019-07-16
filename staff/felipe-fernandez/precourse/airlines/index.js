/* Skylab Airlines! ✈ 🛩

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
● Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día,
muestra al usuario sus destinos. */

var flights = [
    { id : 00 , to : 'Bilbao' , from : 'Barcelona' , cost : 1600 , scale : false },
    { id : 01 , to : 'New York' , from : 'Barcelona' , cost : 700 , scale : false },
    { id : 02 , to : 'Los Angeles' , from : 'Madrid' , cost : 1100 , scale : true },
    { id : 03 , to : 'Paris' , from : 'Barcelona' , cost : 210 , scale : false },
    { id : 04 , to : 'Roma' , from : 'Barcelona' , cost : 150 , scale : false },
    { id : 05 , to : 'London' , from : 'Madrid' , cost : 200 , scale : false },
    { id : 06 , to : 'Madrid' , from : 'Barcelona' , cost : 90 , scale : false },
    { id : 07 , to : 'Tokyo' , from : 'Madrid' , cost : 1500 , scale : true },
    { id : 08 , to : 'Shangai' , from : 'Barcelona' , cost : 800 , scale : true },
    { id : 09 , to : 'Sydney' , from : 'Barcelona' , cost : 150 , scale : true },
    { id : 10 , to : 'Tel-Aviv' , from : 'Madrid' , cost : 150 , scale : false }
    ];
    
    //console . log (flights[ 0 ].to); //output: Bilbao

function airlines(){

    userName();
    setTimeout (availableFlights,500);
    setTimeout (averageCost,1500);
    setTimeout (scaleFlights,2500);
    setTimeout (lastDestinies, 3500);
   
    setTimeout (askUser, 4500);
    
    
    
    function userName(){
        let username = prompt('¿Cuál es tu nombre de usuario?');
        console.log(`Bienvenido ${username}`);
        
    }

    function availableFlights(){
        
        for (let i=0; i< flights.length;i++){
            if (flights[i].scale === false){
            console.log(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} € y no realiza ninguna escala`)
        }
    }
       
    }

    function averageCost(){
        let numDatos = flights.length;
        let sumCostTotal, result;
        let costTotal = [];

        for (let i=0; i< flights.length;i++){
         
         costTotal.push(flights[i].cost);

           
        }
        reducer = (acc, cur) => acc + cur;
        sumCostTotal= costTotal.reduce(reducer);
        result = sumCostTotal/numDatos;
        console.log('El coste medio de los vuelos es ' + result);
    }



    function scaleFlights(){
        let count=0;
        for (let i=0; i< flights.length;i++){
            
            if (flights[i].scale === true){
                count++;
            }
        }
        console.log('Hay ' + count + ' vuelos que hacen escala');
    }

    function lastDestinies(){
        let finalDestinies= [];
        let lastsIds = [];
        lastsIds= flights.slice(6);
       

         for (let i=0; i< lastsIds.length;i++){
             finalDestinies.push(lastsIds[i].to);
              }

      console.log('Los últimos 5 viajes tienen como destino: ' + finalDestinies.join(', '));
  
    }
    


    
       // Parte Pro

 /*    Después de ver toda la información el programa pedirá al usuario si es 
ADMIN/USER, dependiendo de la elección, el programa se comportará de la
siguiente manera:
Si eres ADMIN , la función debería permitir:
● Poder crear, más vuelos, pidiendo la información por prompt(), sin poder
pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
● Poder eliminar vuelos mediante el ID.
Si eres USER la función debería permitir:
● Buscar por precio (más alto, más bajo o igual), el usuario debería mostrar los
datos de los vuelos encontrados y, indicando el ID, el programa responderá:
"Gracias por su compra, vuelva pronto." */

    function askUser(){
        let answer = prompt("¿Qué usuarios eres? admin/user");
        switch (answer) {
            case 'admin':
                admin();
            break;
            case 'user':
               user();
            break;
            default:
            console.log('No has seleccionado el usuario correcto. Escribe admin o user');
            askUser(); 
        }
    }
    

    function admin(){
        let response = prompt (`Como eres el usuario admin puedes crear y eliminar vuelos. ¿Qué quieres hacer, crear o eliminar? También puedes salir escribiendo 'salir'`);
            if (response==='crear'){
                addFlights();

            
            } else if (response==='eliminar'){
                deleteFlights();
            }else if (response==='salir'){
                console.log('Bye!');

            } else {
                console.log(`Tienes que escribir 'crear', 'eliminar', o 'salir'`);
                admin();
            }
    }       
    


    var prices = [];
    var responseUser;

    function user(){

        
        responseUser= prompt (`Como eres el usuario 'user' puedes buscar vuelos por precio y por ID. ¿Por qué quieres buscar? Escribe 'precio', 'ID' o 'salir' si deseas salir del programa `);
        
            if (responseUser==='salir'){
                console.log ('Bye!');
                
             } else if (responseUser==='precio'){
                price();
             } else if (responseUser==='ID'){
                id();
             } else if (responseUser==='salir'){
                console.log('Bye!');
             } else {
                    console.log('Lo que has escrito no es ninguna de las tres opciones disponibles');
                    user();
                }

            

    }


    //Functions del usuario "user"

    function price (){

        var  priceUser= prompt (`Introduce un precio y te mostraré los vuelos de ese precio, de superior precio y de inferior precio. Escribe salir si deseas salir.`);
        if (!isNaN(priceUser)){

            //convertir en número el número que recoge el prompt(que es un string)
            priceUser=Number(priceUser);
            
            //sacar en un array todos los "costs" de los objetos para poder trabajar con ellos
            prices = flights.map(flight => flight.cost);
                    
        
            greaterThan();
            lessThan();
            equalThan();
            greetings();
        
    
     } else if (priceUser==='salir'){
         console.log('Bye!');

     } else {
         console.log ('Escribe un número o salir')
         price();
     }
    }

    function id(){
        var priceId= prompt (`Introduce un ID y te mostraré si existe para que lo puedas comprar. Escribe salir si deseas salir.`);
        var priceIdFlight;
        //convertir en número el número que recoge el prompt(que es un string)
        priceId=Number(priceId);

         //sacar en un array todos los ids de los objetos para poder trabajar con ellos
         var idsPrice = flights.map(flight => flight.id);
         
        if (priceId==='salir'){
            console.log ('Bye!');
        } 
            else if (!idsPrice.includes(priceId)){
                console.log('El ID introducido no existe');
                id();
           } 
                else if (!isNaN(priceId)){
                    
                     for (let i=0; i < flights.length; i++) {
                                                   
                            if (priceId===flights[i].id){
                                
                                priceIdFlight= flights[i].cost;
                                console.log(flights[i]);
                            }
                      
                    } 
                
                    buyFlightsPerId();
                           
          } 
          
           else {
            console.log('Lo que has puesto no es un ID ni tampoco salir');
            id();
            }

        
        function buyFlightsPerId(){
            var buyPerId = prompt('Como has visto, el ID existe. ¿Quieres comprar este viaje? si/no/salir');

            if (buyPerId==='si'){   
                console.log (`Este viaje tiene un coste de ${priceIdFlight} `);
                console.log( 'Gracias por su compra. Vuelva pronto')

                var buyMoreFlights = prompt ('Quieres comprar otro viaje. Escribe si/no/salir');
                    if (buyMoreFlights==='si'){

                        id();
                    } else if (buyMoreFlights==='no'){
                        console.log('De acuerdo');
                        user();
                    } else if (buyMoreFlights==='salir'){
                        console.log('Bye!');
                    } else {
                        console.log(`No has escrito 'si', 'no' o 'salir'`);
                        buyFlightsPerId();
                    }
                
            } else if (buyPerId==='no'){
                console.log('De acuerdo');
                user();
            } else if (buyPerId==='salir'){
                console.log('Bye!');
            } else {
                console.log(`No has escrito 'si', 'no' o 'salir'`);
                buyFlightsPerId();
            }
        }
    }


    function greaterThan(){

        //Filtro del array prices (que he sacado antes los valores costs de los objetos) por ser mayor que el números que se pasa al prompt.
        //Así consiguo array con los costes mayores al precio pasado
        var greater = prices.filter(price => price > priceUser);
        var costsArrayGreater = [];
        var costsArrayGreaterFinal = [];
       
        if (greater.length!==0){
          
            console.log(`Hay ${greater.length} vuelos con precios superiores al que has introducido: ${greater}`);
            
            for (let i=0; i < flights.length; i++) {
                for (let j=0; j< greater.length; j++){
                    
                    if (greater[j]===flights[i].cost){
                        costsArrayGreater.push(flights[i]);
                        
                    }
              }
            } 

        //filtro el array que tengo con entradas duplicadas para sacar solo los que tienen un valor no repetido
          var costsArrayGreaterFinal = costsArrayGreater.filter(function(item, index){
            return costsArrayGreater.indexOf(item) >= index;
        });

        // muestro los valores con un bucle
        for (let i=0; i< costsArrayGreaterFinal.length; i++){
            console.log(costsArrayGreaterFinal[i]); 
        }
     } else {
            console.log('No hay vuelos superiores al precio que has buscado')
        }

    }


    function lessThan() {

        //Filtro del array prices (que he sacado antes los valores costs de los objetos) por ser menor que el número que se pasa al prompt.
        //Así consiguo array con los costes menores al precio pasado
        var lesser = prices.filter(price => price < priceUser);
        var costsArrayLesser = [];
        var costsArrayLesserFinal = [];
        if (lesser.length!==0){
        
         console.log(`Hay ${lesser.length} vuelos con precios inferiores al que has introducido: ${lesser}`);
        
         //En un bucle comparo los costes del array lesser con los costes del array principal flight para sacar los que son iguales
         //Lo guardo en otro array con push para trabajar posteriormente ya que en el bucle salen repetidos los valores que tienen el mismo coste
             for (let i=0; i < flights.length; i++) {
                for (let j=0; j< lesser.length; j++){
                   
                
                    if (lesser[j]===flights[i].cost){
                        
                        costsArrayLesser.push(flights[i]);
                       
                    
                    }
               }
            }  
            

            //filtro el array que tengo con entradas duplicadas para sacar solo los que tienen un valor no repetido
            var costsArrayLesserFinal = costsArrayLesser.filter(function(item, index){
                return costsArrayLesser.indexOf(item) >= index;
            });

            // muestro los valores con un bucle
            for (let i=0; i< costsArrayLesserFinal.length; i++){
                console.log(costsArrayLesserFinal[i]); 
            }

        }else {
            console.log('No hay vuelos inferiores al precio que has buscado')
            }
    }
    
    function equalThan(){

       //Filtro del array prices (que he sacado antes los valores costs de los objetos) por ser igual que el número que se pasa al prompt.
        //Así consiguo array con los costes iguales al precio pasado
        var equals = prices.filter(price => price === priceUser);
        var costsArrayEqual = [];
        var costsArrayEqualFinal = [];
       
        if (equals.length!==0 && equals.length!==1){
         
           console.log(`Hay ${equals.length} vuelos con precios iguales al que has introducido: ${equals}`);

           for (let i=0; i < flights.length; i++) {
            for (let j=0; j< equals.length; j++){
        
                if (equals[j]===flights[i].cost){
                    
                    costsArrayEqual.push(flights[i]);
                }
           }
        } 
        
            //filtro el array que tengo con entradas duplicadas para sacar solo los que tienen un valor no repetido
            var costsArrayEqualFinal = costsArrayEqual.filter(function(item, index){
                return costsArrayEqual.indexOf(item) >= index;
            });

            // muestro los valores con un bucle
            for (let i=0; i< costsArrayEqualFinal.length; i++){
                console.log(costsArrayEqualFinal[i]); 
            }


        } else if (equals.length===1){
            console.log(`Hay ${equals.length} vuelo con el precio igual al que has introducido: ${equals}`);

            for (let i=0; i < flights.length; i++) {
             for (let j=0; j< equals.length; j++){
         
                 if (equals[j]===flights[i].cost){
                     
                     costsArrayEqual.push(flights[i]);
                 }
            }
         } 
         
             //filtro el array que tengo con entradas duplicadas para sacar solo los que tienen un valor no repetido
             var costsArrayEqualFinal = costsArrayEqual.filter(function(item, index){
                 return costsArrayEqual.indexOf(item) >= index;
             });
 
             // muestro los valores con un bucle
             for (let i=0; i< costsArrayEqualFinal.length; i++){
                 console.log(costsArrayEqualFinal[i]); 
             }
        }
        
        else {
            console.log('No hay vuelos iguales al precio que has buscado')
        }
    }

    
    function greetings(){
        console.log('Gracias por su compra. Vuelva pronto');
    }


    //Functions del usuario "admin"


    function addFlights(){

       
        let origin= prompt('Dime el origen del vuelo');
          
        
        let destiny= prompt('Dime el destino del vuelo');

        costFlights();
        
        var costFlight;

        function costFlights(){
            costFlight= prompt('Dime el coste del vuelo en €');
           
                if (isNaN(costFlight)) {
                    console.log('Tienes que añadir un número');
                    costFlights();
                  
    
                }else{
                    costFlight=Number(costFlight);
                    scalesYesNo();
                }
        }

        var scales;
        function scalesYesNo(){
        scales= prompt('Dime si hace escala y/n');
            if (scales==='y'){
                scales=true;
            } else if (scales==='n'){
                scales=false;
            } else {
                console.log(`Tienes que escribir 'y' o 'n'`);
                scalesYesNo()

            }

        }

        let last = flights[flights.length - 1];
        let newId= last.id + 1;

        let newFly= { 
            id:newId,
            to: destiny,
            from: origin,
            cost: costFlight,
            scale: scales
        }
    console.log(newFly);
    flights.push(newFly);

    flightsExtended();

    createMoreFligths();

    function createMoreFligths(){
    let createMore= prompt ('¿Quieres seguir creando vuelos o eliminar alguno? Escribe crear/eliminar/salir o cambiar si quieres cambiar de usuario');
        if (createMore==='crear'){
            
            if (flights.length===15){
                let alerta= alert('No es posible añadir más de 15 vuelos. Elimina alguno');
                console.log(alerta);
                deleteFlights();
            } else {
                addFlights();
            }
            
        } else if (createMore==='eliminar'){
            deleteFlights();
        } else if (createMore==='salir') {
            console.log('Bye!');
        } else if (createMore==='cambiar'){
            askUser();
        }  else {
            console.log(`Tienes que escribir 'crear' o 'eliminar' o 'salir' `)
            createMoreFligths();
        }
    }

    }//acaba función addflights

    
    function deleteFlights(){
        console.log('Para eliminar un vuelo, indícame su ID. A continuación puedes ver todos los vuelos');

       //sacar los vuelos  de manera amigable
        flightsExtended();
       
        //sacar en un array todos los ids de los objetos para poder trabajar con ellos
        var ids = flights.map(flight => flight.id);
        

        deleteId();

        function deleteId(){
        var deleteById = prompt (`¿Qué vuelo quieres eliminar? Dime el ID del viaje o escribe 'salir' `)
        //convertir en número el número que recoge el prompt(que es un string)
        deleteById=Number(deleteById);


        if (deleteById==='salir'){
            console.log ('Bye!');
        } 
            else if (!ids.includes(deleteById)){
                console.log('El ID introducido no existe');
                deleteId();
           } 
                else if (!isNaN(deleteById)){
                    
     
                    //hacer un bucle para eliminar el item del array que se ha pasado como número
                    for (var i =0; i < ids.length; i++) {
                        if(ids[i] === deleteById) {
                        flights.splice(i, 1);
                        }
                    }

                    flightsExtended();
                    
                    admin();

          } 
          
           else {
            console.log('Lo que has puesto no es un ID ni tampoco salir');
            deleteId();
            }
         }
    }   //acaba función deleteflights


    function flightsExtended(){
        
        for (let i=0; i< flights.length;i++){
            console.log(flights[i]);
        }
       }



}

