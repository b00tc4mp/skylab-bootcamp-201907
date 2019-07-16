console.log('Pasapalabra Game Tema 8!')

// Pull DOM Elements
var rosco = document.getElementById('_rosco');
var startBtn = document.getElementById('start');
var visor = document.getElementById('visorInfo');
var answerInfo = document.getElementById('answerInfo');
var scoreboard = document.getElementById('_scoreboard');
var timer = document.getElementById('timer');
var score = document.getElementById('score');

var qWords = ['word-a', 'word-b', 'word-c', 'word-d', 'word-e', 'word-f', 'word-g', 'word-h', 'word-i', 'word-j', 'word-k', 'word-l', 'word-m', 'word-n', 'word-ñ', 'word-o', 'word-p', 'word-q', 'word-r', 'word-s', 'word-t', 'word-u', 'word-v', 'word-w', 'word-x', 'word-y', 'word-z']


// Listeners
startBtn.addEventListener('click', getUser);

// Preguntas:
var questions = [
    { letter: "a", answer: ["abducir", 'agenda'], round: 0, status: 0, question: ["CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", 'CON LA A. Libro o cuaderno en el que se apunta para no olvidarlo aquello que se ha de hacer']},
    { letter: "b", answer: ["bingo", 'bonanza'],  round: 0, status: 0, question: ["CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", 'CON LA B. Periodo de tiempo para una situación mercantil: prosperidad']},
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
var users = [];

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
        visor.innerHTML = `<div class='scoreforuser'>
            <h3>¡Hola ${this.name}!</h3>
            <p>El resumen de tu partida:</p>
            <ul>
                <li>${this.hits} Aciertos</li>
                <li>${this.misses} Errores</li>
                <li>${this.empty} Preguntas sin responder</li>
            </ul>
            </div>`;
    }
    this.writable = true;
}
// Contador para memorizar a los usuarios dentro del objeto
var countUser = 0;

// En el caso que clicken a cancelar
function bye () {
    visor.innerHTML = '<p>¡Hasta la próxima!</p>';
    // Para borrar el nombre del jugador en cuestión
    users.pop();
}

// Comenzamos pidiendo el nombre
function getUser () {
    visor.innerHTML = '';

    var _form = document.createElement("FORM");
    _form.setAttribute("id", "myForm");
    _form.setAttribute("class", "myform");
    visor.appendChild(_form);

    var _label = document.createElement("LABEL");
    _label.setAttribute("for", "data");
    _label.innerHTML = 'Necesitamos tu nombre para grabar la puntuación:';
  
    var _input = document.createElement("INPUT");
    _input.setAttribute("type", "text");
    _input.setAttribute("name", "data");
    _input.setAttribute("class", "shadow");
    _input.setAttribute("placeholder", "Tu nombre");

    var _submit = document.createElement("INPUT");
    _submit.setAttribute("type", "submit");
    _submit.setAttribute("class", "orange shadow");
    _submit.setAttribute("value", "Enviar");

    var _button = document.createElement("BUTTON");
    _button.setAttribute("class", "red btnextra shadow");
    _button.setAttribute("onclick", "bye ()");
    _button.innerHTML = 'Cancelar';

    var _error = document.createElement("P");
    _error.setAttribute("id", "error");

    var myForm = document.getElementById("myForm");
    myForm.appendChild(_label);
    myForm.appendChild(_input);
    myForm.appendChild(_submit);
    visor.appendChild(_button);
    visor.appendChild(_error);

    var data = myForm.data;
    myForm.addEventListener('submit', getData);

    function getData (e) {
        e.preventDefault();
        if (data.value == '' || data.value == null) {
            error.style.display = 'block'
            error.innerHTML = '¡! Has dejado la casilla vacía, prueba de nuevo.';
        } else {
            error.style.display = 'none';
            var v = data.value.toUpperCase();
            name = v;
            // Lo guardamos en el objeto:
            start ();
        }
    }
}

