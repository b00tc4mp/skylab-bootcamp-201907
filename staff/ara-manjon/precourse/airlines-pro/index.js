/*PRO:
Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:
Si eres ADMIN, la función debería permitir:
Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
Poder eliminar vuelos mediante el ID.
Si eres USER la función debería permitir:
Buscar por precio (más alto, más bajo o igual), el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, el programa responderá: "Gracias por su compra, vuelva pronto."*/

//////////////////////////////////PRO////////////////////////////////////








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
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }, 
    ]; 



    ////1////
    //ADMIN FUNCTIONS
    //función opciones admin
    function admin(){
      var adminResponse= prompt(`Indicanos que deseas hacer:
      \n1-Introducir nuevo vuelo
      \n2-Eliminar vuelo existente
      \n3-Consultar vuelos
      \n4-Salir`,`1 / 2 / 3 / 4`); 
        
        if(adminResponse==='1'){
          newFlight();
        }else if(adminResponse==='2'){          
          eliminar();
          this.admin()
        }else if(adminResponse==='3'){
          alert('Puedes consultar los vuelos en la pantalla principal.');
          consultarAdmin();
          
          this.admin();
        }else if(adminResponse==='4'){
          var changeToUser= prompt('Antes de salir, ¿quieres ir al apartado de usuarios?','sí/no')
          if(changeToUser==='sí'||changeToUser==='si'){
            user();
          }else if(changeToUser==='no'){
            alert('Muchas gracias y hasta pronto. :)');
          }else{
          alert('Muchas gracias y hasta pronto. :)');
          }
        }else{
          this.admin();
        }
    };


    ////2////
    //NEW FLIGHT
    //función crear vueñps
    function newFlight(){  
      if(flights.length<16){
      var create= prompt('Introduzca los datos del vuelo: id , to , from , cost , scale ',"id , to , from , cost , scale ")
      if(create !== null){
        //modificar scale en boolean
        var x= create.split(',')
        if(x[4]==='false'){
           x[4]=false
        }else if(x[4]==='true'){
           x[4]=true
        };
        //función que crea objeto de vuelos
        var flightFactory=(id,to,from,cost,scale)=>{
              return{
                id:id,
                to:to,
                from:from,
                cost:cost,
                scale:scale
              }};
          flights.push(flightFactory(parseInt(x[0]),x[1],x[2],parseInt(x[3]),x[4]))
          admin()
      }else{
          alert('No has introducido ningún vuelo.')
          admin();
      }}else{
          alert('Has supero el máximo de 15 vuelos registrados.');
          admin();
      }return flights;
    };
    
    ////3////   
    //DELETE FLIGHT
    //función eliminar vuelo
    function eliminar(){ 
      var index
      var eliminarID
      eliminarID =prompt('Indique el ID del vuelo que quiere eliminar','ID')
      var numberFlight = parseInt(eliminarID);//el id que el admin indica pasado a número
      //elimina el vuelo indicado por ID y guarda nueva array de vuelos
      function checkID(obj){
      for(var i=0;i<obj.length;i++){
        if(obj[i].id===numberFlight){
          obj[i]='x'

        }
      }}checkID(flights);

      index= flights.indexOf('x')
      if(index > -1){
      flights.splice(index,1);
      }
      alert(`Acaba de eliminar el vuelo ID ${numberFlight}.`)
      return flights;      
    };
    ////9////
    //consultar vuelos actualizados
    function consultarAdmin(){
    printFlights(flights);
    }
    ////4////
    //USER FUNCTIONS
    //función opciones user
    function user(){
      var nameUser= prompt('Hola user, puedes registrar tu nombre a continuación:','user')

      function optUser(){
      var optionsUser= prompt('Puedes consultar los vuelos disponibles, acceder al apartado compras o salir.','consultar / compras / salir');
      if(optionsUser){
        if(optionsUser==='consultar'){
          consulta();
          return optUser();
        }else if(optionsUser==='compras'){
          comprar();
          return optUser();
        }else if(optionsUser==='salir'){
          alert(`Muchas gracias ${nameUser} por visitar SKYLAB AIRLINES. Esperamos verte pronto :).`)
        
        }else{
          return optUser();
        }
      }else{
          return optUser();
      }    
     }optUser();
    };

    ////5////
    //función consultar vuelos
      function consulta(){
      var usuario= prompt(`Indicanos que filto quieres aplicar para consultar los vuelos disponibles: \n1-Menos a mas\n2-Mas a menos\n3-Por rango de precio`,'1 / 2 / 3');
      
        if(usuario==='1'){//menos a mas
           var precioMenosMas=[]
           function menosAMas ( a, b ){ return a.cost-b.cost }
           precioMenosMas =(flights.sort(menosAMas))
           alert('Puedes ver los vuelos en la pantalla principal.')
           printFlights(flights)
           console.log(precioMenosMas)
           
        }else if(usuario==='2'){//mas a menor
           var precioMasMenos=[]
           function masAMenos ( a, b ){ return b.cost - a.cost }
           precioMasMenos =(flights.sort(masAMenos))
           alert('Puedes ver los vuelos en la pantalla principal.');
           printFlights(flights)
           console.log(precioMasMenos)
           
        }else if(usuario==='3'){//rango de precio
           var rango=prompt('Indicanos el precio mínimo','1')
           var rango2=prompt('Indicanos el precio máximo','1000')
           var num=parseInt(rango);
           var num2=parseInt(rango2);
    
           let igualQue= flights.filter(igual=> igual.cost >=num && igual.cost<= num2)
           alert('Puedes ver los vuelos en la pantalla principal.')
           printFlights(igualQue);
           console.log(igualQue)
        }else{
          this.consulta();
        }
      };   
      
    ////6////
    //función compra
    var id=[];
    var printID
      function comprar(){
        var compraUser=prompt('Introduce el ID del vuelo para realizar la compra','ID')
        if(compraUser){
           
           var idNumber = parseInt(compraUser);

        flights.forEach(function(obj){
        if(obj.id===idNumber){
        id.push(obj)
        }});
        alertID(id);
        alert(`Acaba de realizar la compra del vuelo con ID ${idNumber}.\n${printID}\n¡Muchas gracias por tu compra y te deseamos un feliz vuelo! :)`);
        
      }else{
        this.comprar();
      }
    }
  
    ////7////
    //INTERACTION
    function response(){      
      var resp= prompt("¡Bienvenido a SKYLAB AIRLINES! Indicanos si eres admin o user","admin/user");
       if(resp==='admin'){ 
        admin();
       }else if(resp==='user'){
        user();
       }else{
        this.response()
       }
    };
    response()
    
    ////8////
    //IMPRIMIR OBJETOS CON ALERT
    //imprimir vuelos

    function printFlights(objFl){
      var arr = objFl.map(function(key,value){
         return [objFl[key,value]]
      }) 
      
      
      var l=[]
      arr.forEach(function(obj){
        for(var i=0;i<obj.length;i++){
        l.push(Object.entries(obj[i]))
      }})
      
      function printObject(o) {
        var out = '';
        for (var p in o) {
            
          out += p + ': ' + o[p].join(' | ') + '\n\n';
        }
        alert(out);
        
      }
      printObject(l);
      };
      
    //imprimir id
    function alertID(id){
      var arr = id.map(function(key,value){
      return [id[key,value]]
    }) 
  
      var l=[]
      arr.forEach(function(obj){
      for(var i=0;i<obj.length;i++){
      l.push(Object.entries(obj[i]))
      }})
  
    function printObject(o) {
      var out = '';
      for (var p in o) {        
      out +='Detalles de vuelo => '+ o[p].join(' | ') + '\n\n';
      }
      printID=out;
      }
    printObject(l);
    }
  
