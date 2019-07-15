/***** PASAPALABRA *******/

function startGame(dictionary) {

   var start = confirm('Bienvenido/a a PASAPLABRA. Estás listo/a para empezar?');
   if (!start) {
       alert('Otra vez será. Nos vemos!');
       return false;
   }

   var questions = []
   var questions = randomizeDictionary(dictionary);

   // Keep looping until all letters are answered or user forces game end 
   do {
       // Loop through all questions. If true is returned, game is over
       var endGame = roundLoop(questions)
       if (endGame) {
           return;
       }
       // Check if there's any question left to be answered (status === 0), otherwise start a new round
       var allAnswered = questions.every(function(question) {
           return question.status;
       });
   } while (!allAnswered)

   // Ask for ranking only if game is over because all questions were answered
   if (allAnswered) {
       var summary = getSummary(questions)
       var correctAnswers = summary[0]
       updateShowRanking(correctAnswers);
   };

   // Ask to keep playing or end the game
   var keepPlaying = confirm('¿Te gustaría seguir jugando?');
   if (keepPlaying) {
       startGame(dictionary);
   } else {
       alert('Hasta la próxima!')
   };
}


function roundLoop(questions) {
/* Ask questions from A to Z until all letters are answered or user forces game end */

    var endGame = questions.some(function(question) {

        // Skip question if already answered
        if (question.status !== 0) {
            return false;
        }

        // No input
        do {
            var answer = prompt(question.question);
        } while (answer === '');

        // Cancel
        if (answer === null) {
            alert('Otra vez será. Nos vemos!');
            return true;
        };

        // Skip
        if (answer.toLowerCase() === 'pasapalabra') {
            return false;
        };

        // End
        if (answer.toLowerCase() === 'end') {
            var summary = getSummary(questions)
            alert(`Juego terminado por el usuario.\n\nAcertadas: ${summary[0]}\nFalladas: ${summary[1]}\nPendientes: ${summary[2]}\nTotal: ${summary[3]}`)
            alert(`Hasta la próxima!`)
            return true;
        };

        // Answer might be a string or an array of strings if multiple possible answers (e.g. masculino/femenino)
        if (typeof question.answer === 'object') {
            var matched = question.answer.some(function(option) {
                return answer.toLowerCase() === option.toLowerCase()
            });
        } else {
            var matched = answer.toLowerCase() === question.answer.toLowerCase() ? true : false;
        }

        if (matched) {
            question.status = 1;
            var summary = getSummary(questions)
            alert(`Respuesta correcta.\n\nAcertadas: ${summary[0]}\nFalladas: ${summary[1]}\nPendientes: ${summary[2]}\nTotal: ${summary[3]}`)
            return false;
        } else {
            question.status = 2;
            var summary = getSummary(questions)
            alert(`Respuesta incorrecta.\n\nAcertadas: ${summary[0]}\nFalladas: ${summary[1]}\nPendientes: ${summary[2]}\nTotal: ${summary[3]}`)
            return false;
        }
   });
   return endGame
}


function randomizeDictionary(dictionary) {
/* Returns array of objects with only one question per letter from a dictionary that can have multiple */

    // Make a copy of dictionary to avoid shallow copy (referencing) to original objects
    var newDict = JSON.parse(JSON.stringify(dictionary))

    var gameDict =  newDict.map(function(questions) {
        var randomNum = Math.floor(Math.random() * questions.length)
        return questions[randomNum]
    })

    return gameDict
}


function getSummary(questions) {
/* Returns a count of total/unanswered questions and correct/incorrect answers */

    var total = questions.length

    var unanswered = questions.filter(function(question) {
        return question.status === 0;
    });
    var correct = questions.filter(function(question) {
        return question.status === 1;
    });
    var incorrect = questions.filter(function(question) {
        return question.status === 2;
    });

    return [correct.length, incorrect.length, unanswered.length, total]
}


