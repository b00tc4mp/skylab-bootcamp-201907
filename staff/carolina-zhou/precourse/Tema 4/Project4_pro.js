// PROYECTO 4: Pasapalabra!

let questions1 = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una accion temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
];

let questions2= [
  { letter: "a", answer: "anecdota", status: 0, question: "CON LA A. Relato breve de un acontecimiento extraño, curioso o divertido, generalmente ocurrido a la persona que lo cuenta."},
  { letter: "b", answer: "bollo", status: 0, question: "CON LA B. Pasta dulce y esponjosa, hecha con harina, huevos, levadura y otros ingredientes, que puede tener distintas formas."},
  { letter: "c", answer: "cascada", status: 0, question: "CON LA C. Corriente de agua que cae desde cierta altura a causa de un brusco desnivel en su cauce, especialmente en un rio."},
  { letter: "d", answer: "daga", status: 0, question: "CON LA D. Arma blanca de hoja corta, ancha y puntiaguda, parecida a la espada pero de menor tamaño."},
  { letter: "e", answer: "espiral", status: 0, question: "CON LA E. Línea curva que describe varias vueltas alrededor de un punto, alejándose cada vez más de él."},
  { letter: "f", answer: "putrefacto", status: 0, question: "CONTIENE LA F. Que está descompuesto o podrido por la acción de diversos factores y determinados microorganismos."},
  { letter: "g", answer: "garrulo", status: 0, question: "CON LA G. Que se comporta de manera ruda, tosca o grosera."},
  { letter: "h", answer: "rechoncho", status: 0, question: "CONTIENE LA H. Persona o animal que es grueso y de poca altura."},
  { letter: "i", answer: "interestelar", status: 0, question: "CON LA I. Que está en el espacio existente entre dos astros, o que tiene relación con él."},
  { letter: "j", answer: "jalapeño", status: 0, question: "CON LA J. Chile picante de unos 5 cm de largo, carnoso y de punta redonda, que se usa para condimentar ciertos guisos."},
  { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una accin temeraria"},
  { letter: "l", answer: "homunculo", status: 0, question: "CONTIENE LA L. Hombre pequeño y débil."},
  { letter: "m", answer: "martir", status: 0, question: "CON LA M. Persona que sufre o muere por defender su religión o sus ideales."},
  { letter: "n", answer: "neon", status: 0, question: "CON LA N. Tubo fluorescente que produce una luz brillante"},
  { letter: "ñ", answer: "teñir", status: 0, question: "CONTIENE LA Ñ. Dar a una cosa un color distinto del que tiene."},
  { letter: "o", answer: "omnisciente", status: 0, question: "CON LA O. Que conoce todas las cosas reales y posibles."},
  { letter: "p", answer: "alpargata", status: 0, question: "CONTIENE LA P. Calzado de lona, con suela de esparto, cáñamo o goma, que se sujeta al pie por presión o con unas cintas que se atan al tobillo."},
  { letter: "q", answer: "quebradizo", status: 0, question: "CON LA Q. Que se puede romper fácilmente."},
  { letter: "r", answer: "rinoplastia", status: 0, question: "CON LA R. Operación quirúrgica para restaurar la nariz."},
  { letter: "s", answer: "desaliño", status: 0, question: "CONTIENE LA S. Falta de cuidado en la forma de vestir y en el aseo personal."},
  { letter: "t", answer: "tabardillor", status: 0, question: "CON LA T. Persona alocada, bulliciosa y molesta."},
  { letter: "u", answer: "huraño", status: 0, question: "CONTIENE LA U. Persona que rehúye el trato de otras personas y rechaza las atenciones y muestras de cariño."},
  { letter: "v", answer: "vasallaje", status: 0, question: "CON LA V. Tributo que el vasallo pagaba a su señor o servicio que le prestaba según este vínculo."},
  { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamn y queso"},
  { letter: "x", answer: "climax", status: 0, question: "CONTIENE LA X. Punto culminante o de mayor satisfacción de la excitación sexual en las zonas erógenas o sexuales."},
  { letter: "y", answer: "buey", status: 0, question: "CONTIENE LA Y. Toro castrado, que se utiliza como animal de tiro y del cual se aprovecha su carne."},
  { letter: "z", answer: "pazguato", status: 0, question: "CONTIENE LA Z. Que es tonto o tiene poca rapidez mental."},
]

let questions3= [
  { letter: "a", answer: "agenda", status: 0, question: "CON LA A. Libro o cuaderno en el que se apunta para no olvidarlo aquello que se ha de hacer."},
  { letter: "b", answer: "bonanza", status: 0, question: "CON LA B. Prosperidad."},
  { letter: "c", answer: "caracol", status: 0, question: "CON LA C. Nombre del molusco gasterópodo terrestre de corte en espiral cuya carne puede comerse."},
  { letter: "d", answer: "dormir", status: 0, question: "CON LA D. Estar en aquel reposo que consiste en la inacción o suspensión de los sentidos y de todo movimiento voluntarios."},
  { letter: "e", answer: "entrecot", status: 0, question: "CON LA E. Trozo de carne sacado de entre costilla y costilla de la res."},
  { letter: "f", answer: "farhadi", status: 0, question: "CON LA F. Apellido del cineasta que dirigó la película El Viajante que obtuvo el oscar a la mejor película de habla no inglesa en 2017."},
  { letter: "g", answer: "gorgorito", status: 0, question: "CON LA G. Coloquialmente quiebro que se hace con la voz con la garganta al cantar."},
  { letter: "h", answer: "hidroavion", status: 0, question: "CON LA H. Avión que lleva en lugar de ruedas uno o cuatro flotadores para posarse sobre el agua."},
  { letter: "i", answer: "inapetencia", status: 0, question: "CON LA I. Falta de gana de comer."},
  { letter: "j", answer: "jardineria", status: 0, question: "CON LA J. Arte y oficio del jardinero."},
  { letter: "k", answer: "king kong", status: 0, question: "CON LA K. Gorila gigantesco que llegó a Nueva York."},
  { letter: "l", answer: "lobera", status: 0, question: "CON LA L. Guarida de lobos."},
  { letter: "m", answer: "mentira", status: 0, question: "CON LA M. Cosa que se utiliza por el camino que no es verdad con la intención de que sea creída."},
  { letter: "n", answer: "nativo", status: 0, question: "CON LA N. Se aplica al que ha nacido en el lugar de que se trata."},
  { letter: "ñ", answer: "hogaño", status: 0, question: "CONTIENE LA Ñ. De tiempo que indica en esta época diferencia de antaño en época inferior. "},
  { letter: "o", answer: "organo", status: 0, question: "CON LA O. De las partes del pulpo, animal o vegetal que ejercen una función."},
  { letter: "p", answer: "plotino", status: 0, question: "CON LA P.Filósofo romano máximo representante de la escuela neoplatónica y discípulo de Ammonio Sacas de Alejandría."},
  { letter: "q", answer: "chisquero", status: 0, question: "CON LA Q. Encendedor antiguo de bolsillo."},
  { letter: "r", answer: "rafaga", status: 0, question: "CON LA R. Viento fuerte, resentido y de corta duración."},
  { letter: "s", answer: "simple", status: 0, question: "CON LA S. Se aplica a lo que no tiene complicación."},
  { letter: "t", answer: "trece", status: 0, question: "CON LA T. Número cardinal equivalente a 10 + 3."},
  { letter: "u", answer: "uderzo", status: 0, question: "CON LA U. Apellido del dibujante y guionista francés autor de la serie Asterix."},
  { letter: "v", answer: "verde", status: 0, question: "CON LA V. Se aplica el color perfectamente al de la hierba fresca o la esmeralda."},
  { letter: "w", answer: "windsurf", status: 0, question: "CONTIENE LA W. Deporte que se practica en el mar, de pie sobre una tabla alargada que lleva una vela triangular."},
  { letter: "x", answer: "exegesis", status: 0, question: "CONTIENE LA X. Explicación o interpretación particularmente de los libros de la Biblia."},
  { letter: "y", answer: "moncayo", status: 0, question: "CONTIENE LA Y. Nombre de la montaña más alta del sistema ibérico."},
  { letter: "z", answer: "zoodiacal", status: 0, question: "CON LA Z. Perteneciente o relativo al zoodíaco."},
]

let listaPreguntas = [questions1, questions2, questions3];
let preguntas = [];
let userName;
let users = [
    { name: 'Sarah', points: 17},
    { name: 'Mark', points: 6},
    { name: 'Pauline', points: 23}
]; 

let testStatus = 0;
let actual = 0;
let respuesta;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;



function userIntro() {
  let intro = prompt("¡Bienvenido/a a Skylab Pasapalabra! ¿Cómo te llamas?");
  if (intro === "") {
      console.log("Has introducido un nombre vacío. ¡Prueba de nuevo!");
      userIntro()
  } else if (intro === null) {
      console.log("¡Hasta otra! ¡Vuelve pronto!");
  } else {
      userName = intro;
      console.log("Hola, " + userName + ". ¡Comenzamos!");
      pasapalabra();
  }
};
userIntro();




function pasapalabra() {

    for (let i = 0; i < questions1.length; i++) {
        preguntas.push(listaPreguntas[Math.floor(Math.random() * 3)][i]);
    }

    
    function check() {
      checkStatus();
      if (testStatus > 0) {
        question();
      } else {
        salida();
      }
    };
    check();


    function checkStatus() {
        testStatus = 0;
        preguntas.forEach(function(obj) {
          if (obj.status !== 1 && obj.status !== 2) {
            testStatus++;
          }
        });
    };
    

    // status 0: sin contestar
    // status 1: correcto
    // status 2: incorrecto
    // status 3: pasapalabra

    function question() {
    
        if (preguntas[actual].status === 0 || preguntas[actual].status === 3) {
          console.log(preguntas[actual].question);
          respuesta = prompt(preguntas[actual].question);
          questionContinue();
        } else {
          actual++;
          check();
        }
    
        function questionContinue() {
          if (respuesta === null || respuesta.toLowerCase() === 'end') {
            salida();
          } else if (respuesta === '') {
            alert('Introduce tu respuesta');
            check();
          } else if (respuesta.toLowerCase() === 'pasapalabra') {
            alert('¡Pasapalabra!');
            if (preguntas[actual].status !== 3) {
              preguntas[actual].status = 3;
              actual++;
            }
            if (actual < preguntas.length) {
              check();
            } else {
              actual = 0;
              check();
            }
          } else if (respuesta.toLowerCase() === preguntas[actual].answer) {
            alert(`¡CORRECTO!`);
            respuestasCorrectas++;
            preguntas[actual].status = 1;
            actual++;
            if (actual < preguntas.length) {
              check();
            } else {
              actual = 0;
              check();
            }
          } else if (respuesta.toLowerCase() !== preguntas[actual].answer) {
            alert(`¡INCORRECTO!`);
            respuestasIncorrectas++;
            preguntas[actual].status = 2;
            actual++;
            if (actual < preguntas.length) {
              check();
            } else {
              actual = 0;
              check();
            }
          }
        };
    };
    

    function salida() {
        console.clear();
        console.log(`Hasta otra, ` + userName + '. ¡Vuelve pronto!');
        checkStatus();
        if (testStatus > 0) {
          console.log('Respuestas correctas: ' + respuestasCorrectas + '.');
        } else {
          console.clear();
          console.log('¡Has acabado el juego!');
          console.log('Respuestas correctas: ' + respuestasCorrectas + '.');
          console.log('Respuestas incorrectas: ' + respuestasIncorrectas + '.');
        }
    
        users.push({ name: userName, points: respuestasCorrectas });
        ranking();
    };
    
    
    function ranking() {
        users.sort(function(a, b) {
          return b.points - a.points;
        });

        console.log('--- Pasapalabra: RANKING ---');
        for (let j = 0; j <= users.length; j++) {
          console.log('Puesto ' + (users.indexOf(users[j])+1) + ': ' + users[j].name + ' con ' +  users[j].points + ' puntos.'
          );
        }
    };


};

