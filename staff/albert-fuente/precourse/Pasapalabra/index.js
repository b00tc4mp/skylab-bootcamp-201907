var user=1;
var points=0;

var questions = [{
    letter: "a",
    answer: "abducir",
    status: 0,
    question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"
  },
  {
    letter: "b",
    answer: "bingo",
    status: 0,
    question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"
  },
  {
    letter: "c",
    answer: "churumbel",
    status: 0,
    question: "CON LA C. Niño, crío, bebé"
  },
  {
    letter: "d",
    answer: "diarrea",
    status: 0,
    question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: 0,
    question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"
  },
  {
    letter: "f",
    answer: "facil",
    status: 0,
    question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"
  },
  {
    letter: "g",
    answer: "galaxia",
    status: 0,
    question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"
  },
  {
    letter: "h",
    answer: "harakiri",
    status: 0,
    question: "CON LA H. Suicidio ritual japonés por desentrañamiento"
  },
  {
    letter: "i",
    answer: "iglesia",
    status: 0,
    question: "CON LA I. Templo cristiano"
  },
  {
    letter: "j",
    answer: "jabali",
    status: 0,
    question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: 0,
    question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"
  },
  {
    letter: "l",
    answer: "licantropo",
    status: 0,
    question: "CON LA L. Hombre lobo"
  },
  {
    letter: "m",
    answer: "misantropo",
    status: 0,
    question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"
  },
  {
    letter: "n",
    answer: "necedad",
    status: 0,
    question: "CON LA N. Demostración de poca inteligencia"
  },
  {
    letter: "ñ",
    answer: "señal",
    status: 0,
    question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."
  },
  {
    letter: "o",
    answer: "orco",
    status: 0,
    question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"
  },
  {
    letter: "p",
    answer: "protoss",
    status: 0,
    question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"
  },
  {
    letter: "q",
    answer: "queso",
    status: 0,
    question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"
  },
  {
    letter: "r",
    answer: "raton",
    status: 0,
    question: "CON LA R. Roedor"
  },
  {
    letter: "s",
    answer: "stackoverflow",
    status: 0,
    question: "CON LA S. Comunidad salvadora de todo desarrollador informático"
  },
  {
    letter: "t",
    answer: "terminator",
    status: 0,
    question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"
  },
  {
    letter: "u",
    answer: "unamuno",
    status: 0,
    question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"
  },
  {
    letter: "v",
    answer: "vikingos",
    status: 0,
    question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"
  },
  {
    letter: "w",
    answer: "sandwich",
    status: 0,
    question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"
  },
  {
    letter: "x",
    answer: "botox",
    status: 0,
    question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"
  },
  {
    letter: "y",
    answer: "peyote",
    status: 0,
    question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"
  },
  {
    letter: "z",
    answer: "zen",
    status: 0,
    question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"
  },
];
var letters = document.getElementsByClassName("bubble");
var displayValElement = document.getElementById("question2");
var displayCorrectAnswer = document.getElementById("checkAnswer");
var bubbleCorrectAnswer = document.getElementById("correctAnswers");
var bubbleIncorrectAnswer = document.getElementById("incorrectAnswers");
var textErrores = document.getElementById("checkIfPlural");
var pluralPalabras = document.getElementById("checkIfPluralPalabras");
document.getElementById("elemToHide").style.visibility = "hidden";
document.getElementById("stop").style.visibility = "hidden";
var title = document.querySelector(".answerBox");
var displayVal = "PREGUNTA";
var questionPasapalabra = "";
var correctAnswer = "";
var bubblePlaying = "";
var questionToShow = [];
var numOfQuestion = 0;
var numOfPasapalabra = 0;
var bubblePlaying = "";
var numOfQuestion = 0;
var totalMatches = 0;
var misses = 0;
var pasapalabras = 0;
var pasapalabrasBox = [];
var questionPasapalabra = [];
var timer;



