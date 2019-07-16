


function createCircle(){
  var listElements = document.getElementsByTagName("li");
  var step = (2*Math.PI)/listElements.length;
  var angle=0; 
  var circleCenterX = 380;
  var circleCenterY = 300;
  var radius = 280;
  for(var i = 0; i<listElements.length; i++) { 
    var element = listElements[i];
    var liLeft=Number(Math.round(circleCenterX+radius*Math.cos(angle)));
    var liTop=Number(Math.round(circleCenterY+radius*Math.sin(angle)));
    element.style.left = liLeft+"px";
    element.style.top = liTop+"px";
    angle+=step;   
  }
}

createCircle();


var question1 = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    {letter: "e", answer: "ectoplasma", status: 0, question:"CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    {letter: "f", answer: "facil", status: 0, question:"CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    {letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    {letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    {letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    {letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    {letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"}, 
    {letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    {letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    {letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    {letter: "ñ", answer: "señal", status:0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    {letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    {letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    {letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    {letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    {letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    {letter: "t", answer: "terminator", status: 0, question:"CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    {letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    {letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    {letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"}, 
    {letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"}, 
    {letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"}, 
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]

var question2 = [
    { letter: "a", answer: "abrigo", status: 0, question: "CON LA A. Prenda que sirve para protegerte del frio"},
    { letter: "b", answer: "bala", status: 0, question: "CON LA B. Proyectil que disparan las armas de fuego"},
    { letter: "c", answer: "cabeza", status: 0, question: "CON LA C. Parte superior del cuerpo del hombre"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"}, 
    {letter: "e", answer: "ectoplasma", status: 0, question:"CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    {letter: "f", answer: "facil", status: 0, question:"CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    {letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    {letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    {letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    {letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    {letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"}, 
    {letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    {letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    {letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    {letter: "ñ", answer: "señal", status:0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    {letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    {letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    {letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    {letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    {letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    {letter: "t", answer: "terminator", status: 0, question:"CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    {letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    {letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    {letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"}, 
    {letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"}, 
    {letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},  
    { letter: "z", answer: "zinc", status: 0, question: "CON LA Z. Elemento químico de número atómico 30"},
]

var allQuestions = [question1, question2]

var questions = []

var indexPasapalabra= 0;

var userName = "";

var rankingName=[];

var continuePlaying = true;

var indexQuestion = -1

var answer1 = "";

var rigth= 0; 

var wrong = 0;

var pasa = false;

function preshPasapalabra(){
  pasa = true;
  answerQuestion();
}


function stillQuestions(lastQuestion){
  
   for(var i = -1; i < questions.length; i++) {

    lastQuestion++; 

        if(lastQuestion == questions.length){
            lastQuestion = 0;
        }
    
        if(questions[lastQuestion].status === 0){
        
            return lastQuestion;
            
        } 
               
    }
    
    return -1; 
 }

var interval = null; 

function newGame(){

  if(clickMe.value == "Empezar"){
    continuePlaying = true;
    document.getElementById("clickMe").value = "Finalizar";
    var li = document.getElementsByTagName("li");
          for(var i = 0; li[i]; i++){       
              li[i].style.background = "blue";
          }
  for(var j= 0; j<questions.length; j++){
        questions[j].status = 0
    }
    rigth = 0;
    wrong = 0;
    indexQuestion = -1; 
    document.getElementById("rigthAnswer").value = "";
    document.getElementById("wrongAnswer").value = "";
    document.getElementById("ranking").innerHTML = "";
    document.getElementById("rankingTittle").value= "";
    seg = 301; 




    questions = allQuestions[indexPasapalabra];


    userName= prompt("Nombre");
        if(userName== ""){
            userName= prompt("Nombre");
        }
      
   
   interval= setInterval(count, 1000);
    indexQuestion =  stillQuestions(indexQuestion);


    document.getElementById("question").innerHTML = questions[indexQuestion].question;

    answer1 = document.getElementById("answer").value
  


  }
  else if(clickMe.value == "Volver a empezar"){
      continuePlaying = true;
    document.getElementById("clickMe").value = "Finalizar";
    var li = document.getElementsByTagName("li");
          for(var i = 0; li[i]; i++){       
              li[i].style.background = "blue";
          }
  for(var j= 0; j<questions.length; j++){
        questions[j].status = 0
    }
    rigth = 0;
    wrong = 0;
    indexQuestion = -1; 
    document.getElementById("rigthAnswer").value = "";
    document.getElementById("wrongAnswer").value = "";
    document.getElementById("ranking").innerHTML = "";
    document.getElementById("rankingTittle").value= "";
    seg = 301; 




    questions = allQuestions[indexPasapalabra];
      
   
   interval= setInterval(count, 1000);
    indexQuestion =  stillQuestions(indexQuestion);


    document.getElementById("question").innerHTML = questions[indexQuestion].question;

    answer1 = document.getElementById("answer").value



  }else{
   
    document.getElementById("clickMe").value = "Empezar";
    continuePlaying = false;
    clearInterval(interval)
    ranking();

  }

    var input = document.getElementById("answer");
    input.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
     event.preventDefault();
      document.getElementById("check").click();
  }
});

}

function answerQuestion(){

  if(indexQuestion==-1){ return}

var currentletter = questions[indexQuestion].letter;

   //document.getElementById("question").value = questions[indexQuestion].question;    
           // var answer1 = prompt(questions[indexQuestion].question)
    var answer1 = document.getElementById("answer").value
    var  answer = answer1.toLowerCase();

    if (answer=== questions[indexQuestion].answer){
        questions[indexQuestion].status = 1;
        console.log("Respuesta correcta :) ")
        rigth++;
        document.getElementById("rigthAnswer").value = rigth;
    
        document.getElementById(currentletter).style.background = "green";

    }

    else if(pasa == true){
            questions[indexQuestion].status = 0;    
           pasa=false;
        
    }else{
       questions[indexQuestion].status = 2; 
       console.log("Respuesta incorrecta :( ")
       wrong ++;
       document.getElementById("wrongAnswer").value = wrong;
      document.getElementById(currentletter).style.background = "red";
    }

 
    indexQuestion = stillQuestions(indexQuestion);
    if(indexQuestion == -1 || continuePlaying == false){
      clearInterval(interval)
      ranking(); 
    }else{
      document.getElementById("question").innerHTML = questions[indexQuestion].question;
    }

    document.getElementById("answer").value= "";
    

}

function ranking(){
   var correctAnswer = 0
   var wrongAnswer = 0
   var rankingMarks = "";
   
   
         for(var i=0; i<questions.length; i++){
            if(questions[i].status == 1){
                correctAnswer ++;
            }

            else if(questions[i].status == 2 ){
                wrongAnswer ++

            }
         }

         

    if (correctAnswer + wrongAnswer == questions.length){
        
        rankingName.push({name:userName, puntos:correctAnswer})   
        
        for (var i = 0; i < rankingName.length; i++) {

                    rankingName.sort(function (a, b){
                         return (b.puntos - a.puntos)
                            })

                    rankingMarks+= "Name: "+ rankingName[i].name+" - Puntuaciones: "+rankingName[i].puntos + "<br>"
                     }

                     console.log("Las puntuaciones son:")
                     console.log(rankingMarks);
                     
                     document.getElementById("rankingTittle").value = "RANKING";
                     document.getElementById("ranking").innerHTML = rankingMarks;
                     document.getElementById("clickMe").value = "Volver a empezar";

        
     }else{
      console.log("Tus respuestas correctas han sido " + correctAnswer + " y las incorrectas " + wrongAnswer)
       document.getElementById("ranking").innerHTML = "Tus respuestas correctas han sido " + correctAnswer + " y las incorrectas " + wrongAnswer;
        continuePlaying = true;
        
    }
    
    for(var j= 0; j<questions.length; j++){
        questions[j].status = 0
    }
    
    indexPasapalabra++;
    if(indexPasapalabra === allQuestions.length){
        indexPasapalabra = 0;
    }
     
     
}

let seg = 301;

  function count() {
   
    document.getElementById("timer").value = --seg;
    
    if (!seg){
        clearInterval(interval);
        continuePlaying =  false;
        ranking();
        document.getElementById("clickMe").value = "Empezar";
    }

  }



