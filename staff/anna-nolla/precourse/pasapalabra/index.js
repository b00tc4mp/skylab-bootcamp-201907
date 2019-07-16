
/* Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra 
y el usuario deberá adivinar qué palabra estamos tratando, por ejemplo:

    '>>>'With the letter "M", Capital of Spain, located in the center of the country.
    '>>>' "Madrid"
    '>>>'Correct, you have 1 Point!

Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego,
y habiendo respondido todas las letras, 
deberá indicarle al usuario cuantas letras ha fallado y cuántas ha acertado. 
Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender 
que en ese momento, el usuario no responderá esa pregunta, y no estará acertada ni fallada,
la dejará para la siguiente ronda.
El juego deberá, cuando finalice, mostrar un ranking de usuarios con el nombre 
y ordenados por cantidad de letras acertadas.*/

var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "Con la A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "Con la B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "Con la C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "Con la D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "Con la E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "Con la F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "Con la G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "Con la H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "Con la I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "Con la J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "Con la K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "Con la L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "Con la M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "Con la N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "Contiene la Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "Con la O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "Con la P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "Con la Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "Con la R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "Con la S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "Con la T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "Con la U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "Con la V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "Contiene la W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", status: 0, question: "Contiene la X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "Contiene la Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "Con la Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]

var acertado = 0;
var fallado = 0;
var usuario = {};
var respuesta = [];
var players = [];
var player1 = new player ();

function player (name, acertado) {
    this.name = name;
    this.acertado = acertado;
};



function pasaPalabra(){

    puntuacion();
    preguntas();
    resultado();
    rank();

    function puntuacion (){

    
    player1.name = prompt("Buenos días Usuario seria tan amable de darnos su nombre ??");

    console.log(
        "Buenos dias " + player1.name + " !!" + "\n" +
        "\n" +
        "Antes de empezar le explicaremos el sistema de puntos:" + "\n" +
        " > Cada letra acertada es un punto." + "\n" +
        " > Si fallas una palabra no volvera a repetirse." + "\n" +
        " > Si dices pasapalabra, la letra no contará como fallada y quedará para el siguiente turno.");
    
    alert("Empezamos ! ! ");
    };
    

    function preguntas(){
        for(i = 0; i < questions.length; i++){
            if (questions[i].status === 0 ){
                respuesta = prompt(questions[i].question);

                if ( respuesta.toLowerCase() === "end"){
                    return;
                }
                if ( respuesta.toLowerCase() === "pasapalabra" ){
                    continue;
                }
                if ( respuesta.toLowerCase() === questions[i].answer ){
                    questions[i].status = 1;
                    alert("Correcto !");
                    continue;           
                }
                if ( respuesta.toLowerCase() !== questions[i].answer ){
                    questions[i].status = 2;
                    alert("Fallastes ! ");
                    continue;
                }
            }
        }
        if (questions.some(x => x.status === 0)){
            preguntas();
        }
    };
    
    function resultado(){
        var total = questions.length;

        acertado = questions.filter(function(question) {
            return question.status === 1;
        });
        fallado = questions.filter(function(question) {
            return question.status === 2;
        });
        
        console.log("Ha acertado: " + acertado.length + " ha fallado: " + fallado.length 
        + " de " + total + " preguntas!!");
    };
    
    function rank(){

        if (acertado.length + fallado.length === questions.length){
            player1.acertado = acertado.length;

            function compare (a, b) {
                if (a.acertado > b.acertado) return 1;
                if (a.acertado < b.acertado) return -1;
                return 0;
            }

            players.push(player1);
            players.sort(compare);
            console.log("Ranking:");
            players.forEach( players => (console.log(players.name + " tiene una puntuacion de " 
            + player1.acertado + " aciertos.")));
        
        var newGame = null;
        newGame = confirm("Quiere jugar una nueva partida??");
            if (newGame == true){
                for(i = 0; i < questions.length; i++){
                    questions[i].status = 0;
                }
                alert("Alla vamos de new ! !");
                pasaPalabra();
            }
            else { alert("Que tenga buen dia");}
        }
    };
}
pasaPalabra();