//check if answer is correct and updates the display with: green or red and saves the points:
function foo() {
  var value = document.getElementById('answer').value;
  document.getElementById('answer').value = '';

  if (numOfQuestion < 27) {
    // CHECKS THE ANSWERS IN THE NORMAL ROUND !!!!!!!!!!!!!!!!!!!!!!!!!!!1
    var bubbleTag = questions[numOfQuestion].letter.toUpperCase();
    var bubblePlaying = document.getElementById(bubbleTag);

    if (value.toLowerCase() === correctAnswer) {
      displayCorrectAnswer.innerText = "CORRECTO!";
      bubblePlaying.style.backgroundColor = "green";
      numOfQuestion += 1;
      correctAnswer = "";
      totalMatches += 1;
      points++;
      bubbleCorrectAnswer.innerText = totalMatches;
      if (totalMatches == 1) {
        pluralPalabras.innerText = "palabra";
      } else if (totalMatches > 1) {
        pluralPalabras.innerText = "palabras";
      }
      beginGame();
    } else if (value.toLowerCase() === "pasapalabra") {
      displayCorrectAnswer.innerText = "El usuario pasapalabra!";
      bubblePlaying.style.backgroundColor = "orange";
      pasapalabrasBox.push(questions[numOfQuestion]);
      numOfQuestion += 1;
      pasapalabras += 1;
      correctAnswer = "";
      beginGame();
    } else {
      displayCorrectAnswer.innerText = "INCORRECTO!";
      bubblePlaying.style.backgroundColor = "red";
      numOfQuestion += 1;
      correctAnswer = "";
      misses += 1;
      points--;
      bubbleIncorrectAnswer.innerText = misses;
      if (misses == 1) {
        textErrores.innerText = "error";
      } else if (misses > 1) {
        textErrores.innerText = "errores";
      }
      beginGame();
    }
  } else {
    // CHECKS THE ANSWERS IN THE PASAPALABRA ROUND !!!!!!!!!!!!!!!!!!!!!!!!!!!1
    var bubbleTag = pasapalabrasBox[numOfPasapalabra].letter.toUpperCase();
    var bubblePlaying = document.getElementById(bubbleTag);

    if (value.toLowerCase() === correctAnswer) {
      displayCorrectAnswer.innerText = "CORRECTO!";
      bubblePlaying.style.backgroundColor = "green";
      numOfPasapalabra += 1;
      correctAnswer = "";
      totalMatches += 1;
      bubbleCorrectAnswer.innerText = totalMatches;
      if (totalMatches == 1) {
        pluralPalabras.innerText = "palabra";
      } else if (totalMatches > 1) {
        pluralPalabras.innerText = "palabras";
      }
      beginGame();
    } else if (value.toLowerCase() === "pasapalabra") {
      displayCorrectAnswer.innerText = "El usuario pasapalabra!";
      bubblePlaying.style.backgroundColor = "orange";
      pasapalabrasBox.push(questions[numOfQuestion]);
      numOfPasapalabra += 1;
      pasapalabras += 1;
      correctAnswer = "";
      beginGame();
    } else {
      displayCorrectAnswer.innerText = "INCORRECTO!";
      bubblePlaying.style.backgroundColor = "red";
      numOfPasapalabra += 1;
      correctAnswer = "";
      misses += 1;
      bubbleIncorrectAnswer.innerText = misses;
      if (misses == 1) {
        textErrores.innerText = "error";
      } else if (misses > 1) {
        textErrores.innerText = "errores";
      }
      beginGame();
    }
  }
}
// Function to handle PASAPALABRA when button is clicked
function pasaBtn() {
  var bubbleTag = questions[numOfQuestion].letter.toUpperCase();
  var bubblePlaying = document.getElementById(bubbleTag);
  document.getElementById('answer').value = '';
  bubblePlaying.style.backgroundColor = "orange";
  displayCorrectAnswer.innerText = "El usuario pasapalabra!";
  pasapalabrasBox.push(questions[numOfQuestion]);
  numOfQuestion += 1;
  pasapalabras += 1;
  correctAnswer = "";
  beginGame();
}

