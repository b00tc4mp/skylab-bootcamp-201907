
//Info de todos los vuelos
let flights = [
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
//console.log(flights[0].to);

//Inicio con welcome
function skylabAirlines (){
    var usuario = prompt('Introduce tu nombre de usuario');
       alert(`Bienvenido a Skylab Airlines ${usuario}`);

       //Mostramos todos los vuelos disponibles al usuario de forma amigable
       function mostrarTodo(){
       console.log('Estos son los vuelos disponibles para hoy' + ' ' + usuario);
        for (var i = 0; i < flights.length; i++){
            let escalas = '';
            if(flights[i].scale === true){
                escalas = 'tiene escalas';
            } else {
                escalas = 'no tiene escalas';
            }
                console.log(`El vuelo con origen: ${flights[i].to} y destino: ${flights[i].from} tiene un coste de: ${flights[i].cost} y ${escalas}`);
        }
        //espacio para que sea mas visual
            console.log('');
        //ciclo para mostrar un recordatorio de que vuelos tienen escala
            console.log(usuario + ', ' + 'Te recordamos que los siguientes vuelos tienen minimo una escala.');
        for (var j = 0; j < flights.length; j++){
                if(flights[j].scale === true){
                    console.log(`${flights[j].to} con destino ${flights[j].from}`);
                }
    }
        //precio medio de los vuelos, ponemos todos los precios en un array y con un for los sumamos entre ellos
    
            let totalCost = [];
        for(var x = 0; x < flights.length; x++){
            totalCost[x] = flights[x].cost;
        }
            let totalCostAV = 0;
        for(var t = 0; t < totalCost.length; t++){
           totalCostAV = totalCostAV + totalCost[t];
        } 
            totalCostAV = totalCostAV / flights.length;
            console.log('El precio medio de todos los vuelos es de: ' + totalCostAV.toFixed(1));
            console.log('');

            //ultimos 5 vuelos del dia recordatorio
            console.log('Los ultimos 5 vuelos del dia de hoy son los siguientes vuelos:');

        for(var p = flights.length - 1; p > 5; p--){
            console.log(flights[p].to + ' ' + 'con destino ' + flights[p].from);
        }
    }
    mostrarTodo();

        //PRO
        

    // funcion para visualizar flights 
    function lookFlights(){
        mostrarTodo();
    }      


    //funcion para pregutnar si seguir o salir
    function seguirSalir(){
        let salirOentrar = prompt('Quieres continuar o salir?');
            salirOentrar = salirOentrar.toLocaleUpperCase();
        if(salirOentrar === 'CONTINUAR'){
            skylabAirlines();
        }else if(salirOentrar === 'SALIR'){
            exit();
        }else{
            alert('Introduce "continuar" o "salir"');
            seguirSalir();
        }
    }

    // funcion para crear nuevo Vuelo
    function crearVuelo(){ 

        if(flights.length >= 15){
            alert('Tienes como maximo 15 vuelos, debes eliminar para poder crear de nuevos');
            eliminarVuelo();
        }else{

        let nuevoVuelo = {};
    nuevoVuelo.id = prompt('Introduce el ID del vuelo');            
                            nuevoVuelo.to = prompt('Introduce el origen del vuelo');
                            nuevoVuelo.from = prompt('Introduce el destino del vuelo');
                            nuevoVuelo.cost = prompt('Introduce el coste del vuelo');
                                
                            function escalas(){
                            nuevoVuelo.scale = prompt('Tiene escalas? Yes/No');
                                nuevoVuelo.scale = nuevoVuelo.scale.toUpperCase();

                                            //pasamos de string a number
                                                nuevoVuelo.id = parseInt(nuevoVuelo.id);
                                                nuevoVuelo.cost = parseInt(nuevoVuelo.cost);

                                    //convertimos en booleano la respuesta
                                        if(nuevoVuelo.scale === 'YES'){
                                                nuevoVuelo.scale = true;
                                                flights.push(nuevoVuelo);
                                                lookFlights();

                                        }else if(nuevoVuelo.scale === 'NO'){
                                            nuevoVuelo.scale = false;
                                            flights.push(nuevoVuelo);
                                            lookFlights();
                                            
                                        }else{
                                            alert('Tienes que introducir Yes o No');
                                            escalas();
                                        }
                                    }
                                    escalas();
                                }
                            }

    //vuelo a eliminar                            
    function eliminarVuelo(){
        vueloAeliminar = prompt('Introduce el ID del vuelo a eliminar')
        
            //pasem prompt a number
                vueloAeliminar = parseInt(vueloAeliminar);

            //for per recorrer flights i fer pop al que estem
            for(let q = 0; q <= flights.length; q++){
                    if(flights[q].id === vueloAeliminar){
                        flights.splice(q,1);
                    }
            }
            lookFlights();
            seguirSalir();

    }           
                                                             


            function proAirlines(){
                //Prompt para entrar como Admin o User
                function adminU(){
                var adminUser = prompt('Inicia session como ADMIN o USER');
                    adminUser = adminUser.toUpperCase();

                    //condicional para aplicar diferentes opciones segun usuario

                    //Opciones para ADMIN
                    if(adminUser === 'ADMIN'){
                        var selectionAdmin = prompt('Deseas CREAR nuevos vuelos o ELIMINAR vuelos?');
                        selectionAdmin = selectionAdmin.toUpperCase();

                            if(selectionAdmin === 'CREAR'){
                               crearVuelo();
                            }if(selectionAdmin === 'ELIMINAR'){
                                eliminarVuelo();
                            }


                    //Opciones para USER
                    }if(adminUser === 'USER'){ //buscar por precio mas alto mas bajo o igual

                        //funcion para repetir busqueda
                        function repeatSearch(){
                            var newSearch = prompt('Quieres realizar una nueva busqueda? Si / No');
                            newSearch = newSearch.toUpperCase();
                                if(newSearch === 'SI'){
                                    busquedaPorUser();
                                }else if(newSearch === 'NO'){
                                    exit();
                                }else{
                                    alert('Tienes que introducir Si o No');
                                    repeatSearch();
                                }
                        }

                        //funcion seleccionar ID
                        function IDvuelo(){
                            var newID = prompt('Selecciona el ID del vuelo que deseas comprar');
                            newID = parseInt(newID);
                                if(newID < 16){
                                    alert('Gracias por su compra, vuelva pronto.');
                                    exit();
                                }else{ 
                                    alert('Tienes que introducir un ID valido');
                                    IDvuelo();
                                }
                        
                        }

                        function busquedaPorUser(){
                        var tipoUser = prompt('Deseas buscar tu vuelo por precio "exacto", mas "bajo" o mas "alto"? o "salir"')
                            tipoUser = tipoUser.toUpperCase();

                                if(tipoUser === 'EXACTO'){
                                    //pasamos prompt a numero y comparamos con todos los precios
                                        let precioExacto = prompt('Introduce el precio exacto con el que quieres buscar tu vuelo');
                                        precioExacto = parseInt(precioExacto);
                                                    for(let k = 0; k < flights.length; k++){
                                                        if(flights[k].cost === precioExacto){
                                                            console.log(`Los siguientes vuelos coinciden con tu busqueda: EL vuelo con ID: ${flights[k].id} origen: ${flights[k].to} y destino: ${flights[k].from}.`);
                                                        }else{
                                                            alert('No hay ningun vuelo que coincida con tu busqueda')
                                                            busquedaPorUser();
                                                        }
                                                    }
                                                    IDvuelo();               

                                }else if(tipoUser === 'BAJO'){
                                    //comparamos con todos los precios los que sean igual o mas bajos
                                    let precioBajo = prompt('Introduce el precio con el que quieres buscar tu vuelo, buscaremos todos los vuelos con el mismo precio o mas bajo que el introducido');
                                    precioBajo = parseInt(precioBajo);
                                                for(let k = 0; k < flights.length; k++){
                                                    if(flights[k].cost <= precioBajo){
                                                        console.log(`Los siguientes vuelos coinciden con tu busqueda: EL vuelo con ID: ${flights[k].id} origen: ${flights[k].to} y destino: ${flights[k].from}.`);
                                                    }else{
                                                        alert('No hay ningun vuelo que coincida con tu busqueda')
                                                        busquedaPorUser();
                                                    }
                                                }
                                                IDvuelo();                



                                }else if(tipoUser === 'ALTO'){
                                    //comparamos con todos los precios los que sean igual o mas altos
                                    let precioAlto = prompt('Introduce el precio con el que quieres buscar tu vuelo, buscaremos todos los vuelos con el mismo precio o mas alto que el introducido');
                                    precioAlto = parseInt(precioAlto);
                                                for(let k = 0; k < flights.length; k++){
                                                    if(flights[k].cost >= precioAlto){
                                                        console.log(`Los siguientes vuelos coinciden con tu busqueda: EL vuelo con ID: ${flights[k].id} origen: ${flights[k].to} y destino: ${flights[k].from}.`);
                                                    }else{
                                                        alert('No hay ningun vuelo que coincida con tu busqueda')
                                                        busquedaPorUser();
                                                    }
                                                }
                                                IDvuelo();  

                                }else if(tipoUser === 'SALIR'){
                                    exit();
                                }else{
                                    alert('Tienes que introducir "exacto", "bajo", "alto" o "salir"');
                                    busquedaPorUser();
                                }
                            }
                        busquedaPorUser();    

                    }else{
                        alert('Debes introducir ADMIN o USER');
                        adminU();
                    }
                    
                }
                     adminU();
                
                
        }       
        
        proAirlines();
        function exit(){
            alert('Hasta la proxima!');
        }

}

skylabAirlines();
