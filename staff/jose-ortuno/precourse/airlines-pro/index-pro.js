// Proyecto 2 - PRO 2 - Skylab Airlines
console.log('Skylab Airlines! - Project 2 PRO 2');

/*
PRO!:
Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:
¡! Si eres ADMIN, la función debería permitir:
  - Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
  - Poder eliminar vuelos mediante el ID.

¡! Si eres USER la función debería permitir:
  - Buscar por precio (más alto, más bajo o igual), el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, el programa responderá: "Gracias por su compra, vuelva pronto."
*/

// información de los vuelos
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

// FUNCIONES RECURRENTES:
// Cuando pulsamos cancel:
function pushCancel (message, exit) {
    switch (message) {
        case(1):
            console.log('Al pulsar [CANCELAR] entedemos que quiere abortar misión. Pulsa de nuevo [CANCELAR] y esto terminará aquí.');
            break;
        case(2):
            console.log('Al pulsar [CANCELAR] entedemos que quiere abortar misión. Le mandamos un paso hacia atrás por si ha sido un error.');
            break;
    }

    switch (exit) {
        case(1):
            theEnd ();
            break;
        case(2):
            panel ();
            break;
        case(3):
            getRoles ();
            break;
        case(4):
            adminRole ();
            break;
        case(5):
            userRole ();
            break;
    }
}

// Para mostrar el mensaje de la escala:
var scale;
function viewScale (index) {
    if (flights[index].scale == false) {
        scale = 'No hay escalas.'
        return scale;
    } else if (flights[index].scale == true) {
        scale = 'Existen escalas.'
        return scale;
    }
};

// El final
var whatToDo;
function theEnd () {
    whatToDo = confirm('¿Quieres comenzar de nuevo?');
    switch (whatToDo) {
        case(true):
            start ();
            break;
        case(false):
            console.log('¡Hasta la próxima! Si quieres volver a comenzar, llama a la función "panel"');
            break;
    }
}

// COMENZAMOS:
console.log('Para iniciar tienes que llamar a la función "start" a través de la consola.');

// ----------------------------------------------------------------------------
// PARTE 1:
// Le pedimos su nombre:
var preName;
var name;

// Bienvenida:
function start () {
    preName = prompt('Buenas tardes, ¿Me puedes facilitar tu nombre para parecer más gentil?');
    verify ();
}
// Verificamos que el campo lo completen:
function verify () {
    // Creamos una condicional por si deja el campo vacío o clicka 'cancel':
    if (preName == null) {
        pushCancel (1, 1);
    } else if (preName == '') {
        verifyTwo ();
    } else {
        name = preName.toUpperCase();
        panel ();
    }
    // Segunda verficación para que nadie se escape (genera un bucle si no introduces nada):
    function verifyTwo () {
        preName = prompt('Parece que no te he entendido bien ¿Me lo puedes a repetir por favor? Disculpa, ayer me fuí de cañas y hoy me cuesta. (Te doy una PISTA por si acaso: debes introducir tu nombre en la casilla. ¡De nada!)');
        if (preName == null) {
            pushCancel (1, 1);
        } else if (preName == '') {
            verifyTwo ();
        } else {
            name = preName.toUpperCase();
            panel ();
        }
    }
}

