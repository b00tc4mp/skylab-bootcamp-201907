console.log('Pasapalabra Game versión PRO! Para comenzar el juego llama a la función --> pasapalabra')

/*
Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y el usuario deberá adivinar qué palabra estamos tratando, por ejemplo:

'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!

Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y habiendo respondido todas las letras, deberá indicarle al usuario cuantas letras ha fallado y cuántas ha acertado. Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender que en ese momento, el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. El juego deberá, cuando finalice, mostrar un ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas.

PRO
  --> El programa no debería hacer distinciones entre mayúsculas, minúsculas... Ejemplo: "animal" == "ANIMAL" // "Animal" // "aNiMal"...
  --> El programa debe estar preparado para aceptar el input "END" para terminar el juego en cualquier momento, si esto sucede, el programa dirá cuántas letras ha acertado pero no entrará en el ranking.
  --> Prepara tu programa para que no repita siempre las mismas preguntas, por ejemplo, de la misma letra, se podrían hacer tres preguntas diferentes.
*/

// Primero doblamos las preguntas y respuestas, añadiendo una array. también he añadido una propiedad llamada round para que determine de primeras que pregunta/respuesta pillar al azar.
let questions = [
    { letter: "a", answer: ["abducir", 'agenda'], round: 0, status: 0, question: ["CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", 'CON LA A. Libro o cuaderno en el que se apunta para no olvidarlo aquello que se ha de hacer']},
    { letter: "b", answer: ["bingo", 'bonanza'],  round: 0, status: 0, question: ["CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", 'CON LA B. Prosperidad']},
    { letter: "c", answer: ["churumbel", 'caracol'],  round: 0, status: 0, question: ["CON LA C. Niño, crío, bebé", 'CON LA C. Nombre del molusco gasterópodo terrestre de corte en espiral cuya carne puede comerse']},
    { letter: "d", answer: ["diarrea", 'dormir'],  round: 0, status: 0, question: ["CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", 'CON LA D. Estar en aquel reposo que consiste en la inacción o suspensión de los sentidos y de todo movimiento voluntarios']},
    { letter: "e", answer: ["ectoplasma", 'entrecot'],  round: 0, status: 0, question: ["CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación", 'CON LA E. Trozo de carne sacado de entre costilla y costilla de la res', 'Apellido del cineasta que dirigó la película El Viajante que obtuvo el oscar a la mejor película de habla no inglesa en 2017']},
    { letter: "f", answer: ["facil", 'farhadi'],  round: 0, status: 0, question: ["CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", 'CON LA F. Apellido del cineasta que dirigó la película El Viajante que obtuvo el oscar a la mejor película de habla no inglesa en 2017']},
    { letter: "g", answer: ["galaxia", 'gorgorito'],  round: 0, status: 0, question: ["CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas", 'CON LA G. Coloquialmente quiebro que se hace con la voz con la garganta al cantar']},
    { letter: "h", answer: ["harakiri", 'hidroavion'],  round: 0, status: 0, question: ["CON LA H. Suicidio ritual japonés por desentrañamiento", 'CON LA H. Avión que lleva en lugar de ruedas uno o cuatro flotadores para posarse sobre el agua']},
    { letter: "i", answer: ["iglesia", 'inapetencia'],  round: 0, status: 0, question: ["CON LA I. Templo cristiano", 'CON LA I. Falta de gana de comer']},
    { letter: "j", answer: ["jabali", 'jardineria'],  round: 0, status: 0, question: ["CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", 'CON LA J. Arte y oficio del jardinero']},
    { letter: "k", answer: ["kamikaze", 'okupa'],  round: 0, status: 0, question: ["CON LA K. Persona que se juega la vida realizando una acción temeraria", 'CONTIENE LA K. Persona que se instala en una vivienda o local deshabitado, sin consentimiento del propietario']},
    { letter: "l", answer: ["licantropo", 'lobera'],  round: 0, status: 0, question: ["CON LA L. Hombre lobo", 'CON LA L. Guarida de lobos']},
    { letter: "m", answer: ["misantropo", 'mentira'],  round: 0, status: 0, question: ["CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", 'CON LA M. Cosa que se utiliza por el camino que no es verdad con la intención de que sea creída']},
    { letter: "n", answer: ["necedad", 'nativo'],  round: 0, status: 0, question: ["CON LA N. Demostración de poca inteligencia", 'CON LA N. Se aplica al que ha nacido en el lugar de que se trata']},
    { letter: "ñ", answer: ["señal", 'hogaño'],  round: 0, status: 0, question: ["CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", 'CON LA Ñ. De tiempo que indica en esta época diferencia de antaño en época inferior.']},
    { letter: "o", answer: ["orco", 'organo'],  round: 0, status: 0, question: ["CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien", 'CON LA O. De las partes del pulpo, animal o vegetal que ejercen una función']},
    { letter: "p", answer: ["protoss", 'plotino'],  round: 0, status: 0, question: ["CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft", 'CON LA P. Filósofo romano máximo representante de la escuela neoplatónica y discípulo de Ammonio Sacas de Alejandría']},
    { letter: "q", answer: ["queso", 'chisquero'],  round: 0, status: 0, question: ["CON LA Q. Producto obtenido por la maduración de la cuajada de la leche", 'CONTIENE LA Q. Encendedor antiguo de bolsillo']},
    { letter: "r", answer: ["raton", 'rafaga'], round: 0, status: 0, question: ["CON LA R. Roedor", 'CON LA R. Viento fuerte, resentido y de corta duración']},
    { letter: "s", answer: ["stackoverflow", 'simple'],  round: 0, status: 0, question: ["CON LA S. Comunidad salvadora de todo desarrollador informático", 'CON LA S. Se aplica a lo que no tiene complicación']},
    { letter: "t", answer: ["terminator", 'trece'],  round: 0, status: 0, question: ["CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984", 'CON LA T. Número cardinal equivalente a 10 + 3']},
    { letter: "u", answer: ["unamuno", 'uderzo'],  round: 0, status: 0, question: ["CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914", 'CON LA U. Apellido del dibujante y guionista francés autor de la serie Asterix']},
    { letter: "v", answer: ["vikingos", 'verde'],  round: 0, status: 0, question: ["CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa", 'CON LA V. Se aplica el color perfectamente al de la hierba fresca o la esmeralda']},
    { letter: "w", answer: ["sandwich", 'darwin'],  round: 0, status: 0, question: ["CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso", 'CONTIENE LA W. Creador de la teoría de la evolución.']},
    { letter: "x", answer: ["botox", 'exegesis'],  round: 0, status: 0, question: ["CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", 'CONTIENE LA X. Explicación o interpretación particularmente de los libros de la Biblia']},
    { letter: "y", answer: ["peyote", 'moncayo'],  round: 0, status: 0, question: ["CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos", 'CONTIENE LA Y. Nombre de la montaña más alta del sistema ibérico']},
    { letter: "z", answer: ["zen", 'zodiacal'],  round: 0, status: 0, question: ["CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional", 'CON LA Z. Perteneciente o relativo al zoodíaco']},
]
// Variables para guardar al usuario
var name;
var nameV;
var users = [];
var verify;
// Constructor para generar un objeto con cada usuario
var listUsers = function (name, hits, misses, empty) {
    this.configurable = true;
    this.enumerable = true;
    this.name = name;
    this.hits = hits;
    this.misses = misses;
    this.empty = empty;
    // Método para imprimir el panel del usuario
    this.resume = function () {
        console.log(`
¡Hola ${this.name}!
El resumen de tu partida:
  --> ${this.hits} Aciertos
  --> ${this.misses} Errores
  --> ${this.empty} Preguntas sin responder
    `);
    }
    this.writable = true;
}
// Contador para memorizar a los usuarios dentro del objeto
var countUser = 0;
// Verificador para que el campo de usuario no lo dejen vacío o por si le dan a cancelar
function verificationTxt (txt) {
    if (txt == null || txt == 'null') {
        console.log('Acabas de pulsar [CANCELAR]\nEntendemos que te quieres ir. Tu usuario no ha sido registrado.');
        verify = null;
        bye ();
    } else if (txt == '') {
        console.log('Has dejado la casilla vacía, prueba de nuevo.');
        verify = false;
    } else {
        var v = txt.toUpperCase();
        verify = true;
        return v;
    }
}
// En el caso que clicken a cancelar
function bye () {
    console.log('¡Hasta la próxima! Si quieres comenzar, llama a la función --> pasapalabra');
    // Para borrar el nombre del jugador en cuestión
    users.pop();
}
// Comienza el juego
function pasapalabra () {
    name = prompt('Necesitamos tú nombre para grabar tu puntuación. Dinos tú nombre: ')
    // Verificamos el nombre
    nameV = verificationTxt (name);
    // Lo guardamos en el objeto:
    if (verify) {
        users[countUser] = new listUsers (nameV, 0, 0, 0);
    // Wellcome
        console.log(`
¡Hola ${nameV}! Tú cuenta de usuario ha sido creada con éxito, sigue las instrucciones y comienza el juego
        `)
        console.log(`
Para comenzar el juego llama a la función --> start. Antes ten en cuenta:
  --> Responde cada pregunta con una palabra sin espacios. Si hay espacios contará como error. No hay respuestas que contengan espacios.
  --> Si no la sabes escribe "PASAPALABRA" y pasarás a la siguiente pregunta.
  --> Gana quién tenga menos errores.
  --> Al juego le da igual si utilizas mayus o minus. Preferiblemente minúsculas.
  --> No utilizar acentos.
  --> Tienes dos vueltas para completar el rosco.
  --> Si escribes 'fin', el juego termina, esté como esté. Los resultados suben a tu marcador.
  --> El juego termina si has completado dos vueltas o el rosco.
  --> Cada pregunta acertada suma 1 punto.
  --> Si pulsas [CALCELAR] el rosco se cancela. Aquí no ha pasado nada.

¡SUERTE!
        `);
        // Una vez presentados comenzamos el juego
        start ();
    } else if (verify == null) {
        // En el caso que aprieten cancelar
        bye ();
    }
}

