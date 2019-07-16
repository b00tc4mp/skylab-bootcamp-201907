/* Pasapalabra Game! (Final JS) 🎮
!?
Resource: ​ https://www.youtube.com/watch?v=xJp2c_rcHDc
Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una
palabra y el usuario deberá adivinar qué palabra estamos tratando, por ejemplo:
'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!
Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y
habiendo respondido todas las letras, deberá indicarle al usuario cuantas letras ha
fallado y cuántas ha acertado. Si el usuario responde con "pasapalabra" el juego
deberá estar preparado para entender que en ese momento, el usuario no
responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente
ronda. El juego deberá, cuando finalice, mostrar un ranking de usuarios con el
nombre y ordenados por cantidad de letras acertadas. */


/* PRO
● El programa no debería hacer distinciones entre mayúsculas, minúsculas...
Ejemplo : ​ "animal" == "ANIMAL" // "Animal" // "aNiMal"...
● El programa debe estar preparado para aceptar el input "END" para terminar
el juego en cualquier momento, si esto sucede, el programa dirá cuántas
letras ha acertado pero no entrará en el ranking.
● Prepara tu programa para que no repita siempre las mismas preguntas, por
ejemplo, de la misma letra, se podrían hacer tres preguntas diferentes.
 */

var questions = [
    
	{letter: "a", answer: {
        a:"abducir",
        b:"anterior", 
        c:"armario"
        }, 
        status:0,
        question: {
        a: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"),
        b:("CON LA A. Lo contrario de posterior"),
        c:("CON LA A. Pieza de mobiliario que puedes encontrar en IKEA y en tu habitación")
    }
    },
	{letter: "b", answer: {
        a: "bingo",
        b:"banana",
        c:"barcelona"
    }, status: 0, 
    question:{
        a: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"),
        b:("CON LA B. Fruta amarilla tropical"),
        c:("CON LA B. Ciudad dónde se realiza el bootcamp Skylab coders")
    }},

    {letter: "c", answer: { 
    a:"churumbel",
    b:"cadiz", 
    c:"camaron"
    }, 
    status:0,
    question: {
    a: ("CON LA C. Niño, crío, bebé"),
    b:("CON LA C. La ciudad conocida con la tacita de plata"),
    c:("CON LA C. Sigue la letra de Estopa: yo me parto la camisa como ...")
}
},
	{letter: "d", answer: {
        a:"dinamarca",
        b:"dios", 
        c:"dante"
        }, 
        status:0,
        question: {
        a: ("CON LA D. País nórdico limítrofe con Alemania"),
        b:("CON LA D. Ente ininteligible, omnisciente e inmutable"),
        c:("CON LA D. Autor de La Divina Comedia")
    }
    },
	{letter: "e",answer: {
        a:"ecuador",
        b:"estrecho", 
        c:"estrella"
        }, 
        status:0,
        question: {
        a: ("CON LA E. Linea imaginaria que divide la Tierra en dos hemisferios "),
        b:("CON LA E. Canal de agua situado entre dos masas de tierra que conecta dos cuerpos de agua"),
        c:("CON LA E. Cuerpo astronómico")
    }
    },
	{letter: "f", answer: {
        a:"francia",
        b:"famoso", 
        c:"fallo"
        }, 
        status:0,
        question: {
        a: ("CON LA F. País que introdujo el emblema Libertad, Igualdad y Fraternidad"),
        b:("CON LA F. Persona muy conocida (en masculino)"),
        c:("CON LA F. Seguro que has tenido más de uno en estas preguntas")
    }
    },
	{letter: "g", answer: {
        a:"gorila",
        b:"galicia", 
        c:"granada"
        }, 
        status:0,
        question: {
        a: ("CON LA G. El primate más grande que existe"),
        b:("CON LA G. Tierra dónde se acababa el occidente durante el mundo medieval"),
        c:("CON LA G. Ciudad dónde se encuentra La Alhambra")
    }
    },
	{letter: "h", answer: {
        a:"hermano",
        b:"habitacion", 
        c:"huelva"
        }, 
        status:0,
        question: {
        a: ("CON LA H. Familiar masculino hijo de tus mismos padres"),
        b:("CON LA H. Espacio de una casa donde suele haber una cama y un armario"),
        c:("CON LA H. Provincia dónde finaliza la Romería del Rocío")
    }
    },
	{letter: "i", answer: {
        a:"italia",
        b:"ira", 
        c:"incoloro"
        }, 
        status:0,
        question: {
        a: ("CON LA I. País con forma de bota"),
        b:("CON LA I. Emoción irracional que provoca un gran enfado"),
        c:("CON LA I. Que carece de color")
    }
    },
	{letter: "j",answer: {
        a:"jaen",
        b:"jota", 
        c:"joya"
        }, 
        status:0,
        question: {
        a: ("CON LA J. LA provincia de España mayor productora de aceite de oliva"),
        b:("CON LA J. Baile regional aragonés"),
        c:("CON LA J. Adorno de oro, plata o platino, con perlas o piedras preciosas o sin ellas.")
    }
    },
	{letter: "k", answer: {
        a:"kilogramo",
        b:"karate", 
        c:"koala"
        }, 
        status:0,
        question: {
        a: ("CON LA K. Unidad básica de masa a nivel internacional"),
        b:("CON LA K. Arte marcial de origen japonés"),
        c:("CON LA K. Marsupial típico de Australia que trepa por los árboles")
    }
    },
	{letter: "l", answer: {
        a:"ley",
        b:"lago", 
        c:"libertad"
        }, 
        status:0,
        question: {
        a: ("CON LA L. Norma que rige en las sociedades avanzadas"),
        b:("CON LA L. Cuerpo de agua dulce de grandes extensiones"),
        c:("CON LA L. Valor moral y político muy apreciado")
    }
    },
	{letter: "m", answer: {
        a:"madrid",
        b:"mes", 
        c:"molecula"
        }, 
        status:0,
        question: {
        a: ("CON LA M. Capital de España"),
        b:("CON LA M. Espacio de 12 periodos en el que está dividido un año"),
        c:("CON LA M. Conjunto estable de átomos ")
    }
    },
	{letter: "n", answer: {
        a:"negacion",
        b:"anterior", 
        c:"navarra"
        }, 
        status:0,
        question: {
        a: ("CON LA N. Primera fase de un duelo"),
        b:("CON LA N. Famosa novela de Unamuno y fenómeno meteorológico"),
        c:("CON LA N. Reino histórico de la península ibérica")
    }
    },
	{letter: "ñ",answer: {
        a:"caña",
        b:"cañon", 
        c:"riñon"
        }, 
        status:0,
        question: {
        a: ("CONTIENE LA Ñ. Planta de dónde se extrae el azúcar"),
        b:("CONTIENE LA Ñ  Pieza de artillería"),
        c:("CONTIENE LA Ñ. Órgano principal del sistema urinario humano")
    }
    },
	{letter: "o",answer: {
        a:"oscar",
        b:"ola", 
        c:"oviedo"
        }, 
        status:0,
        question: {
        a: ("CON LA O. Estatuílla de la famosa gala de Hollywood"),
        b:("CON LA O. Onda que se desplaza por los mares"),
        c:("CON LA O. Capital de Asturias")
    }
    },
	{letter: "p", answer: {
        a:"perro",
        b:"principe", 
        c:"pelotari"
        }, 
        status:0,
        question: {
        a: ("CON LA P. El mejor animal de compañía del hombre"),
        b:("CON LA P. Hijo de reyes y también una galleta"),
        c:("CON LA P. Jugado de Pelota Vasca")
    }
    },
	{letter: "q", answer: {
        a:"queen",
        b:"quimica", 
        c:"quito"
        }, 
        status:0,
        question: {
        a: ("CON LA Q. Grupo de música británico histórico"),
        b:("CON LA Q.  Ciencia que estudia la composición, estructura y propiedades de la materia"),
        c:("CON LA Q.  Capital de Ecuador")
    }
    },
	{letter: "r",answer: {
        a:"rima",
        b:"roma", 
        c:"revolucion"
        }, 
        status:0,
        question: {
        a: ("CON LA R. Repetición de una secuencia de fonemas a partir de la sílaba tónica al final de dos o más versos"),
        b:("CON LA R. Ciudad italiana fundada por Rómulo y Remo"),
        c:("CON LA R. Cambio social brusco que voltea el sistema hegemónico")
    }
    },
	{letter: "s",answer: {
        a:"sevilla",
        b:"sobre", 
        c:"silencio"
        }, 
        status:0,
        question: {
        a: ("CON LA S. Ciudad que tiene un color especial"),
        b:("CON LA S. Preposición que siempre está encima"),
        c:("CON LA S. Ausencia de ruido")
    }
    },
	{letter: "t",answer: {
        a:"teologia",
        b:"tomate", 
        c:"titan"
        }, 
        status:0,
        question: {
        a: ("CON LA T. El estudio sobre Dios"),
        b:("CON LA T. Planta con la que se hace el salmorejo y el gazpacho"),
        c:("CON LA T. Poderosa deidad de la mitología griega")
    }
    },
	{letter: "u", answer: {
        a:"ulises",
        b:"uruguay", 
        c:"universo"
        }, 
        status:0,
        question: {
        a: ("CON LA U. Heroe de la mitología griega también conocido como Odiseo"),
        b:("CON LA U. País sudamericano muy futbolero"),
        c:("CON LA U.  la totalidad del espacio y del tiempo, de todas las formas de la materia y la energía")
    }
    },
	{letter: "v",answer: {
        a:"violeta",
        b:"vitoria", 
        c:"verbo"
        }, 
        status:0,
        question: {
        a: ("CON LA V. Color entre azulado y rojizo"),
        b:("CON LA V. Ciudad vasca"),
        c:("CON LA V.  Categoría léxica que expresa acción")
    }
    },
	{letter: "w", answer: {
        a:"wikipedia",
        b:"whasington", 
        c:"windows"
        }, 
        status:0,
        question: {
        a: ("CON LA W. Enciclopedia virtual editada de manera colaborativa"),
        b:("CON LA W. Capital de USA"),
        c:("CON LA W. Sistema operativo creado por Bill gates")
    }
    },
	{letter: "x",answer: {
        a:"xilofono",
        b:"existencialismo", 
        c:"extinción"
        }, 
        status:0,
        question: {
        a: ("CON LA X. Instrumento musical de percusión"),
        b:("CONTIENE LA X. Corriente filosófica del siglo XIX que siguió Sartre"),
        c:("CONTIENE LA X. Desaparición de todos los miembros de una especie ")
    }
    },
	{letter: "y", answer: {
        a:"yogur",
        b:"yugoslavia", 
        c:"peyote"
        }, 
        status:0,
        question: {
        a: ("CON LA Y. Comida de origen lácteo que suelen comer los niños"),
        b:("CON LA Y. Ex república balcánica"),
        c:("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos")
    }
    },
	{letter: "z",answer: {
        a:"zen",
        b:"zaragoza", 
        c:"zoo"
        }, 
        status: 0,
        question: {
        a: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"),
        b:("CON LA Z. Capital de provincia por dónde pasa el Ebro"),
        c:("CON LA Z. Instalación en la que se exhiben animales ")
    }
    }
    

]

