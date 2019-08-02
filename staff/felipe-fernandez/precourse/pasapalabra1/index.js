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
        c:("CON LA E. Cuerpo astrómico")
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
        c:("CON LA K. Marsupial típico de Australia")
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
        b:("CON LA N. Famosa novela de Unamuno y fenómeno meteorólico"),
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
    },

]

var count=1;
var statusRight=0;
var points;
var statusWrong=0;
var rankingUsers= [];
var removed;
var end=false;
var questionAsked;
var questionAsked2=[];
var valor=-1;


function pasapalabra(){

	name = prompt('¿Cuál es tu nombre?');
   
	console.log(`¡Hola ${name}!`)

	//Sistema de puntos
	console.log(`El sistema de puntos es el siguiente: 
			Cada letra acertada es un punto. 
			Si fallas una palabra no se vuelve a repetir y cuenta como fallo
			Si dices pasapalabra, la letra no cuenta como fallada y se queda pendiente 
			para el siguiente turno.
			`);
			
    askQuestions();	
  

//Función donde se hacen las preguntas y las posibles respuestas
function askQuestions(){

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
                   
    //Creo una variable global de la función askquestions y que sea igual a questions para que cada 
    //invocación a esta función tenga un array limpio con los status a 0
    var questions2 = questions.map(x=>x);
           
    //Bucle con las preguntas por prompt
 	for (var i=0; i<questions2.length;i++) {
               
        //se llama a la función que genera la letra aleatoria y se le asigna a una variable.
        letterVariable = randomLetter();
              
        var response;  

         //función para controlar que se añade una respuesta ya que si no, response sería nully el tolowercase no funciona

        function funcPrompt() {
        //se crea un condicional para diferenciar las preguntas pasapalabra con status 3. Si tienen otro status se pasa al else
          if (questions2[i].status===3){
            valor +=1;
           
            //En el caso de que sea una palabra que se haya dado pasapalabra
            //mostraré la pregunta del array una a una en orden
            response = prompt(questionAsked2[valor]);
            if (response === null || response === "") {
              alert('Por favor, introduce una respuesta');
              
              funcPrompt();
              return;
            }
       }
          else {
         //guardo la pregunta aleatoria de las tres posibles en una variable que utilizaré más adelante
          questionAsked=  questions2[i].question[letterVariable]
          response = prompt(questionAsked);
             if (response === null || response === "") {
              alert('Por favor, introduce una respuesta');
              funcPrompt();
              return;
            }
          }
        }
        funcPrompt();   

        //Convertir a minúsculas todas las letras que se escriban
        var responseUpper = response.toLowerCase();
  
                    
            if (responseUpper==='end'){
                count ===1 ? console.log('Has acabado con ' + (count -1) + ' punto') : console.log('Has acabado con ' + (count -1) + ' puntos');
                //cambio el valor de end a true y salgo para que no se muestre la puntuación más adelante
                end=true;
                break;
            }
            else if (responseUpper==='pasapalabra'){
                  
                questions2[i].status=3;
                
                //Hago un condicional para añadir a un array las preguntas que les dice pasapalabra para sacarlas
                //posteriormente cuando el bucle haya dado la vuelta. Además, lo divido según las tres opciones de preguntas posibles
               
                 if (questionAsked===questions2[i].question.a){
                     questionAsked2.push(questions2[i].question.a);
                                      
                } else  if (questionAsked===questions2[i].question.b){
                     questionAsked2.push(questions2[i].question.b);
                     
                } else {
                     questionAsked2.push(questions2[i].question.c);
                                     
                }   
               
                //la letra que hay en el bucle cuándo se pone pasapalabra
                let letterPass = questions2[i].letter;
                                
                //el índice la letra que hay en el bucle cuándo se se pone pasapalabra
                function indexLetter(element) {
                    return element.letter === letterPass;
                }
                
                let letterIndex = (questions2.findIndex(indexLetter));

                //Llamo a la función con el índice de la letra para que haga el splice del array y el push para meterlo detrás de todo
                newTurn(letterIndex); 

                //Al hacer el splice en la función newTurn se saltaba un item del bucle y se saltaba un pregunta. Aquí fuerzo a que no se lo salte
                i--;
                
               
               //añado tres else if para los casos de que sean preguntas preguntadas en el caso de ser pasapalabras
               //como están en un array tengo que hacerlo de otra manera 
            }  else if (questionAsked2.includes(questions2[i].question.a)){
                        if(questions2[i].answer.a===responseUpper){
                            count ===1 ? console.log('Correcto, tienes ' + count + ' punto') : console.log('Correcto, tienes ' + count + ' puntos');
                            count++;
                            questions2[i].status=1;
                            statusRight += questions2[i].status===1;
                        
                       } else{
                        questions2[i].status=2;
                        statusWrong += questions2[i].status===2;
                        console.log('Error,' + response + ' no es la palabra correcta');
                       }

             }else if (questionAsked2.includes(questions2[i].question.b)){
                       if (questions2[i].answer.b===responseUpper){
                            count ===1 ? console.log('Correcto, tienes ' + count + ' punto') : console.log('Correcto, tienes ' + count + ' puntos');
                            count++;
                            questions2[i].status=1;
                            statusRight += questions2[i].status===1;
                       } 
                       else{
                        questions2[i].status=2;
                        statusWrong += questions2[i].status===2;
                        console.log('Error,' + response + ' no es la palabra correcta');
                    }

            }else if(questionAsked2.includes(questions2[i].question.c)) {
                        if (questions2[i].answer.c===responseUpper){
                            count ===1 ? console.log('Correcto, tienes ' + count + ' punto') : console.log('Correcto, tienes ' + count + ' puntos');
                            count++;
                            questions2[i].status=1;
                            statusRight += questions2[i].status===1;
                        }  
                        else{
                            questions2[i].status=2;
                            statusWrong += questions2[i].status===2;
                            console.log('Error,' + response + ' no es la palabra correcta');
                        }

               //aquí se compara las respuestas acertadas con la letra recogida         
            }else if (responseUpper===questions2[i].answer[letterVariable]){

                count ===1 ? console.log('Correcto, tienes ' + count + ' punto') : console.log('Correcto, tienes ' + count + ' puntos');
                count++;
                questions2[i].status=1;
                statusRight += questions2[i].status===1;

            }  //en caso de no coincidir la respuesta con nada
            else if (responseUpper!==questions2[i].answer[letterVariable]) {
            
                questions2[i].status=2;
                statusWrong += questions2[i].status===2;
                console.log('Error,' + response + ' no es la palabra correcta');
            }	


         
    
      
}//fin for loop

    //Mientras la variable end sea falsa (se ha creado con el valor false) se mostrará
    // el recueto y la puntuación del usuario
    while (end===false) {
        console.log(`Se acabaron las palabras. Tu puntuación es la siguiente:
        Has acertado ${statusRight} palabras
        Has fallado  ${statusWrong} palabras
        `);

        //sacar la puntuación del usuario
        points= statusRight;
        rankingUsers.push({name, points});
        rankingUsers.forEach(function (elemento) {
            console.log(elemento);
        });
        //Pongo end a true para que solo muestre la puntuació una vez 
        end=true;
    }//Fin while

 //limpiar los status del array questions y variables globales para el siguiente turno
 
 questions2.forEach(function(el){
    el.status=0;
       
 });  

 statusRight=0;
 statusWrong=0;
 count=1;
 end=false; 
 questionAsked='';
 questionAsked2=[];
 valor=-1;


//Función que hace splice de la palabra con "pasapalabra" y la mete detrás del array 
function newTurn (index){
    
	var removedItemArray= questions2.splice(index,1 );
	   
	removedItemArray.forEach(function(el){
			questions2.push(el);
       });	
 }
    

} //Fin function askQuestons

} //Fin función pasapalabra