var countAnswer = 0;
var countRound = 0;
var answer;
var answerV;
var answerMin;
var matches;
var num;
// generador de número para determinar la pregunta respuesta
function numbersGenerator () {
    return Math.round(Math.random() * (1 - 0) + 0);
}
// función que da inicio al juego
function start () {
    countRound = 2;
    countAnswer = 0;
    // asignamos a round la pregunta y respuesta que otorgará en la siguiente ronda de forma aleatoria
    for (let x in questions) {
        num = numbersGenerator ();
        questions[x].round = num;
    }
    getStart ();
}

function getStart () {    
    var ok;
    // Verificamos que la pregunta esté respondida a través del status
    for (let x in questions) {
        if (questions[x].status == 0) {
            ok = false
        }
    }
    // Verificamos que el contador haya llegado a 27, una vez allí damos la vuelta y comenzamos de cero
    if (countAnswer === 27) {
        countAnswer = 0;
        countRound--;
        if (countRound == 0) {
            console.log(`Fin del juego!`);
        } else if (countRound > 1) {
            console.log(`¡Vuelta completada! Te quedan ${countRound}`);
        } else {
            console.log(`¡Vuelta completada! Es tu última oportunidad de responder.`);
        }
    }
    // Pillamos la signación para las preguntas y respuestas
    var qNum = questions[countAnswer].round;
    // Para iniciar se tienen que cumplir dos variable: que la pregunta no esté respondida y que la ronda no sea 0
    if (ok == false && countRound !== 0) {
        if (questions[countAnswer].status == 0) {
            // Lector de preguntar
            answer = prompt(questions[countAnswer].question[qNum]);
            // verificamos que no dejen la pregunta en blanco
            verificationTxt (answer);
            // Verificamos que la respuesta sea correcta
            if (verify) {
                // convertimos la respuesta en minúsculas y quitamos espacios
                answerV = (answer.trim()).toLowerCase();
                // Respuesta correcta
                if (answerV === questions[countAnswer].answer[qNum]) {
                    questions[countAnswer].status = 1;
                    console.log(`${answer.toUpperCase()} es la respuesta CORRECTA a la pregunta: ${questions[countAnswer].question[qNum]} efectivamente es ${questions[countAnswer].answer[qNum]}. ¡Vamos a por la siguiente!`)
                    countAnswer++;
                    getStart();
                // Pasapalabra
                } else if (answerV === 'pasapalabra') {
                    console.log(`¡PASAPALABRA!`);
                    countAnswer++;
                    getStart();
                // Salida
                } else if (answerV === 'fin') {
                    theEnd ();
                } else {
                    // Respuesta incorrecta
                    questions[countAnswer].status = 2;
                    console.log(`¡Ooooooh lo sentimos! La respuesta ${answer.toUpperCase()} NO ES CORRECTA. La respuesta correcta a la pregunta: ${questions[countAnswer].question[qNum]} es ${(questions[countAnswer].answer[qNum]).toUpperCase()}`)
                    countAnswer++;
                    getStart();
                }
            // En el caso de no estar verificada
            } else if (verify == false) {
                getStart ();
            // En el caso de haber completado todas las preguntas
            } else if (countAnswer < questions.length) {
                countAnswer = 0;
            }
        // en el caso que la pregunta esté contestada, pasamos a la siguiente
        } else {
            countAnswer++;
            getStart();
        }
    // En el caso que el juego haya terminado
    } else {
        theEnd ()
    }
}

