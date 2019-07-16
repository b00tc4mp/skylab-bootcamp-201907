//airlines

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


var usuario = ""

function welcome(){
    usuario = prompt('Le damos la bienvenida a Skylab Airlines. ¿Podría decirnos su nombre?');
    var mensaje1 = alert(`Muchas gracias por su visita, ${usuario}. A continuación le mostraremos los vuelos disponibles para hoy.`);
    var mensaje2 = 'VUELOS DE HOY: \n';
    console.log(mensaje2);
    for (var i = 0; i< flights.length; i++) {
        console.log(`El vuelo con origen ${flights[i].from} y destino ${flights[i].to} cuesta €${flights[i].cost} y ${flights[i].scale ? 'tiene escalas' : 'no tiene escalas'}.`);
    };
    var costoTotalVuelos = 0
    for (var i = 0; i < flights.length; i++){
        costoTotalVuelos += flights[i].cost;
    };
    var mensaje3 = `\nPRECIO PROMEDIO:\nEl precio promedio de nuestros vuelos es de €${(costoTotalVuelos / flights.length).toFixed(2)}.`
    var conteoDeEscalas = 0
    for (var i = 0; i< flights.length; i++) {
        if (flights[i].scale === true){
        conteoDeEscalas++
        }
    };
    var mensaje4 = `\nESCALAS: \n${conteoDeEscalas} de nuestros vuelos tienen escalas.`
    var ultimosDestinos = []
    for (var i = flights.length - 5; i < flights.length ; i++){
        ultimosDestinos.push(flights[i].to);
    }
    var mensaje5 = `\nÚLTIMOS DESTINOS DEL DÍA: \n${ultimosDestinos.join(', ')}`;
    console.log(mensaje3, '\n', mensaje4, '\n', mensaje5)
    return mensaje1, menu();
};

welcome()


//Airlines PRO
function menu(){
    var profile = prompt(`${usuario}, por favor identifíquese como user o admin, o escriba "exit" para salir de este menú.`).toLowerCase();
    switch (profile){
        case 'user':
            alert(`${usuario}, ha sido identificado como ${profile}. Presiona "OK" para continuar.`);
            userMenu()
            break
        case 'admin':
            alert(`${usuario}, ha sido identificado como ${profile}. Presiona "OK" para continuar.`);
            adminMenu()
            break
        case 'exit':
            alert(`Hasta luego, ${usuario}.`);
            break
        default:
            alert(`Opción no válida, inténtelo de nuevo.`);
            menu();
    };
};

//USER MENU
function userMenu(){
    var option = prompt(`Por favor, elija una de las siguientes opciones: \n1) Consultar vuelos por precio. \n2) Comprar vuelo. \n3) Volver.`);
    switch(option){
        case '1': //Buscar por precio (más alto, más bajo o igual).
            var presupuesto = prompt('Por favor, ingrese su presupuesto');
            var precioExacto = []
            var precioMenor = []
            var precioMayor = []
            for (var i = 0; i < flights.length; i++){
                if (presupuesto == flights[i].cost){
                    precioExacto.push(`• Vuelo ${flights[i].id}: ${flights[i].from}-${flights[i].to}, €${flights[i].cost}\n`);
                } else if (presupuesto > flights[i].cost){
                    precioMenor.push(`• Vuelo ${flights[i].id}: ${flights[i].from}-${flights[i].to}, €${flights[i].cost}\n`);
                } else if (presupuesto < flights[i].cost){
                    precioMayor.push(`• Vuelo ${flights[i].id}: ${flights[i].from}-${flights[i].to}, €${flights[i].cost}\n`);
                };
            };
            if(precioExacto.length === 0){
                precioExacto.push(`• Ningún vuelo coincide con el presupuesto ingresado.\n`)
            };
            if(precioMenor.length === 0){
                precioMenor.push(`• No hay vuelos más baratos que el presupuesto ingresado.\n`)
            };
            if(precioMayor.length === 0){
                precioMayor.push(`• Su presupuesto es superior al costo de cualquiera de nuestros vuelos.\n`)
            };
            alert('Vuelos que coinciden con su presupuesto:\n' + precioExacto.join('') + '\n' + 'Más baratos:\n' + precioMenor.join('') + '\n' + 'Por unos euros más...:\n' + precioMayor.join(''));
            userMenu();
            break
        case '2': //Comprar vuelos por ID.
            var idVuelo = parseInt(prompt('Ingrese el ID del vuelo que quiere comprar:'));
            if(idVuelo.length === 0 || idVuelo > flights.length - 1 || isNaN(idVuelo)){
                alert(`Entrada no válida. Por favor, inténtelo de nuevo.`);
            } else {
                for (var i = 0; i < flights.length; i++){
                    if(flights[i].id == idVuelo){
                        alert(`${usuario}: ha comprado un billete para el vuelo ${flights[i].id},\nOrigen: ${flights[i].from}\nDestino: ${flights[i].to}.\nCosto: €${flights[i].cost}.\nMuchas gracias por su compra.`)
                    }
                }
            }
            userMenu();
            break
        case '3':
            menu();
            break
        default:
            alert('Opción no válida, inténtelo de nuevo.');
            userMenu();
    };
};

