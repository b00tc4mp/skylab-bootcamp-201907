var questions = [
    { letter : `a` , answer : [`abducir`, 'ahorrar', 'abierto'] , status : 0 , question : [`CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien`, 
    'CON LA A. Guardar dinero como previsión para necesidades futuras',  //metemos las deiferentes preguntas y respuestas en arrays//
    'CON LA A. No murado, no cercado o no cerrado.', 'abierto'], savedroll: null}, //creamos una nueva propiedad para volver a mostrar la misma pregunta en caso de introducir pasapalabra
    { letter : `b` , answer : `bingo` , status : 0 , question : `CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso` },
    { letter : `c` , answer : `churumbel` , status : 0 , question : `CON LA C. Niño, crío, bebé` },
    { letter : `d` , answer : `diarrea` , status : 0 , question : `CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida` },
    { letter : `e` , answer : `ectoplasma` , status : 0 , question : `CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación` },
    { letter : `f` , answer : `facil` , status : 0 , question : `CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad` },
    { letter : `g` , answer : `galaxia` , status : 0 , question : `CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas` },
    { letter : `h` , answer : `harakiri` , status : 0 , question : `CON LA H. Suicidio ritual japonés por desentrañamiento` },
    { letter : `i` , answer : `iglesia` , status : 0 , question : `CON LA I. Templo cristiano` },
    { letter : `j` , answer : `jabali` , status : 0 , question : `CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba` },
    { letter : `k` , answer : `kamikaze` , status : 0 , question : `CON LA K. Persona que se juega la vida realizando una acción temeraria` },
    { letter : `l` , answer : `licantropo` , status : 0 , question : `CON LA L. Hombre lobo` },
    { letter : `m` , answer : `misantropo` , status : 0 , question : `CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas` },
    { letter : `n` , answer : `necedad` , status : 0 , question : `CON LA N. Demostración de poca inteligencia` },
    { letter : `ñ` , answer : `señal` , status : 0 , question : `CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.` },
    { letter : `o` , answer : `orco` , status : 0 , question : `CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien` },
    { letter : `p` , answer : `protoss` , status : 0 , question : `CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft` },
    { letter : `q` , answer : `queso` , status : 0 , question : `CON LA Q. Producto obtenido por la maduración de la cuajada de la leche` },
    { letter : `r` , answer : `raton` , status : 0 , question : `CON LA R. Roedor` },
    { letter : `s` , answer : `stackoverflow` , status : 0 , question : `CON LA S. Comunidad salvadora de todo desarrollador informático` },
    { letter : `t` , answer : `terminator` , status : 0 , question : `CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984` },
    { letter : `u` , answer : `unamuno` , status : 0 , question : `CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914` },
    { letter : `v` , answer : `vikingos` , status : 0 , question : `CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa` },
    { letter : `w` , answer : `sandwich` , status : 0 , question : `CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso` },
    { letter : `x` , answer : `botox` , status : 0 , question : `CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética` },
    { letter : `y` , answer : `peyote` , status : 0 , question : `CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos` },
    { letter : `z` , answer : `zen` , status : 0 , question : `CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional` },
    ];

var jugadores = [];

function main() {
    var respuesta = null;
    var acertadas = null;
    var falladas = null;
    var usuario = {nombre: null, puntos: null};
    var otra = null;
    var roll = null; //seleccionaremos la pregunta random usando esta variable//
    usuario.nombre = prompt('Nombre?');
    preguntas();
    recuento();
    ranking();

    function preguntas() {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].status === 0  || questions[i].status === 1) {             
                /* parte de codigo enfocado a funcionar con 3 preguntas distintas preguntas por cada letra */
                if (i === 0) {
                    if (questions[i].status === 1) roll = questions[i].savedroll; // si la pregunta fue omitida por pasapaabra importamos el numero random del 0 al 2 para realizar la misma pregunta//
                    else roll = Math.floor(Math.random() * 3);
                    do respuesta = prompt(questions[i].question[roll]);  // si el promt esta vacio volver a preguntar, si se presiona en cancelar salir//
                    while (respuesta == '');
                    if (respuesta == null) return;
                    if (respuesta.toUpperCase() === 'END') return;
                    else if (respuesta.toUpperCase() === 'PASAPALABRA') {
                        questions[i].status = 1;                                       
                        questions[i].savedroll = roll;
                        continue;
                    }
                    else if (respuesta.toLowerCase() === questions[i].answer[roll]) {
                        alert('Respuesta correcta!');
                        questions[i].status = 2;
                    }
                    else {
                        alert('Respuesta incorrecta!');
                        questions[i].status = 3;
                    }
                }    
                else {
                    /* parte de codigo para preguntas unicas */
                    do respuesta = prompt(questions[i].question);
                    while (respuesta == '');
                    if (respuesta == null) return;
                    if (respuesta.toUpperCase() === 'END') return;
                    else if (respuesta.toUpperCase() === 'PASAPALABRA') {              
                        questions[i].status = 1;
                        continue;
                    }
                    else if (respuesta.toLowerCase() === questions[i].answer) {
                        alert('Respuesta correcta!');
                        questions[i].status = 2;
                    }
                    else {
                        alert('Respuesta incorrecta!');
                        questions[i].status = 3;
                    }
                }
            }
        }
        if (questions.some(x => x.status === 1)) {   // si hay algun pasapalabra, seguimos con otra ronda //
            preguntas(); 
        }
    }

    function recuento() {
        acertadas = questions.filter(x => x.status === 2);
        alert('Has acertado ' + (acertadas.length) + ' pregunta/s.');
        falladas = questions.filter(x => x.status === 3);
        alert('Has fallado ' + (falladas.length) + ' pregunta/s.');
        questions.forEach(function(item) { // reseteamos el status a 0 una vez acabado el juego//
            item.status = 0;
        });
    }

    function ranking() {
        total = acertadas.length + falladas.length;  // si no se han completado todas las preguntas salir y no entrar no mostrar el ranking //
        if (total !== questions.length) return;
        usuario.puntos = acertadas.length;
        jugadores.push(usuario);
        jugadores.sort(compare);
        alert('RANKING!');
        jugadores.forEach(function(item, index) {
        alert((index + 1) + 'a posicion => ' + item.nombre + ' con ' + item.puntos + ' respuesta/s acertadas.');
        });
        otra = confirm('Quieres jugar una nueva partida?');
        if (otra === true) main(); // otra partida//

        function compare (a, b) { //pasamos como parametro a .sort para ordenar por puntuacion
            if (a.puntos < b.puntos) return 1;
            if (a.puntos > b.puntos) return -1;
            return 0;
        }
    }
}