function theEnd () {
    // Recopilamos todos los resultado para el jugador
    users[countUser].hits = getHits ();
    users[countUser].misses = getMisses ();
    users[countUser].empty = getEmpty ();
    users[countUser].resume();
    console.log(`Si quieres jugar de nuevo llama a la función --> pasapalabra`);
    // Ordenamos los resultados para imprimir el ranking
    users.sort(function(a, b) {
        return b.hits - a.hits;
    })
    // El ranking
    for (let x in users) {
        console.log(`
RANKING de participantes (por aciertos):
${x}. ${users[x].name} --> ${users[x].hits} aciertos`);
    }

    // Reseteo del status para la próxima partida
    for (let x in questions) {
        questions[x].status = 0;
    }
    // Preparamos para el siguiente jugador
    countUser++;
}

// Tres funciones para calcular los resultados: Aciertos, Erroes y Pasapalabras
function getHits () {
    let result = 0;
    for (let x in questions) {
        if (questions[x].status == 1) {
            result++
        }
    }
    return result;
}
function getMisses () {
    let result = 0;
    for (let x in questions) {
        if (questions[x].status == 2) {
            result++
        }
    }
    return result;
}
function getEmpty () {
    let result = 0;
    for (let x in questions) {
        if (questions[x].status == 0) {
            result++
        }
    }
    return result;
}