//ADMIN MENU
function adminMenu(){
    var option = prompt(`Por favor, elija una de las siguientes opciones: \n1) Listar vuelos. \n2) Agregar nuevo vuelo. \n3) Eliminar vuelo. \n4) Volver.`);
    var listaVuelos = []
    switch(option){
        case '1': //Listar vuelos
            for (var i = 0; i< flights.length; i++) {
                listaVuelos.push(`${flights[i].id} - ${flights[i].from} to ${flights[i].to}, ${flights[i].cost}, ${flights[i].scale ? 'con escalas' : 'sin escalas'}.\n`);
            };
            alert(`${flights.length} vuelos para hoy:\n${listaVuelos.join('')}`);
            adminMenu();
            break;
        case '2': //Añadir vuelos.
            if(flights.length >= 15){
                alert('AVISO:\nCapacidad operativa máxima de 15 vuelos alcanzada. Si necesita agregar más vuelos, debe eliminar algunos antes.');
            } else {
                var origen = prompt('Ingrese ciudad de origen:');
                var destino = prompt('Ingrese ciudad de destino:');
                var costo = parseInt(prompt('Precio final para clientes:'));
                var escalas = prompt('¿Tiene escalas? Y/N');
                if(escalas.toLowerCase() == 'y'){
                    escalas = true;
                } else if (escalas.toLocaleLowerCase() == 'n'){
                    escalas = false;
                } else {
                    alert('El campo "escalas" tiene un error. Por favor, inténtalo nuevamente.');
                    adminMenu();
                    break
                };
                if (origen == '' || destino == '' || costo.length === 0 || isNaN(costo)){
                    alert('Alguno/s datos son incorrectos. Por favor, inténtalo nuevamente.');
                } else {
                    var nuevoVuelo = { id: flights[flights.length-1].id+1, to: destino, from: origen, cost: costo, scale: escalas }
                    flights.push(nuevoVuelo)
                    alert(`¡Nuevo vuelo añadido!\nID: ${flights[flights.length-1].id}\nOrigen: ${flights[flights.length-1].from}\nDestino: ${flights[flights.length-1].to}\nCosto: €${flights[flights.length-1].cost}\nEscalas: ${flights[flights.length-1].scale}.`);
                };
            };
            adminMenu();
            break;
        case '3': //Eliminar vuelos
            var idVuelo = parseInt(prompt('Ingrese el ID del vuelo que quiere eliminar:'));
            if(idVuelo.length === 0 || idVuelo > flights.length - 1 || isNaN(idVuelo)){
                alert(`Entrada no válida. Por favor, inténtelo de nuevo.`);
            } else {
                for (var i = 0; i < flights.length; i++){
                    if(flights[i].id == idVuelo){
                        var vueloEliminado = `${flights[i].id}, ${flights[i].from} - ${flights[i].to}`
                        flights.splice(i, 1);
                        alert(`El vuelo ${vueloEliminado} ha sido eliminado.`)
                    }
                }
            }
            adminMenu();
            break;
        case '4':
            menu();
            break
        default:
            alert('Opción no válida, inténtelo de nuevo.');
            adminMenu();
    };
};