pasapalabra ();
function pasapalabra (){


var points=0;
var errors=0;
var totalPoints=0;
var namePlayer;
var welcomeUser;
var response;
var responseUpper=[];
var letra;
var arrayQuestions=[];
var arrayQuestions2=[];
var arrayAnswers=[];
var arrayAnswers2=[];
var letterPasapalabra=[];
var letterPasapalabra2=[];
var statusPasapalabra=[];
var statusPasapalabra2=[];
var i=0;
var lengthArray=questions.length;
var arrayWithQuestionsAnswers;
var timeleft = 150;
var downloadTimer;
var endGameTotal= false;

//Evento input que recoge el nombre 
document.getElementById("inputNombre").addEventListener("keypress", function inputName(e){

    var keyevent = event.code;
    if (keyevent==='Enter'){
        
        //Guardo el nombre que se ha introducido en el input
        namePlayer= document.getElementById("inputNombre").value;
        welcomeUser= `Bienvenido ${namePlayer}`
        
        //escondo el botón mediante el display de CSS
        document.getElementById("inputNombre").style.display= "none";
        //sustituyo el parágrafo por el nombre introducido 
        document.getElementById("pNombre").textContent= welcomeUser;
   
        buttonPlay();
    }
});

//Función de evento que gestiona el botón play
function buttonPlay(){

     //hago aparecer el botón de Jugar
     document.getElementById("botonjugar").style.display= "block";

     initialGameAnswer();
}


//Cuando le das a play evento que cambia la pantalla para que aparezcan las preguntas
var initialGameAnswers = document.getElementById("botonjugar");
initialGameAnswers.addEventListener("click",initialGameAnswer);

function initialGameAnswer(){

    document.getElementById("inputRespuestas").style.display= "block";
    document.getElementById("enviar").style.display= "block";
    document.getElementById("preguntas").style.display= "none";
   
    document.getElementById("score").style.display= "none";

    //llamo a la función questionsArray para generar los arrays con las preguntas, respuestas y letras
    arrayWithQuestionsAnswers = questionsArray();  
    questionsNew();
    timer();
}

//botón de enviar la respuesta

var sendAnswers = document.getElementById("enviar")
sendAnswers.addEventListener("click", sendAnswer);

function sendAnswer(){
   
    //para que no envíe nada cuando está vacío el input de respuestas
    if (document.getElementById("inputRespuestas").value===''){
        console.log('tienes que poner una paalabra')
    }
    //para que aparezca la siguiente pregunta (num ha pasado a tener un valor de 0)
    else if (i!==0){
        questionsNew();
    } 
      
    //mostrar la puntuación en los círculos
    if (points!==0 || errors!==0){
        document.getElementById("correct").textContent = points;
        document.getElementById("error").textContent = errors;
    }
}

//evento de input de respuestas

document.getElementById("inputRespuestas").addEventListener("keypress", function inputAnswer(e){

    var keyeventAnswer = e.code;
    if (keyeventAnswer==='Enter'){
        sendAnswer();
    }

});

//función generar preguntas, respuestas y letras en tres arrays
function questionsArray() {
 
    //Función que devuelve una letra aleatoria entre a,b y c
    function randomLetter(){
        // Generar Numero Random entre 0 y 2
        function numberRandom() {
            return Math.floor(Math.random() * 3); 
         }
        var oneNumberRandom= numberRandom();

        var letterArray = ['a','b','c'];

        function returnLetter (){
          return letterArray[oneNumberRandom];
        }
       return returnLetter();
    }
                   
    //se llama a la función que genera la letra aleatoria y se le asigna a una variable.
    letterVariable = randomLetter();

    //saco la letra random en una variable. A su vez pongo la pregunta con la letra random en otra variable
   
     letra=letterVariable;
 
     for (var i=0;i<questions.length; i++){
        arrayQuestions.push(questions[i].question[letra]);
        arrayAnswers.push(questions[i].answer[letra]);
        letterPasapalabra.push(questions[i].letter);
        statusPasapalabra.push(questions[i].status);
        
     }
    return[arrayQuestions, arrayAnswers, letterPasapalabra, statusPasapalabra]
}

//función que hace de intermediaria entre otras funciones y la función de respuestas 
function questionsNew(){
  
    answers();
   
}

//función para resetear los arrays y variables de las diversas iteraciones de pasapalabras
function resetPasapalabra (){

    arrayAnswers=arrayAnswers2;
    arrayQuestions=arrayQuestions2;
    letterPasapalabra=letterPasapalabra2;
    statusPasapalabra=statusPasapalabra2; 
    arrayAnswers2=[];
    arrayQuestions2=[];
    letterPasapalabra2=[];
    statusPasapalabra2=[];
    lengthArray=arrayQuestions.length;
    totalPoints=0;
    responseUpper=[];
    i=0;
}

//función reset del juego una vez se ha acabado
function resetGame(){

    arrayAnswers=[];
    arrayQuestions=[];
    letterPasapalabra=[];
    statusPasapalabra =[];
    arrayWithQuestionsAnswers=[];
    lengthArray=questions.length;
    totalPoints=0;
    response='';
    responseUpper=[];
    totalPoints=0;
    points=0;
    errors=0;
    i=0;
    clearInterval(downloadTimer);
}

//función que muestra las preguntas en la parte derecha y esconde y muestra algunas pantallas
function showQuestions(){

    //vuelvo a mostrar la pantalla de preguntas y empiezo a llamar a las preguntas
    document.getElementById("preguntas").style.display= "block";
    document.getElementById("pRules").textContent= arrayQuestions[i];
        
    //vuelvo a mostrar la pantalla de botón play pero con la puntuación
    document.getElementById("score").style.display= "block";
    document.getElementById("pNombre").style.display= "none";
    document.getElementById("botonjugar").style.display= "none";
    document.getElementById("circleGreen").style.display= "inline-block";
    document.getElementById("circleRed").style.display= "inline-block";
    
}

//función se encarga de iluminar la letra en la que se está
function lightLetter(){
  
    if (i===lengthArray){
        document.getElementById(letterPasapalabra[i-1]).style.background= "lightblue";
    }  
    else { 
        document.getElementById(letterPasapalabra[i]).style.background= "lightblue";
    }
} 

function endGame(){

    //vuelvo a mostrar la pantalla de preguntas y empiezo a llamar a las preguntas
    document.getElementById("preguntas").style.display= "block";
    document.getElementById("inputRespuestas").style.display= "none";
    document.getElementById("enviar").style.display= "none";
    document.getElementById("pRules").textContent= `Fin del juego ${namePlayer}. Has tenido ${points} aciertos y ${errors} errores`
    //reseteo aquí el tiempo ya que si lo pongo en resetGame sale mal al principio
    timeleft=150;
    document.getElementById("countdown").style.display= "none";
    document.getElementById("keepPlaying").style.display= "block";
 
} 

//Función respuestas para comprobar que coinciden con las preguntas
function answers(){
   
        showQuestions();
        lightLetter();

        //saco el valor de lo introducido en el input como respuesta
        response= document.getElementById("inputRespuestas").value;
        responseUpper.push(response.toLowerCase());
        
        if (responseUpper[i]===''){
                                      

            }else if (responseUpper[i]==='p' || responseUpper[i]==='pasapalabra') {
                //guardo en arrays las preguntas, respuestas, letras y status de las respuestas que se han
                //marcado como pasapalabra para después resetear los arrays y trabajar con estos en las
                //diversas iteraciones (profundidad de pasapalabras)
                        statusPasapalabra[i-1]=1;
                        arrayQuestions2.push(arrayQuestions[i-1]);
                        arrayAnswers2.push(arrayAnswers[i-1]);
                        letterPasapalabra2.push(letterPasapalabra[i-1]);
                        statusPasapalabra2.push(statusPasapalabra[i-1]); 
                        document.getElementById(letterPasapalabra[i-1]).style.background= "rgb(223, 233, 77)";
                        totalPoints++;

                } else if (responseUpper[i]!==arrayAnswers[i-1]){
                        
                        statusPasapalabra[j-1]=2;
                        document.getElementById(letterPasapalabra[i-1]).style.background= "rgb(233, 77, 77)";
                        errors++;
                        totalPoints++;
            
                } else if (responseUpper[i]===arrayAnswers[i-1]){
                        
                        statusPasapalabra[i-1]=3;
                        document.getElementById(letterPasapalabra[i-1]).style.background= "rgb(154, 253, 97)";
                        points++;
                        totalPoints++;

                }
        i++;

         //vaciar el input con la respuesta
        document.getElementById("inputRespuestas").value='';

        totalLettersAnswereds=points+errors;

         if (totalLettersAnswereds===27 ){
             endGame();
         }  else if(totalPoints===lengthArray && statusPasapalabra.includes(1)){
            resetPasapalabra();
            questionsNew();
         }    
    
}

//Evento que gestiona el botón de seguir jugando
document.getElementById("button1").addEventListener("click", function button1(){
    document.getElementById("keepPlaying").style.display= "none";
    document.getElementById("inputRespuestas").style.display= "block";
    document.getElementById("enviar").style.display= "block";
    //volver a pintar de lila las letras
    for (var i=0; i<questions.length; i++){
        document.getElementsByClassName("letra")[i].style.backgroundColor= "rgb(179, 158, 175)";
    }
    resetGame();
    initialGameAnswer();
    
});

//Evento que gestiona el finalizar el juego
document.getElementById("button2").addEventListener("click", function button2(){
    endGameTotal=true;
    document.getElementById("titulo").style.display= "none";
    document.getElementById("rosco").style.display= "none";
    document.getElementById("preguntas").style.display= "none";
    document.getElementById("keepPlaying").style.display= "none";
    document.getElementById("score").style.display= "none";
    document.getElementById("inputRespuestas").style.display= "none";
    document.getElementById("enviar").style.display= "none";

    document.body.style.backgroundSize = "50%";
    document.body.style.backgroundImage = "url('The-End.jpg')"; 
   
});

//función que gestiona el contador de tiempo
function timer(){
    document.getElementById("countdown").style.display= "block";
    downloadTimer = setInterval(function(){
        document.getElementById("countdown").innerHTML = timeleft;
        timeleft -= 1;
        if(timeleft <= 0){
        clearInterval(downloadTimer);
        //si se ha seleccionado no seguir jugando que ya no aparezca el endgame al finalizar el tiempo
        if (endGameTotal){

            } else {
                endGame();
            }
        }
    }, 1000);
}

}