//function to RESET the game******************************************************  RESET
function check() {
  tableGrow();
  var continuePlaying = prompt("JUGAR DE NUEVO SI O NO?");
  if (continuePlaying.toUpperCase() === "SI") {
    document.getElementById("play").style.visibility = "visible";
    document.getElementById("stop").style.visibility = "hidden";

    reset();
  } else {
    displayValElement.innerText = "HASTA PRONTO !!!";
    document.getElementById("elemToHide").style.visibility = "hidden";
    document.getElementById("status").style.visibility = "hidden";
    document.getElementById("play").style.visibility = "hidden";
    document.getElementById("stop").style.visibility = "hidden";
  }
}
// Function to END THE GAME........................................................ END GAME
function endGame(){
  clearTimeout(timer);
  check();
  displayValElement.innerText = "EL JUEGO HA TERMINADO";
  document.getElementById("elemToHide").style.visibility = "hidden";
  document.getElementById("tableUser"+user).innerHTML = user;
  document.getElementById("tableUserPoints"+user).innerHTML = points;

}
// Set a timer function to check the remaining seconds............................. TIMMING
function countDown(secs, elem) {
  clearTimeout(timer);

  var element = document.getElementById(elem);
  element.style.visibility = "visible";
  element.innerHTML = "Segundos restantes: " + secs;

  if (secs <0  ) {
    element.style.visibility = "hidden";
    endGame();
    return;
  }
  secs--;
  timer = setTimeout('countDown(' + secs + ',"' + elem + '")', 1000);
}
//function to RESET the reset game ********************************************************     RESET
function reset() {
  user ++;
  points=0;
  title = document.querySelector(".answerBox");
  displayVal = "PREGUNTA";
  questionPasapalabra = "";
  correctAnswer = "";
  questionToShow = [];
  numOfQuestion = 0;
  numOfPasapalabra = 0;
  bubblePlaying = 0;
  numOfQuestion = 0;
  totalMatches = 0;
  misses = 0;
  pasapalabras = 0;
  pasapalabrasBox = [];
  questionPasapalabra = [];
  displayCorrectAnswer.innerText = "";
  var spans = document.querySelectorAll('span');
  for (i = 0; i < spans.length; i++) {
    spans[i].style.backgroundColor = "blue";
    bubbleIncorrectAnswer.innerText = misses;
    bubbleCorrectAnswer.innerText = totalMatches;
  }
  document.getElementById("play").addEventListener("click", function() {
    countDown(40, "status");
  });
}


//function to EXECUTE the game:......................................................   BEGIN GAME
function beginGame() {
  document.getElementById("play").style.visibility = "hidden";
  //sets the answer box to be visible:
  document.getElementById("elemToHide").style.visibility = "visible";
  document.getElementById("stop").style.visibility = "visible";

  var totalUsers = [];
  var questionToShow = [];

  function play() {

    var pasapalabra = [];
    var end = 0;
    //check if you have reached all the questions and then go to play the pasapalabras
    if (numOfQuestion > 26) {
      displayValElement.innerText = "EMPIEZAN LAS PASAPALABRAS";
      displayCorrectAnswer.innerText = "";
      console.log(pasapalabrasBox);
      if (totalMatches + misses == 27) {
        displayValElement.innerText = "HAS TERMINADO";
        setTimeout(endGame,100);
      } else if (pasapalabras >= 1) {
        var pasapalabraToShow = [];
        pasapalabraToShow += (pasapalabrasBox[numOfPasapalabra].question);
        displayValElement.innerText = (pasapalabraToShow);
        correctAnswer = "";
        correctAnswer += pasapalabrasBox[numOfPasapalabra].answer;
      }
      //execute the game until you have reached all the letters
    } else if (numOfQuestion <= 26) {
      questionToShow += (questions[numOfQuestion].question);
      console.log("aqui sale el primer");
      console.log(questionToShow[numOfQuestion]);
      displayValElement.innerText = (questionToShow);
      correctAnswer += questions[numOfQuestion].answer;
      console.log("la respuesta es" + correctAnswer);
    }
  }
  play();
}
//function to RELOAD website ***************************************************************   RELOAD
function reload() {
  location.reload();
}
var stop = function() {
  document.getElementById("elemToHide").style.visibility = "hidden";
  document.getElementById("status").style.visibility = "hidden";
  document.getElementById("stop").style.visibility = "hidden";
  displayValElement.innerText = "EL USUARIO HA FINALIZADO EL JUEGO";
  setTimeout(endGame,100);
};
//function for TABLE USERS TO EXPAND............................................... TABLE USER
function tableGrow(){
  var table=document.getElementById("myTableResults");
  var row=table.insertRow(0);
  var cell1=row.insertCell(0);
  var cell2=row.insertCell(1);
  cell1.innerHTML=user;
  cell2.innerHTML=points;
}

//When you click PLAY it triger the timer function
// document.getElementById("play").addEventListener("click",countDown);
document.getElementById("play").addEventListener("click", function() {
  countDown(40, "status");
  beginGame();


});
//When you click it refreshes de website:
document.getElementById("refresh").addEventListener("click", reload);
//When you click it STOPS the game:
document.getElementById("stop").addEventListener("click", stop);