// Comenzamos a mostrar los vuelos:
function panel () {
    // Saludo de bienvenida después de comprobar que todo está correcto:
    console.log('¡Hola ' + name + '! A continuación te mostraremos los vuelos que operan con Skylab Airlines:');
    
    // Variables para luego calcular el promedio y escalas:
    var sum = 0;
    var calcScale = 0;

    // Iterancia para recorrer el objeto:
    flights.forEach(function(element, index, array) {
        //Mostramos la información de los vuelos:
        console.log('ID: ' + element.id + '\nOrigen: ' + (element.from).toUpperCase() + '\nDestino: ' + (element.to).toUpperCase() + '\nPrecio: ' + element.cost + '€\nATENCIÓN: ' + viewScale(index));
        // Calculamos la suma de todos los vuelos para calcular el promedio:
        sum += element.cost;
        // Calculamos el número de escalas que existen
        if (element.scale == true) {
            calcScale++;
        }
    });
    
    // Calculamos el promedio y lo mostramos:
    var avg = sum/flights.length;
    console.log('(i) El coste medio de los vuelos es de ' + avg.toFixed(3) + '€');

    // Mostramos el número de escalas que existen:
    console.log('(i) Ahora mismo hay ' + calcScale + ' vuelos con escala.')

    // Presentación de los 5 últimos vuelos
    console.log('A continuación te mostramos la información de los últimos 5 vuelos del día:')

    // Array con los últimos 5 vuelos
    var lastFlights = flights.slice(-5);

    // Iterancia para recorrer los últimos vuelos:
    lastFlights.forEach(function(element, index, array) {
        //Mostramos la información de los los últimos vuelos:
        console.log('ID: ' + element.id + '\nOrigen: ' + (element.from).toUpperCase() + '\nDestino: ' + (element.to).toUpperCase() + '\nPrecio: ' + element.cost + '€\nATENCIÓN: ' + viewScale(index));
    });

    if (flightPurchased.length >= 1) {
        console.log('--> Vuelos comprados:')
        flightPurchased.forEach(function(element, index, array) {
            console.log('ID: ' + element.id + '\nDestino: ' + element.to + '\nSalida: ' + element.from + '\nPrecio: ' + element.cost + '€' + '\nATENCIÓN: ' /*+ viewScale(selectionFlights[index].id)*/);
        });
    }

    // Entrada al siguiente paso:
    console.log('A partir de aquí te dejamos con los funciones avanzadas. ¡Suerte!')
    getRoles ();
}

// ----------------------------------------------------------------------------
// PARTE 2:
// El usuario elije el rol:
var roles;
var strRoles;
function getRoles () {
    roles = prompt('¡Hola de nuevo ' + name + '! ¿Qué quieres hacer? Escribe:\n--> ADMIN: Podrás crear o eliminar vuelos\n--> USER: Busca vuelos y compra\n--> PANEL: Visualiza el panel de vuelos de nuevo');
    rolesVerify ();
}

// Primera verificación:
function rolesVerify () {
    if (roles == null) {
        // Salimos a panel
        pushCancel (1, 1);
    } else {
        rolesVerifyTwo ();
    }
    // Segunda verificación:
    function rolesVerifyTwo () {
        strRoles = (roles.trim()).toUpperCase();
        if (strRoles == 'ADMIN') {
            adminRole ();
        } else if (strRoles == 'USER') {
            userRole ();
        } else if (strRoles == 'PANEL') {
            panel ();
        } else {
            roles = prompt('Perdona que no te he entendido bien. Debes de escoger entre ADMIN, USER o PANEL:');
            rolesVerify ();
        }
    }
}

// Opciones para ADMIN:
var optionsAd;
var srtOptionsAd;
function adminRole () {
    // EL ADMIN Elije qué quiere hacer:
    optionsAd = prompt(name + ', ahora eres ADMIN.' + '\n¿Qué deseas hacer: CREAR o ELIMINAR vuelos?');
    verifyAdminRole ();
}
// Verificamos el dato introducido:
function verifyAdminRole () {
    if (optionsAd == null) {
        pushCancel (1, 1);
    } else {
        verifyAdminRoleTwo ();
    }
    // Segunda verificación. En este momento cotejamos si el dato introducido es igual a lo que requerimos:
    function verifyAdminRoleTwo () {
        srtOptionsAd = (optionsAd.trim()).toUpperCase();
        if (srtOptionsAd === 'CREAR') {
            createAdminRole ();
        // Eliminar un ARRAY
        } else if (srtOptionsAd === 'ELIMINAR') {
            deleteAdminRole ();
        } else {
            optionsAd = prompt('Perdona no te he entendido bien. Debes escoger entre CREAR o ELIMINAR:');
            verifyAdminRole ();
        }
    }
}

// A. Opciones para CREAR un vuelo:
var newId;
var newTo;
var newFrom;
var newCost;
var newScale;
var newScaleDef;
var infoFlightsCreated;