// Comienza el juego
var countAnswer = 0;
var answer;
var answerV;
var answerMin;
var matches;
var num;
var wordAnswer;
var word;
var data;
var interval;


var timeleft = 150;

// Generador de número para determinar la pregunta respuesta
function numbersGenerator () {
    return Math.round(Math.random() * (1 - 0) + 0);
}
// función que da inicio al juego
function start () {
    // Creamos el usuario
    users[countUser] = new listUsers (name, 0, 0, 0);
    // Reset Answer
    countAnswer = 0;
    // Asignamos a round la pregunta y respuesta que otorgará en la siguiente ronda de forma aleatoria
    for (let x in questions) {
        num = numbersGenerator ();
        questions[x].round = num;
    }

    interval = setInterval(countdown, 1000);
    getStart ();
}

function getStart () {

    scoreboard.style.display = 'block';
    users[countUser].hits = getHits ();
    score.innerHTML = users[countUser].hits;

    var p = document.createElement("P");
    p.setAttribute("id", "question");
    visor.appendChild(p);
    
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
    }
    // Pillamos la asignación para las preguntas y respuestas
    var qNum = questions[countAnswer].round;
    // Para iniciar se tienen que cumplir dos variable: que la pregunta no esté respondida y que la ronda no sea 0
    if (ok == false) {
        if (questions[countAnswer].status == 0) {
            // Lector de preguntar
            visor.innerHTML = '';

            word = document.getElementById(qWords[countAnswer]);
            word.classList.add("active");

            var _form = document.createElement("FORM");
            _form.setAttribute("id", "myForm");
            _form.setAttribute("class", "myform");
            visor.appendChild(_form);
        
            var _label = document.createElement("LABEL");
            _label.setAttribute("for", "data");
            _label.innerHTML = questions[countAnswer].question[qNum];
          
            var _input = document.createElement("INPUT");
            _input.setAttribute("type", "text");
            _input.setAttribute("name", "data");
            _input.setAttribute("class", "shadow");
            _input.setAttribute("placeholder", "Respuesta");

            var _submit = document.createElement("INPUT");
            _submit.setAttribute("type", "submit");
            _submit.setAttribute("class", "green shadow");
            _submit.setAttribute("value", "Enviar");

            var _button = document.createElement("BUTTON");
            _button.setAttribute("id", "pasapalabra");
            _button.setAttribute("class", "orange btnextra shadow");
            _button.innerHTML = 'Pasapalabra';

            var _button2 = document.createElement("BUTTON");
            _button2.setAttribute("class", "red btnextra shadow");
            _button2.setAttribute("onclick", "theEnd ()");
            _button2.innerHTML = 'Fin';

            var _error = document.createElement("P");
            _error.setAttribute("id", "error");

            var myForm = document.getElementById("myForm");
            myForm.appendChild(_label);
            myForm.appendChild(_input);
            myForm.appendChild(_submit);
            visor.appendChild(_button);
            visor.appendChild(_button2);
            visor.appendChild(_error);

            var myForm = document.getElementById('myForm');
            var data = myForm.data;
            myForm.addEventListener('submit', getData);

            function getData (e) {
                e.preventDefault();
                if (data.value == '' || data.value == null) {
                    error.style.display = 'block'
                    error.innerHTML = '¡! Has dejado la casilla vacía, prueba de nuevo.';
                } else {
                    error.style.display = 'none';
                    answer = data.value;
                    verifyAnswer ();
                }
            }

            var pasapalabraBtn = document.getElementById('pasapalabra');
            pasapalabraBtn.addEventListener('click', pasapalabra);

            function pasapalabra () {
                error.style.display = 'none';
                answer = 'pasapalabra';
                verifyAnswer ();
            }

            function verifyAnswer () {
                word = document.getElementById(qWords[countAnswer]);

                // convertimos la respuesta en minúsculas y quitamos espacios
                answerV = (answer.trim()).toLowerCase();
                // Respuesta correcta
                if (answerV === questions[countAnswer].answer[qNum]) {
                    questions[countAnswer].status = 1;
                    word.classList.remove("active");
                    word.classList.add("green");
                    answerInfo.style.display = 'block'
                    answerInfo.innerHTML = `<p>${answer.toUpperCase()} es la respuesta <b>CORRECTA</b> a la pregunta: <i>${questions[countAnswer].question[qNum]}</i> efectivamente es ${questions[countAnswer].answer[qNum]}.<br />¡Vamos a por la siguiente!</p>`;
                    countAnswer++;
                    getStart();
                // Pasapalabra
                } else if (answerV === 'pasapalabra') {
                    word.classList.remove("active");
                    answerInfo.style.display = 'none';
                    answerInfo.innerHTML = '';
                    console.log(`¡PASAPALABRA!`);
                    countAnswer++;
                    getStart();
                    // Salida
                } else if (answerV === 'fin') {
                    theEnd ();
                } else {
                    // Respuesta incorrecta
                    word.classList.remove("active");
                    word.classList.add("red");
                    questions[countAnswer].status = 2;
                    answerInfo.style.display = 'block'
                    answerInfo.innerHTML = `<p>¡Ooooooh lo sentimos!<br />La respuesta ${answer.toUpperCase()} <b>NO ES CORRECTA</b>. La respuesta correcta a la pregunta: <i>${questions[countAnswer].question[qNum]}</i> es <b>${(questions[countAnswer].answer[qNum]).toUpperCase()}</b></p>`;
                    countAnswer++;
                    getStart();
                }
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
    // Reseteamos el div de información de respuestas
    answerInfo.style.display = 'none';
    answerInfo.innerHTML = '';
    // Paramos la cuenta atrás
    clearInterval(interval);
    // Recopilamos todos los resultado para el jugador
    users[countUser].hits = getHits ();
    users[countUser].misses = getMisses ();
    users[countUser].empty = getEmpty ();
    users[countUser].resume();
    // volver a jugar
    var _button = document.createElement("BUTTON");
    _button.setAttribute("class", "orange btnextra shadow");
    _button.setAttribute("onclick", "start ()");
    _button.innerHTML = 'Juega de nuevo';
    // nuevo usuario
    var _button2 = document.createElement("BUTTON");
    _button2.setAttribute("class", "green btnextra shadow");
    _button2.setAttribute("onclick", "getUser ()");
    _button2.innerHTML = 'Nuevo usuario';
    // ranking
    var rank = document.createElement("DIV");
    rank.setAttribute("id", "rank");

    var rankTitle = document.createElement("P");
    rankTitle.innerHTML = 'RANKING de participantes (por aciertos):';

    var rankList = document.createElement("OL");

    // Ordenamos los resultados para imprimir el ranking
    users.sort(function(a, b) {
        return b.hits - a.hits;
    })

    for (let x in users) {
        rankList.innerHTML = rankList.innerHTML + `<li>${users[x].name} --> ${users[x].hits} aciertos</li>`;
    }


    // `${1}. ${users[0].name} --> ${users[0].hits} aciertos`

    // print visor
    visor.appendChild(_button);
    visor.appendChild(_button2);
    visor.appendChild(rank);
    rank.appendChild(rankTitle);
    rank.appendChild(rankList);

    // Reseteo del status para la próxima partida
    for (let x in questions) {
        questions[x].status = 0;
    }
    // Preparamos para el siguiente jugador
    countUser++;
    scoreboard.style.display = 'none';

    for (let x in questions) {
        let y = document.getElementById(qWords[x]);
        y.classList.remove("red");
        y.classList.remove("green");
        y.classList.remove("active");
    }

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

// Cuenta atrás
function countdown () {
    if (timeleft == 0) {
        timer.innerHTML = '0';
        theEnd();
    } else {
        timeleft--;
        timer.innerHTML = timeleft;
    }
}