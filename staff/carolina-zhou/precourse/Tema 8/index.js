let letter;
let answer;

let preguntas = [
    { letter: "a", answer: ["abducir", "adular", "abeja"], status: 0, question: [("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"), ("CON LA A. Hacer o decir con intención, a veces inmoderadamente, lo que se cree que puede agradar a otro."), ("CON LA A. Insecto himenóptero, de unos quince milímetros de largo, de color pardo negruzco y vello rojizo, que vive en colonias y produce cera y miel.")] },
    { letter: "b", answer: ["bingo", "barajar", "beber"], status: 0, question: [("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"), ("CON LA B. En el juego de naipes, mezclar unos con otros antes de repartirlos"), ("CON LA B. Ingerir un líquido.")] },
    { letter: "c", answer: ["churumbel", "carta", "cantar"],  status: 0, question: [("CON LA C. Niño, crío, bebé"), ("CON LA C. Papel escrito, y ordinariamente cerrado, que una persona envía a otra para comunicarse con ella."), ("CON LA C. Producir con la voz sonidos melodiosos, formando palabras o sin formarlas.")] },
    { letter: "d", answer: ["diarrea", "docena", "danés"], status: 0, question: [("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"), ("CON LA D. Conjunto de doce unidades"), ("CON LA D. Natural de Dinamarca")] },
    { letter: "e", answer: ["ectoplasma", "eructar", "enredadera" ], status: 0, question: [("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"), ("CON LA E. Expeler con ruido por la boca los gases del estómago"), ("CON LA E. Dicho de una planta: De tallo voluble o trepador, que se enreda en las letas u otros objetos salientes.")] },
    { letter: "f", answer: ["fácil", "fundir", "fuego"], status: 0, question: [("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"), ("CON LA F. Derretir y licuar los metales, los minerales u otros cuerpos sólidos."), ("CON LA F. Fenómeno caracterizado por la emisión de calor y de luz, generalmente con llama.")] },
    { letter: "g", answer: ["galaxia", "ginebra", "guerra" ], status: 0, question: [("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"), ("CON LA G. Bebida alcohólica obtenida de semillas y aromatizada con las bayas del enebro"), ("CON LA G. Lucha armada entre dos o más naciones o entre bandos de una misma nación.")] },
    { letter: "h", answer: ["harakiri", "hacha", "hielo" ], status: 0, question: [("CON LA H. Suicidio ritual japonés por desentrañamiento"), ("CON LA H. Herramienta cortante, compuesta de una gruesa hoja de acero, con filo algo convexo, ojo para enastarla, y a veces con peto."), ("CON LA H. Agua convertida en cuerpo sólido y cristalino por un descenso suficiente de temperatura.")] },
    { letter: "i", answer: ["iglesia", "igneo", "ileso" ], status: 0, question: [("CON LA I. Templo cristiano"), ("CON LA I. De fuego o que tiene la naturaleza del fuego."), ("CON LA I. Que no ha recibido lesión o daño")] },
    { letter: "j", answer: ["jabalí", "jinete", "jaque"], status: 0, question: [("CON LA J. letiedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"), ("CON LA J. Persona diestra en la equitación"), ("CON LA J. Lance del ajedrez en que un jugador, mediante el movimiento de una pieza, amenaza directamente al rey del otro, con obligación de avisarlo")] },
    { letter: "k", answer: ["kamikaze", "karaoke", "ketchup"], status: 0, question: [("CON LA K. Persona que se juega la vida realizando una acción temeraria"), ("CON LA K. Diversión consistente en interpretar una canción sobre un fondo musical grabado, mientras se sigue la letra que aparece en una pantalla."), ("CON LA K. Salsa de tomate condimentada con vinagre, azúcar y especias.")] },
    { letter: "l", answer: ["licántropo", "lacón", "litio"], status: 0, question: [("CON LA L. Hombre lobo"), ("CON LA L. Brazuelo del cerdo."), ("CON LA L. Elemento químico metálico, alcalino, de núm. atóm. 3, muy poco denso, escaso en la corteza terrestre, donde se encuentra disperso en ciertas rocas")] },
    { letter: "m", answer: ["misántropo", "martir", "martillo"], status: 0, question: [("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"), ("CON LA M. Persona que muere o sufre grandes padecimientos en defensa de sus creencias o convicciones."), ("CON LA M. Herramienta de percusión compuesta de una cabeza, por lo común de hierro, y un mango, generalmente de madera.")] },
    { letter: "n", answer: ["necedad", "nacer", "nocivo"], status: 0, question: [("CON LA N. Demostración de poca inteligencia"), ("CON LA N. Dicho de un ser vivo: Salir del vientre materno, del huevo o de la semilla."), ("CON LA N. Dañoso, pernicioso, perjudicial.")] },
    { letter: "ñ", answer: ["señal", "ñu", "señoría"], status: 0, question: [("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."), ("CON LA Ñ. Mamífero rumiante africano de la familia de los antílopes, de color pardo grisáceo, cuya cabeza recuerda la de un toro."), ("CONTIENE LA Ñ. Tratamiento que se da a quienes corresponde por su dignidad, como jueces o parlamentarios")] },
    { letter: "o", answer: ["orco", "ortodoncia", "ornitorrinco"], status: 0, question: [("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"), ("CON LA O. Tratamiento para corregir defectos de la dentadura."), ("CON LA O. Mamífero del orden de los monotremas, del tamaño aproximadamente de un conejo, con hocico semejante al pico de un pato, pies palmeados, con el cuerpo y la cola, larga y aplanada, cubiertos de pelo gris muy fino, que vive en Australia y se alimenta de larvas, de insectos y de pececillos.")] },
    { letter: "p", answer: ["protoss", "pintauñas", "piraña"], status: 0, question: [("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"), ("CON LA P. Cosmético de laca, de secado rápido, usado para colorear las uñas y darles brillo."), ("CON LA P. Pez teleósteo de los ríos de América del Sur, de pequeño tamaño y boca armada de numerosos y afilados dientes, temido por su gran voracidad.")] },
    { letter: "q", answer: ["queso", "quirófano", "buque"], status: 0, question: [("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"), ("CON LA Q. Local convenientemente acondicionado para hacer operaciones quirúrgicas"), ("CONTIENE LA Q. Barco de gran tonelaje con cubierta o cubiertas.")] },
    { letter: "r", answer: ["raton", "rencor", "riqueza"], status: 0, question: [("CON LA R. Roedor"), ("CON LA R. Resentimiento arraigado y tenaz."), ("CON LA R. Abundancia de bienes y cosas preciosas.")] },
    { letter: "s", answer: ["stackoverflow", "sibilino", "sicario"], status: 0, question: [("CON LA S. Comunidad salvadora de todo desarrollador informático"), ("CON LA S. Misterioso u oscuro, a veces con apariencia de importante."), ("CON LA S. Asesino asalariado.")] },
    { letter: "t", answer: ["terminator", "teniente", "tortilla"], status: 0, question: [("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"), ("CON LA T. Oficial de graduación inmediatamente superior al alférez e inferior al capitán."), ("CON LA T. Alimento preparado con huevo batido, cuajado con aceite en la sartén y de forma redonda o alargada, al que a veces se añaden otros ingredientes.")] },
    { letter: "u", answer: ["unamuno", "utopia", "universal"], status: 0, question: [("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"), ("CON LA U. Plan, proyecto, doctrina o sistema deseables que parecen de muy difícil realización."), ("CON LA U. Perteneciente o relativo al universo.")] },
    { letter: "v", answer: ["vikingos", "leticela", "vino"], status: 0, question: [("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"), ("CON LA V. Enfermedad contagiosa, aguda y febril, caracterizada por una erupción parecida a la de la viruela benigna, pero cuyas vesículas supuran moderadamente."), ("CON LA V. Bebida alcohólica que se hace del zumo de las uvas exprimido, y cocido naturalmente por la fermentación.")] },
    { letter: "w", answer: ["sandwich", "wifi", "show"], status: 0, question: [("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"), ("CON LA W. Sistema de conexión inalámbrica, dentro de un área determinada, entre dispositivos electrónicos, y frecuentemente para acceso a internet."), ("CONTIENE LA W. Espectáculo de letiedades.")] },
    { letter: "x", answer: ["botox", "boxeo", "exhibir"], status: 0, question: [("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"), ("CONTIENE LA X. Deporte que consiste en la lucha de dos púgiles, con las manos enfundadas en guantes especiales y de conformidad con ciertas reglas."), ("CONTIENE LA X. Manifestar, mostrar en público.")] },
    { letter: "y", answer: ["peyote", "yuca", "yeso"], status: 0, question: [("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"), ("CON LA Y. Planta de América tropical, de la familia de las liliáceas, con tallo arborescente, cilíndrico, lleno de cicatrices, de hasta dos metros de altura, coronado por un penacho de hojas largas, gruesas, rígidas y ensiformes, que tiene flores blancas, casi globosas, colgantes de un escapo largo y central, y raíz gruesa, de la que se saca harina alimenticia, y que se cultiva en Europa como planta de adorno."), ("CON LA Y. Sulfato de calcio hidratado, de color blanco, usado en construcción y en escultura por su propiedad de endurecerse rápidamente al mezclarse con agua.")] },
    { letter: "z", answer: ["zen", "zarigueya", "zapatilla"], status: 0, question: [("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"), ("CON LA Z. Mamífero marsupial americano, trepador, de aspecto parecido a la rata, de hocico alargado, pelaje gris y cola prensil."), ("CON LA Z. Calzado cómodo y ligero, de paño, piel, etc., y con suela delgada, que se usa para estar en casa.")] },
  ]
  
  let resultado = "";
  let numPregunta = question(); 
  let contador = 0; 
  let correct = 0; 
  let incorrect = 0; 
  let suma = 0; 
  let time = 250;
  
  let text = "¡Bienvenido/a al juego Pasapalabra de Skylab Coders! Dale a START para jugar."
  document.getElementById("text").innerHTML = (text)
  
  function question() {
    return Math.round(Math.random()*2)
  };
  
  function validar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==13) {
        aceptar()
    }
  };
  
  function countdown() {
    time-=1;
    document.getElementById("time").innerHTML = (time);
    timer=setTimeout("countdown(time);", 1000);
    if (time === 0) {
        alert("¡Se ha acabado el tiempo!");
        text = "¡Se ha acabado el tiempo!";
        resultado = "Has acertado " + correct + " respuestas y has fallado " + incorrect + "."
        document.getElementById("text").innerHTML = (text)
        document.getElementById("resultado").innerHTML = (resultado)
        clearTimeout(timer)
    }
  };
  
  function start() {
    text = preguntas[contador].question[numPregunta];
    document.getElementById("text").innerHTML = (text);
    document.getElementById("time").innerHTML = (time);
    timer=setTimeout("countdown();", 1000);       
  };
  
  function aceptar() {
    answer = document.getElementById("respuesta").value;
    letter = (preguntas[contador].letter).toUpperCase();
    if (answer === preguntas[contador].answer[numPregunta]){
        preguntas[contador].status = 1
        document.getElementById(letter).style.background = "green"
        correct +=1 
        contador += 1
        suma += 1
    } else {
        preguntas[contador].status = 2
        document.getElementById(letter).style.background = "red"
        incorrect +=1
        contador += 1
        suma += 1
    }
    if (suma === preguntas.length) {
        contador = -1
        text = "¡Has completado el juego!"
        resultado = "Has acertado " + correct + " respuestas y has fallado " + incorrect + "."
        document.getElementById("text").innerHTML = (text)
        document.getElementById("resultado").innerHTML = (resultado)   
        clearTimeout(timer)
    }
    if (contador >= preguntas.length) {
        contador = 0
    }
    if (contador !== -1) {
        while (preguntas[contador].status !== 0) {
            contador += 1
            if (contador >= preguntas.length) {
                contador = 0
            }
        }
    }
    document.getElementById("respuesta").value="";
    document.getElementById("respuesta").placeholder="Respuesta";
    text = preguntas[contador].question[numPregunta];
    document.getElementById("text").innerHTML = (text);
  };
  
  function pasapalabra() {
    contador += 1;
    if (contador >= preguntas.length) {
        contador = 0
    }
    while (preguntas[contador].status !== 0) {
        contador += 1;
        if (contador >= preguntas.length) {
           contador = 0
        }
    }
    text = preguntas[contador].question[numPregunta];
    document.getElementById("text").innerHTML = (text);
    document.getElementById("respuesta").innerHTML.placeholder = "Respuesta";
  };
  
  function stop () {
    text = "Has detenido el juego.";
    resultado = "Has acertado " + correct + " respuestas y has fallado " + incorrect + ".";
    document.getElementById("text").innerHTML = (text);
    document.getElementById("resultado").innerHTML = (resultado);
    clearTimeout(timer);
    document.getElementById("start").innerHTML = "Reanudar";
  };

  function reset() {
    window.location.reload(false); 
  }