// Comenzamos a introducir los datos:
function createAdminRole () {
    if (flights.length === 15) {
        console.log('(¡!) Lo siento, el máximo de vuelos que podemos memorizar son 15 en total. Acabas de llegar al máximo. Elimina alguno y podrás volver a crear más.');
        getRoles ();
    } else {
        // Nueva ARRAY para actualizar el ID
        var lastArrID = flights.slice(-1);
        var lastID = lastArrID[0].id;
        newId = lastID + 1;
        
        introData (1);
        function introData (quest) {
            switch (quest) {
                case(1):
                    newTo = prompt('(1/4) CREAR VUELO:\nDestino:');
                    verifyOld (newTo, 1, 2, 1);
                    break;
                case(2):
                    newFrom = prompt('(2/4) CREAR VUELO:\nOrigen:');
                    verifyOld (newFrom, 1, 3, 2);
                    break;
                case(3):
                    newCost = prompt('(3/4) CREAR VUELO:\nPrecio:');
                    verifyOld (newCost, 2, 4, 3);
                    break;
                case(4):
                    newScale = confirm('(4/4) CREAR VUELO:\n¿Tiene escalas? Pulsa:\n--> [ACEPTAR] es SÍ\n--> [CANCELAR] es NO.');
                    break;
            }
        }
        // Verificamos a la vez que vamos introduciendo datos que todo esté bien:
        function verifyOld (param, type, exit, quest) {
            if (param == null) {
                pushCancel (2, 3);
            } else if (param == '') {
                console.log('(¡!) Parece que la casilla estaba vacía y sin datos no podemos trabajar.');
                introData (quest);
            } else {
                switch (type) {
                    case(1):
                        var newSrt = Number(param);
                        if (isNaN(newSrt) === true) {
                            introData (exit);
                        } else if (isNaN(newSrt) === false) {
                            console.log('(¡!) Lo siento, pero el dato que debes tiene que ser el nombre de una ciudad, no puede ser un número. Vuelve a intentarlo.')
                            introData (quest);
                        }
                        break;
                    case(2):
                        var newNum = Number(param);
                        if (isNaN(newNum) === true) {
                            console.log('(¡!) Lo siento, pero el dato que debes de escribir tiene que ser un número sin níngún símbolo o texto. Se entiende que el dato estará en €. Vuelve a intertarlo.')
                            introData (quest);
                        } else if (isNaN(newNum) === false) {
                            introData (exit);
                        }
                        break;
                }
            }
    
            if (newScale === true) {
                newScaleDef = true;
            } else if (newScale === false) {
                newScaleDef = false;
            }
        }
    
        // Si todo está bien, cada paso ha ido sucediendo y guardándose en sus variables correspondientes. Todo ok, los datos se suben a la array.
        flights.push({id: Number(newId), to: (newTo.trim()).toUpperCase(), from: (newFrom.trim()).toUpperCase(), cost: Number(newCost.trim()), scale: newScaleDef});
        infoFlightsCreated = flights.length - 1;
        console.log('(¡!) Acabas de crear el vuelo:\nID:' + flights[infoFlightsCreated].id + '\nDestino: ' + flights[infoFlightsCreated].to + '\nOrigen: ' + flights[infoFlightsCreated].from + '\nPrecio: ' + flights[infoFlightsCreated].cost + '€\nATENCIÓN: ' + viewScale(infoFlightsCreated));
        rolesEnd(1);
    }
}


// B. Opciones para ELIMINAR un vuelo:
var getRemovedArr;
var getRemovedToNum;
var infoFlightsDeleted;

// Comenzamos introduciendo la ID a eliminar: 
function deleteAdminRole () {
    // Verificamos primero que hayan vuelos para eliminar
    if (flights.length === 0) {
        console.log('(¡!) Lo siento, no puedes acceder a la opción ELIMINAR VUELOS porque no existen vuelos qué eliminar. Crea un vuelo a través de ADMIN y podrás seguir jugando.')
        getRoles ();
    } else {
        getRemovedArr = prompt('Escribe el ID que deseas eliminar:');
        verifyDeleteAdminRole ();
    }
}
// Verificamos que todo esté correcto:
function verifyDeleteAdminRole () {
    if (getRemovedArr == null) {
        pushCancel (2, 3);
    } else if (getRemovedArr == '') {
        getRemovedArr = prompt('No puedes dejar la casilla vacía, necesitamos un ID para eliminar el vuelo correspondiente:');
        verifyDeleteAdminRole ();
    } else {
        verifyDeleteAdminRoleTwo ();
    }
    function verifyDeleteAdminRoleTwo () {
        var flightsDeleted = [];
        getRemovedToNum = Number(getRemovedArr.trim());
        if (isNaN(getRemovedToNum) === true) {
            getRemovedArr = prompt('El valor introducido debe ser un número, prueba de nuevo:');
            verifyDeleteAdminRole ();
        } else {
            // Iteramos sobre el objeto para identificar el ID con el valor introducido:
            flights.forEach(function(element, index, array) {
                if (getRemovedToNum === element.id) {
                    flightsDeleted.push(element);
                    flights.splice(index, 1);
                    infoFlightsDeleted = flightsDeleted.length - 1;
                }
            });
            // Gracias a que hemos creado un array nuevo con los vuelos eliminados, podemos verificar si la ITERACIÓN anterior ha encontrado coincidencias y ha eliminado algo:
            if (flightsDeleted.length === 0) {
                getRemovedArr = prompt('El ID de vuelo que ha introducido no existe. Prueba de nuevo:');
                verifyDeleteAdminRole ();
            } else {
                console.log('(¡!) Acabas de eliminar el vuelo:\nID:' + flightsDeleted[infoFlightsDeleted].id + '\nDestino:' + (flightsDeleted[infoFlightsDeleted].to).toUpperCase() + '\nOrigen: ' + (flightsDeleted[infoFlightsDeleted].from).toUpperCase());
            }
        }
    }
    // Importante resetear la ARRAY con el elemento eliminados
    flightsDeleted = [];
    rolesEnd(2);
}

