//PROYECTO TEMA 4

/*Pasapalabra Game! (Final JS) 🎮⁉️
Resource: https://www.youtube.com/watch?v=xJp2c_rcHDc
Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y el usuario deberá adivinar qué palabra estamos tratando, por ejemplo:
'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!

Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y habiendo respondido todas las letras, deberá indicarle al usuario 
cuantas letras ha fallado y cuántas ha acertado. Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender que en ese momento, 
el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. El juego deberá, cuando finalice, mostrar un 
ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas.
PRO
El programa no debería hacer distinciones entre mayúsculas, minúsculas... Ejemplo: "animal" == "ANIMAL" // "Animal" // "aNiMal"...
El programa debe estar preparado para aceptar el input "END" para terminar el juego en cualquier momento, si esto sucede, el programa dirá cuántas letras 
ha acertado pero no entrará en el ranking.
Prepara tu programa para que no repita siempre las mismas preguntas, por ejemplo, de la misma letra, se podrían hacer tres preguntas diferentes.
Ejemplo de preguntas y respuestas: made by => www.github.com/misan7*/









var q1= [
  { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien."},
  { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso."},
  { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé."},
  { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida."},
  { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación."},
  { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad."},
  { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas."},
  { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento."},
  { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano."},
  { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la pelcíula 'El Rey Len', de nombre Pumba."},
  { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria."},
  { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo."},
  { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas."},
  { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia."},
  { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
  { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien."},
  { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnolgicamente avanzada que se caracteriza por sus grandes poderes psonicos del videojuego StarCraft."},
  { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduracin de la cuajada de la leche."},
  { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor."},
  { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático."},
  { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolid a Arnold Schwarzenegger como actor en 1984."},
  { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914."},
  { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa."},
  { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso."},
  { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en ciruja estética."},
  { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indgenas americanos."},
  { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabidura ms allá del discurso racional."},
]

var q2= [
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

var q3= [
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



//--------------------------VARIABLES--------------------------------
var stop
var l=[]
var lett=[];
var points=0;
var errores=0;
var UserNameThisTurn;//guarda el nombre del jugador de turno actual
var todasQ=[]
var questionsTurnArr=[]
var freezeLetters=[]


//--------------------------DATA BASE USERS--------------------------------
//función que crea usuarios
function user(name,points){
  this.name = name;
  this.points = points;
};
var usersArr=[]
var Joey= new user("Joey",50)//usuario default
var Heminway= new user("Heminway",10)//usuario default
var Steven= new user("Steven",100)//usuario default
usersArr.push(Joey,Heminway,Steven)



//--------------------------HELLO USER--------------------------------

function askName(){
  let nameUser= prompt(`Insert your name:`)
 
  if(nameUser){
  
  var userExist=[]//si el usuario está en la base de datos, guardamos su nombre en esta variable
  var userExistPoints= []// si el usuario está en la base de datos, guardamos sus puntos en esta variable
  for(prop in usersArr){
  if(nameUser===usersArr[prop].name){
    userExist.push(usersArr[prop].name)
    userExistPoints.push(usersArr[prop].points)
  }
  };
  if(userExist==nameUser){
  for(prop in usersArr){  
  alert(`Welcome ${userExist} to PASAPALABRA SKYLAB! Happy to see you again!`);
    UserNameThisTurn=nameUser;    
    break;
  }}else{
  alert(`Welcome ${nameUser} to PASAPALABRA SKYLAB!`);
  newUser= new user(nameUser,0)
  usersArr.push(newUser)
  UserNameThisTurn=nameUser; 
  }
  }else{
  
   var introduce= prompt(`You haven't entered your username. Please, indicate what you want to do`,'RETURN, END')
   if(introduce){
     if(introduce.toUpperCase()==='RETURN'){
      this.askName();
     }else if(introduce.toUpperCase()==='END'){
      alert(`Thank you ${nameUser} for visit PASAPALABRA SKYLAB! We are waiting for you soon! `);
     }else{
      this.askName();
     }}else{
      this.askName();
    }
  }}


 //--------------------------GET QUESTIONS TURN--------------------------------
  function getQuestions(){
  for(var i=0;i<q1.length;i++){
    var randomNum=(Math.random()*2).toFixed()
    todasQ.push(q1[i],q2[i],q3[i])
    questionsTurnArr.push(todasQ[randomNum])
    
    todasQ=[];
  }
  }
 
  //--------------------------PLAY GAME--------------------------------
  
  function game(){
    qArr=questionsTurnArr;
     function lettersForPrint(){
      for(var i=0;i<freezeLetters.length;i++){
        l.push(freezeLetters[i])
      }lett.push(l)
      }
   
   function ronda(){
   var noAnswered=[];
   freezeLetters=[]
   for(prop in questionsTurnArr){
    if(questionsTurnArr[prop].status===0){
    freezeLetters.push(questionsTurnArr[prop].letter)}
    }
   for(var i=0;i<questionsTurnArr.length;i++){   
    if(stop===true){
      break;
    } 
    l=[]
    lett=[]   
    lettersForPrint();
    var printLett= lett.map(x=>x.join(' | '))
    var newAsk=prompt(`${printLett}\n${questionsTurnArr[i].question}`,`ANSWER / PASAPALABRA`)
    var answer=questionsTurnArr[i].answer
    
   if(newAsk){
      if(newAsk.toLowerCase()===answer){
        questionsTurnArr[i].status=1;
        freezeLetters[i]='✔';           
      points++

      alert(`🎉Your answer is correct!🎉\nYou have ${points} points.`)
      
      }else if(newAsk.toLowerCase()==='pasapalabra'){
        questionsTurnArr[i].status=0;
        noAnswered.push(questionsTurnArr[i])
      }else if(newAsk.toLowerCase()==='end'){
        questionsTurnArr[i].status=0;
        noAnswered.push(questionsTurnArr[i])
        playOrStop()
      }else if(newAsk.toLowerCase()!=answer){
        questionsTurnArr[i].status=1;
        freezeLetters[i]='✖';
        errores ++
        alert(`Incorrect...\nThe answer is: ${answer}.`)

      }
   }else{
    playOrStop();
   };       
      function playOrStop(){
      var runPlaying=prompt(`Are you sure you want to end the game?`,`CONTINUE / END`)
      if(runPlaying.toLowerCase()==='continue'){
        alert(`Here we go!`)
      }else if(runPlaying.toLowerCase()==='end'){
        stop=true;
      }else{
        this.playOrStop();
      }}
   }
     if(noAnswered.length>=1&&stop!==true){
      questionsTurnArr=[];
      questionsTurnArr=noAnswered;
      return ronda();
     }else if(noAnswered.length<1&&stop!==true){
        if(points===27){
          points= parseInt(points)+20;
          alert(`🎉🎉YOU WIN THE GAME🎉🎉\n You have answered all the questions correctly and have obtained 20 extra points.\nIt's a total of ${points} points.`);

        }else{
          alert(`Congratulations ${UserNameThisTurn}, you have managed to answer all the questions. Your result is the following:\nHits: ${points} / Misses: ${errores}`)
       }
      showRank();
     }else if(stop===true){
      alert(`Oh...${UserNameThisTurn}, you haven't answered all the questions but you have got a total of ${points} hits!!`)
     }

 }ronda()
}

//--------------------------ADD POINTS-----------------------------
function addPoints(){
var result=[]
for(prop in usersArr){
  if(UserNameThisTurn === usersArr[prop].name){
    var n1=usersArr[prop].points;
    var n2=points;  
    result.push(parseInt(n1)+parseInt(n2));
    usersArr[prop].points=result;
    }}
    result=[]
}

//--------------------------RANKING LIST-----------------------------
  function showRank(){ 
  addPoints()
  var alertRanking=[]
  usersArr.sort(function(a,b){
  return b.points - a.points;
  })
  for(prop in usersArr){
  var indice = prop.length+(parseInt(prop))
  alertRanking.push(`\n${indice} => Player: ${usersArr[prop].name} | Points: ${usersArr[prop].points}`)}
  alert(`---------PASAPALABRA SKYLAB RANKING--------- ${alertRanking}`)
  }

  //--------------------------PLAY AGAIN-----------------------------
  function playAgain(){
  var askPlayAgain=prompt(`Do you want to play a new game?`,`YES / END`)
  if(askPlayAgain.toUpperCase()==='YES'){
    refresh();
    startGame();
  }else if(askPlayAgain.toUpperCase()==='END'){
    alert(`Thank you ${UserNameThisTurn} for playing with PASAPALABRA SKYLAB! We are waiting for you soon! `)
  }else{
    this.playAgain();
  }
}

   //--------------------------REFRESH-----------------------------
   function refresh(){
    for(prop in q1){
      if(q1[prop].status===1){
        q1[prop].status=0}
    }
    for(prop in q2){        
      if(q2[prop].status===1){
        q2[prop].status=0} 
    } 
    for(prop in q3){    
      if(q3[prop].status===1){
        q3[prop].status=0}      
    }
    stop=undefined
    l=[]
    lett=[]
    points=0
    errores=0
    UserNameThisTurn;
    todasQ=[]
    questionsTurnArr=[]
    freezeLetters=[]
   }

   //--------------------------START GAME-----------------------------   
   function startGame(){
   askName();
   getQuestions();
   game();
   playAgain();
   }
   startGame()