function updateShowRanking(correctAnswers) {
/* Update users and scores in ranking object */

    do {
        var username = prompt(`Añade tu nombre al ranking.`);
        if (username === null) return false;
    } while (username === '');

    // If username is already in ranking, update score only if it is higher than previous one
    var match = rankings.some(function(entry) {
        if (entry.username.toLowerCase() === username.toLowerCase()) {
            if (parseInt(entry.score) < parseInt(correctAnswers)) {
                entry.score = parseInt(correctAnswers);
            }
            return true;
        }
    })

    // Otherwise, add it to ranking
    if (!match) {
        rankings.push({username: username, score: parseInt(correctAnswers)});
    }

    // Sort rankings by score desc
    rankings.sort(function(a,b) {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
    })

    // Display it in order and assign position with idx
    rankingText = ``;
    rankings.forEach(function(entry, idx) {
        rankingText += `${idx+1}. ${entry.username}:  ${entry.score} letras acertadas.\n`;
    });
    alert(`Ranking Global:\n\n${rankingText}\n\n`);
};

var dictionary = [
    [
        {letter:'a', question:`Con la A. Que no es propio de la época de la que se trata.`, answer:['Anacrónico', 'Anacrónica'], status:0},
        {letter:'a', question:'Con la A. Poner algo en un rincón o lugar retirado.', answer:'Arrinconar', status:0},
        {letter:'a', question:'Con la A. Persona que interpreta un papel en una obra teatral, cinematográfica, radiofónica o televisiva.', answer:['Actor', 'Actriz'], status:0}
    ],
    [
        {letter:'b', question:'Con la B. Conjunto de bollos de diversas clases que se ofrecen para la venta o el consumo.', answer:'Bollería', status:0},
        {letter:'b', question:'Con la B. Que ocurre dos veces al año.', answer:'Bianual', status:0},
        {letter:'b', question:'Con la B. Bebida que se hace batiendo helado, leche u otros ingredientes.', answer:'Batido', status:0}
    ],
    [
        {letter:'c', question:'Con la C. Que tiene un precio alto o más alto de lo normal.', answer:['Caro', 'Cara'], status:0},
        {letter:'c', question:'Con la C. Persona que acompaña a otra y come y vive con ella.', answer:'Camarada', status:0},
        {letter:'c', question:'Con la C. Repetición molesta e importuna de algo.', answer:'Cantinela', status:0}
    ],
    [
        {letter:'d', question:'Con la D. Deponer y privar del reino a alguien, echarlo del trono.', answer:'Destronar', status:0},
        {letter:'d', question:'Con la D. Cuidado y actividad en ejecutar algo.', answer:'Diligencia', status:0},
        {letter:'d', question:'Con la D. Encadenamiento de los sucesos considerado como necesario y fatal.', answer:'Destino', status:0}
    ],
    [
        {letter:'e', question:'Con la E. Encargar a alguien que haga algo o que cuide de algo o de alguien.', answer:'Encomendar', status:0},
        {letter:'e', question:'Con la E. Dicho de un sonido: Agudo, desapacible y chirriante.', answer:'Estridente', status:0},
        {letter:'e', question:'Con la E. Conjunto de actores que constituyen una compañía teatral o que actúan en una obra.', answer:'Elenco', status:0}
    ],
    [
        {letter:'f', question:'Con la F. Muy delgado, con aspecto de pasar hambre.', answer:['Famélico', 'Famélica'], status:0},
        {letter:'f', question:'Con la F. Apellido del médico neurólogo austríaco padre del psicoanálisis.', answer:'Freud', status:0},
        {letter:'f', question:'Con la F. Caja o andas en que se lleva a enterrar a los difuntos.', answer:'Féretro', status:0}
    ],
    [
        {letter:'g', question:'Con la G. Caverna natural o artificial.', answer:'Gruta', status:0},
        {letter:'g', question:'Con la G. Que proporciona satisfacción.', answer:'Gratificante', status:0},
        {letter:'g', question:'Con la G. Mano o pie del animal, cuando están armados de uñas corvas, fuertes y agudas, como en el león y el águila.', answer:'Garra', status:0}
    ],
    [
        {letter:'h', question:'Con la H. Dar a alguien muestras de afecto o rendimiento con palabras o acciones que puedan serle gratas.', answer:'Halagar', status:0},
        {letter:'h', question:'Con la H. Que despide hedor.', answer:['Hediondo', 'Hedionda'], status:0},
        {letter:'h', question:'Con la H. Dicho de una persona: Vagabunda y ociosa, que no quiere trabajar..', answer:['Holgazán', 'Holgazana'], status:0}
    ],
    [
        {letter:'i', question:'Con la I. Dicho de una sentencia o de un fallo: Que no se puede apelar.', answer:'Inapelable', status:0},
        {letter:'i', question:'Con la I. Rasgos, temperamento o carácter distintivos y propios de un individuo o de una colectividad.', answer:'Idiosincrasia', status:0},
        {letter:'i', question:'Con la I. Organismo que desempeña una función de interés público, especialmente benéfico o docente.', answer:'Institución', status:0},
    ],
    [
        {letter:'j', question:'Con la J. Hombre alevoso, traidor.', answer:'Judas', status:0},
        {letter:'j', question:'Con la J. Animar con palmadas, ademanes y expresiones a los que bailan, cantan.', answer:'Jalear', status:0},
        {letter:'j', question:'con la J. Hebreo, que profesa la ley de Moisés.', answer:['Judío', 'Judía'], status:0}
    ],
    [
        {letter:'k', question:'Con la K. Persona que realiza una acción temeraria con propósito suicida o con riesgo de su vida.', answer:'Kamikaze', status:0},
        {letter:'k', question:'Con la K. Mamífero marsupial arborícola parecido a un oso pequeño, propio de los eucaliptales australianos.', answer:'Koala', status:0},
        {letter:'k', question:'Con la K. Natural de Kuwait, país de Asia, o de su capital.', answer:'Kuwaití', status:0},
    ],
    [
        {letter:'l', question:'Con la L. Alabanza afectada para ganar la voluntad de alguien.', answer:'Lisonja', status:0},
        {letter:'l', question:'Con la L. Persona o cosa que entorpece o detiene algo.', answer:'Lastre', status:0},
        {letter:'l', question:'Con la L. Lastimar, golpear, magullar, herir.', answer:'Lacerar', status:0}
    ],
        [
        {letter:'m', question:'Con la M. Herramienta de percusión compuesta de una cabeza, por lo común de hierro, y un mango, generalmente de madera.', answer:'Martillo', status:0},
        {letter:'m', question:'Con la M. Arte y destreza en enseñar o ejecutar algo.', answer:'Maestría', status:0},
        {letter:'m', question:'con la M. Sistema de gobierno en que los puestos de responsabilidad se adjudican en función de los méritos personales.', answer:'Meritocracia', status:0}
    ],
    [
        {letter:'n', question:'Con la N. Desmedida preferencia que algunos dan a sus parientes para las concesiones o empleos públicos.', answer:'Nepotismo', status:0},
        {letter:'n', question:'Con la N. grupo extinto de homínidos que vivió en gran parte de Europa y parte de Asia durante el Paleolítico medio.', answer:'Neandertal', status:0},
        {letter:'n', question:'Con la N. Médico y adivino francés famoso por su libro de profecías que supuestamente predicen eventos futuros.', answer:'Nostradamus', status:0},
    ],
    [
        {letter:'ñ', question:'Contiene la Ñ. Destreza, habilidad.', answer:'Maña', status:0},
        {letter:'ñ', question:'Contiene la Ñ. Dedo de tres falanges, situado en el lado exterior de la mano o del pie.', answer:'Meñique', status:0},
        {letter:'ñ', question:'Contiene la Ñ. Figura de persona, hecha generalmente de plástico, trapo o goma, que sirve de juguete o de adorno.', answer:['Muñeco', 'Muñeca'], status:0},
    ],
    [
        {letter:'o', question:'Con la O. Abundancia, riqueza y sobra de bienes.', answer:'Opulencia', status:0},
        {letter:'o', question:'Con la O. Forma de gobierno en la cual el poder político es ejercido por un grupo minoritario.', answer:'Oligarquía', status:0},
        {letter:'o', question:'Con la O. Idea inesperada, pensamiento, dicho agudo u original que ocurre a la imaginación..', answer:'Ocurrencia', status:0},
    ],
        [
        {letter:'p', question:'Con la P. Ciencia que estudia los organismos que han existido en el pasado de la Tierra a partir de sus restos fósiles.', answer:'Paleontología', status:0},
        {letter:'p', question:'Con la P. Dejar de hacer algo momentáneamente, con idea de realizarlo más adelante.', answer:'Posponer', status:0},
        {letter:'p', question:'Con la P. Cantidad que corresponde a cada partícipe en un reparto o distribución.', answer:'Porción', status:0}
    ],
    [
        {letter:'q', question:'Contiene la Q. Templo musulmán.', answer:'Mezquita', status:0},
        {letter:'q', question:'Contiene la Q. Echar mocos.', answer:'Moquear', status:0},
        {letter:'q', question:'Contiene la Q. Natural de Quebec, ciudad o provincia del Canadá.', answer:['Quebequés', 'Quebequesa'], status:0},
    ],
    [
        {letter:'r', question:'Con la R. Residuo de las cañas de la mies, que queda en la tierra después de segar.', answer:'Rastrojo', status:0},
        {letter:'r', question:'Con la R. Carcajada, risa estrepitosa y descompuesta.', answer:'Risotada', status:0},
        {letter:'r', question:'Con la R. Coloquialmente, persona tacaña.', answer:'Rata', status:0}
    ],
    [
        {letter:'s', question:'Con la S. Sumario o resumen.', answer:'Sinopsis', status:0},
        {letter:'s', question:'Con la S. Daño o deterioro que se hace en instalaciones, productos, etc., como procedimiento de lucha contra los patronos, contra el Estado o contra las fuerzas de ocupación en conflictos sociales o políticos.', answer:'Sabotaje', status:0},
        {letter:'s', question:'Con la S. Líquido espeso azucarado que se emplea en repostería y para elaborar refrescos.', answer:'Sirope', status:0}
    ],
    [
        {letter:'t', question:'Con la T. Coloquialmente, gripe.', answer:'Trancazo', status:0},
        {letter:'t', question:'Con la T. Que tiene tres fases.', answer:['Trifásico', 'Trifásica'], status:0},
        {letter:'t', question:'Con la T. Resbalón o tropezón.', answer:'Traspié', status:0}
    ],
    [
        {letter:'u', question:'Con la U. Plan, proyecto, doctrina o sistema deseables que parecen de muy difícil realización.', answer:'Utopía', status:0},
        {letter:'u', question:'Con la U. Apoderarse de una propiedad o de un derecho que legítimamente pertenece a otro, por lo general con violencia.', answer:'Usurpar', status:0},
        {letter:'u', question:'Con la U. Séptimo planeta del sistema solar.', answer:'Urano', status:0}
    ],
    [
        {letter:'v', question:'Con la V. Intensidad del sonido.', answer:'Volumen', status:0},
        {letter:'v', question:'Con la V. Persona descendiente de otra.', answer:'Vástago', status:0},
        {letter:'v', question:'Con la V. Cada uno de los vasos o conductos por donde retorna la sangre al corazón.', answer:'Vena', status:0}
    ],
    [
        {letter:'w', question:'Con la W. Reproductor portátil de casetes provisto de auriculares.', answer:'Walkman', status:0},
        {letter:'w', question:'Con la W. Sistema de conexión inalámbrica entre dispositivos electrónicos, y frecuentemente para acceso a internet.', answer:'Wifi', status:0},
        {letter:'w', question:'Con la W. Deporte que consiste en deslizarse por el agua sobre una tabla especial provista de una vela.', answer:'Windsurf', status:0}
    ],
    [
        {letter:'x', question:'Contiene la X. Dicho de una persona: Inclinada sexualmente hacia individuos de uno y otro sexo.', answer:'Bisexual', status:0},
        {letter:'x', question:'Contiene la X. Perteneciente o relativo a la quijada o mandíbula.', answer:'Maxilar', status:0},
        {letter:'x', question:'Contiene la X. Que no admite discusión.', answer:['Taxativo', 'Taxativa'], status:0},
    ],
    [
        {letter:'y', question:'Con la Y. Unidad monetaria de China.', answer:'Yuan', status:0},
        {letter:'y', question:'Contiene la Y. Regla fija a la que está sometido un fenómeno de la naturaleza.', answer:'Ley', status:0},
        {letter:'y', question:'Con la Y. Hembra del caballo.', answer:'Yegua', status:0},
    ],
    [
        {letter:'z', question:'Con la Z. Apellido del director de la trilogía Regreso al Futuro.', answer:'Zemeckis', status:0},
        {letter:'z', question:'Contiene la Z. Buscar o perseguir aves, fieras y otras muchas clases de animales para cobrarlos o matarlos.', answer:'Cazar', status:0},
        {letter:'z', question:'Contiene la Z. Polvo de color gris claro que queda después de una combustión completa.', answer:'Ceniza', status:0}
    ],
]

var rankings = []
startGame(dictionary);