// Salida para los roles una vez hayan trabajado en ellos:
function rolesEnd (exit) {
    var passTwo;
    switch (exit) {
        case(1):
            passTwo = confirm('¿Quieres seguir CREANDO?\n--> [ACEPTAR] Si quieres seguir\n--> [CANCELAR] Si quieres elegir nuevo ROL.');
            if (passTwo === true) {
                createAdminRole ();
            } else if (passTwo === false) {
                getRoles ();
            }
            break;
        case(2):
            passTwo = confirm('¿Quieres seguir ELIMINANDO?\n--> [ACEPTAR] Si quieres seguir\n--> [CANCELAR] Si quieres elegir nuevo ROL.');
            if (passTwo === true) {
                deleteAdminRole ();
            } else if (passTwo === false) {
                getRoles ();
            }
            break;
    }
}

// ----------------------------------------------------------------------------
// PARTE 3:
// Funciones para User:
var getPrice;
var price;
var variable;
var selectionFlights = [];
var toBuy;
var acceptToBuy;
var toBuyNum;
var flightPrePurchased = [];
var flightPurchased = [];
var passTwo;

function userRole () {
    console.log('¡Hola ' + name + '! Bienvenido a las opciones de usuario. Aquí podrás buscar el vuelo que más te encaje por precio y comprarlo.')
    priceUserRole ();
}
// Comenzamos pidiendo el precio para iniciar la búsqueda
function priceUserRole () {
    getPrice = prompt('PASO1:\nBusca tu vuelo a través del precio en €: (Escribe un número)');
    verifyPriceUserRole ()
}
// Verificamos que el dato introducido sea correcto
function verifyPriceUserRole () {
    if (getPrice == null) {
        pushCancel(2, 3);
    } else if (getPrice == '') {
        getPrice = prompt('No puedes dejar la casilla vacía, necesitamos un ID para eliminar el vuelo correspondiente:');
        verifyPriceUserRole ();
    } else {
        price = Number(getPrice.trim());
        if (isNaN(price) === true) {
            getPrice = prompt('El dato introducido debe de ser un número que describa el baremo de precios que quiere seleccionar. El precio no debe tener símbolos, se entiende que son €:');
            verifyPriceUserRole ();
        } else if (isNaN(price) === false) {
            variableUserRole ();
        }
    }
}
var variableView;
// El segundo parámetro de búsqueda
function variableUserRole () {
    getVariable = prompt('PASO2:\nQuiéres que te mostremos precios: (ESCRIBE) \n  - Por debajo de tu precio (BARATO)\n  - Por encima de tu precio (CARO)\n  - Igual a tu precio (IGUAL)');
    
    // Verificamos que todo esté correcto:
    if (getVariable == null) {
        pushCancel(2, 3);
    } else {
        variable = (getVariable.trim()).toUpperCase();
    }
    // Verificamos que el dato introducido esté dentro del parámetro requerido:
    if (variable === 'BARATO') {
        variableView = 'más baratos o iguales a';
        executionUser (1);
    } else if (variable === 'CARO') {
        variableView = 'más caros o iguales a';
        executionUser (2);
    } else if (variable === 'IGUAL') {
        variableView = 'iguales a';
        executionUser (3);
    } else {
        console.log('(¡!) No he entendido lo que me has dicho, puedes volver a repetirlo?')
        variableUserRole ();
    }
}
// Gracias a la condicional anterior, iteramos sobre el objeto según el usuario haya especificado el segundo parámetro. Cuando coincide lo subimos a una nueva array: 
function executionUser (status) {
    flights.forEach(function(element, index, array) {
        // Para mostrar el mensaje de la escala:
        switch (status) {
            case(1):
                if (price >= element.cost) {
                    selectionFlights.push(element);
                }
                break;
            case(2):
                if (price <= element.cost) {
                    selectionFlights.push(element);
                }
                break;
            case(3):
                if (price == element.cost) {
                    selectionFlights.push(element);
                }
                break;                  
        }
    });
    viewSelectedUser ();
}
// Visualizamos los vuelos seleccionados:
function viewSelectedUser () {
    // verificamos que hayan coincidencias:
    if (selectionFlights.length === 0) {
        var newSearch = confirm('No hay vuelos con la combinación de búsqueda elegida. ¿Quiere realizar una nueva búsqueda?');
        if (newSearch === true) {
            selectionFlights = [];
            priceUserRole ();
        } else if (newSearch === false) {
            pushCancel (2, 3);
        }
    } else {
        console.log('A continuación te mostramos los vuelos ' + variableView + ' ' + price + '€:');
        selectionFlights.forEach(function(element, index, array) {
            console.log('ID: ' + element.id + '\nDestino: ' + element.to + '\nSalida: ' + element.from + '\nPrecio: ' + element.cost + '€' + '\nATENCIÓN: ' + viewScale(element.id));
        });
        userBuy ();
    }
}
// En el caso de querer comprar un vuelo, el usuario introduce la ID:
function userBuy () {
    toBuy = prompt('Compra el vuelo que más te interese.\n--> Introduce el ID y pulsa [ACEPTAR].\n--> Pulsa [CANCELAR] para crear una selección nueva y seguir buscando');
    // Damos la opción de comprar o volver a buscar:
    if (toBuy === true) {
        userBuy ();
    } else if (toBuy === false) {
        selectionFlights = [];
        priceUserRole ();
    }
    userBuyVerify ();
}
// Verificamos que la ID sea correcta:
function userBuyVerify () {
    if (toBuy == null) {
        selectionFlights = [];
        pushCancel(2, 5);
    } else if (toBuy == '') {
        toBuy = prompt('No puedes dejar la casilla vacía, necesitamos un ID para eliminar el vuelo correspondiente:');
        userBuyVerify ();
    } else {
        toBuyNum = Number(toBuy.trim());
        if (isNaN(toBuyNum) === true) {
            toBuy = prompt('El dato introducido debe de ser el número exacto de la ID del vuelo:');
            userBuyVerify ();
        } else if (isNaN(toBuyNum) === false) {
            userBuyVerifyTwo ();
        }
    }
}
// Verificamos que la ID está dentro de los vuelos seleccionados previamente:
function userBuyVerifyTwo () {
    selectionFlights.forEach(function(element, index, array) {
        if (toBuyNum === element.id) {
            flightPrePurchased.push(element);
        }    
    });

    if (flightPrePurchased.length === 0) {
        toBuy = prompt('La ID: ' + toBuyNum + ' no existe de entre los vuelos seleccionados. Prueba de nuevo:');
        userBuyVerify ();
    } else {
        buyNow ();
    }
};
// Ultimo paso de comprar y salida del ejercicio:
function buyNow () {
    console.log('El vuelo seleccionado es:\nID: ' + toBuyNum + '\nDestino: ' + flights[toBuyNum].to + '\nSalida: ' + flights[toBuyNum].from + '\nPrecio: ' + flights[toBuyNum].cost+ '\nATENCIÓN: ' + viewScale(toBuyNum));
    acceptToBuy = confirm('¿Seguro que quieres comprar el vuelo seleccionado?');
    if (acceptToBuy === true) {
        flightPurchased.push(flightPrePurchased[0]);
        console.log('Tu compra se ha efectuado correctamente. Acabas de comprar:');
        console.log('ID: ' + flightPrePurchased[0].id + '\nDestino: ' + flightPrePurchased[0].to + '\nSalida: ' + flightPrePurchased[0].from + '\nPrecio: ' + flightPrePurchased[0].cost + '€' + '\nATENCIÓN: ' + viewScale(flightPrePurchased[0].id));
        console.log('Que tengas un buen viaje y gracias por volar con Skylab Airlines.');
        selectionFlights = [];
        flightPrePurchased = [];
        getRoles ();
    } else if (acceptToBuy === false) {
        console.log('Vemos que se lo ha pensado. Elija otro vuelo.')
        flightPrePurchased = [];
        userBuy ();
    }
}