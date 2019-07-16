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

newGame();

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

function newGame(){
   
    questions = allQuestions[indexPasapalabra];

    userName= prompt("Nombre");
        if(userName== ""){
            userName= prompt("Nombre");
        }
      console.log("Bienvenido al pasapalabra " + userName)

    var indexQuestion = -1
    
    indexQuestion =  stillQuestions(indexQuestion);

    while(continuePlaying == true && indexQuestion != -1){
    
            var answer1 = prompt(questions[indexQuestion].question)
            var answer = answer1.toLowerCase();

            if (answer=== questions[indexQuestion].answer){
                questions[indexQuestion].status = 1;
                console.log("Respuesta correcta :) ")
            }

            else if(answer === "pasapalabra"){
                    questions[indexQuestion].status = 0;    
                   // indexQuestion ++;   -->  
                
            }

            else if (answer === "end"){
                    indexQuestion++;
                    continuePlaying = false;


            }else{
               questions[indexQuestion].status = 2; 
               console.log("Respuesta incorrecta :( ")
            }

         
            indexQuestion = stillQuestions(indexQuestion);

        }


    ranking();
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

                    rankingMarks+= "Name: "+ rankingName[i].name+" - Puntuaciones: "+rankingName[i].puntos+"\n"
                     }

                     console.log("Las puntuaciones son:")
                     console.log(rankingMarks)
        
     }else{
        console.log("Tus respuestas correctas han sido " + correctAnswer + " y las incorrectas " + wrongAnswer)
        continuePlaying = true;
        
    }
    
    for(var j= 0; j<questions.length; j++){
        questions[j].status = 0
    }
    
    indexPasapalabra++;
    if(indexPasapalabra === allQuestions.length){
        indexPasapalabra = 0;
    }

    var endPlay = prompt("Continue playing? y/n")
    if(endPlay=="y"){
        newGame();
    }else{
        console.log("Goodbye")
    }

     
     
}
