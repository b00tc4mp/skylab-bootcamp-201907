let concursante = '';
let acertadas = 0;
let falladas= 0;
let rankingPredefinido = [
	{nombre: "Frodo", puntuacion: 3},
	{nombre: "Gollum", puntuacion: 19},
	{nombre: "Sam", puntuacion: 18},
	{nombre: "Orco", puntuacion: 1},
	{nombre: "Sauron", puntuacion: 2},
]
let preguntas = [
    { letter: "a", answer: "aragorn", status: 0, question: "CON LA A. Personaje de Tolkien, también conocido como Trancos, que fue un dúnedain y el trigésimo noveno heredero de Isildur. "},
    { letter: "b", answer: "bilbo", status: 0, question: "CON LA B. Hobbit al que trece enanos se presentaron en su casa a tomar té."},
    { letter: "c", answer: "comunidad", status: 0, question: "CON LA C. Primer libro de El señor de los anillos, La... del anillo"},
    { letter: "d", answer: "dragon", status: 0, question: "CON LA D. en The Hobbit, Smaug es un..."},
    { letter: "e", answer: "elrond", status: 0, question: "CON LA E. Padre de Arwen"},
    { letter: "f", answer: "faramir", status: 0, question: "CON LA F. Es el hermano menor de Boromir y el segundo hijo de Denethor II, senescal del reino de Gondor."},
    { letter: "g", answer: "gandalf", status: 0, question: "CON LA G. Mago conocido, primero como el mago gris, y posteriormente como el mago blanco"},
    { letter: "h", answer: "hobbits", status: 0, question: "CON LA H. Habitantes de Hobbiton"},
    { letter: "i", answer: "isildur", status: 0, question: "CON LA I. Personaje que tomó la espada quebrada de su padre, Narsil, y le cortó a Sauron el dedo con el Anillo Único. "},
    { letter: "j", answer: "john", status: 0, question: "CON LA J. Significado la J de J.R.R Tolkien"},
    { letter: "k", answer: "kili", status: 0, question: "CON LA K. Enano de la Casa de Durin, hijo de Dís la Hermana de Thorin y una de las pocas mujeres Enanas que se conocen."},
    { letter: "l", answer: "legolas", status: 0, question: "CON LA L. Elfo miembro de la comunidad del anillo, arquero que acompaña a Aragorn y Gimli."},
    { letter: "m", answer: "melkor", status: 0, question: "CON LA M. Primer señor oscuro y  uno de los personajes principales de El Silmarillion."},
    { letter: "n", answer: "namos", status: 0, question: "CON LA N. También conocido como Mandos por las estancias donde habita en Aman, es el vala del destino y uno de los Aratar."},
    { letter: "ñ", answer: "señor", status: 0, question: "CONTIENE LA Ñ. Trilogia secuela de el Hobbit. El ... de los anillos"},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "peregrin", status: 0, question: "CON LA P. Personaje más conocido como Pippin, ... Tuk"},
    { letter: "q", answer: "quien", status: 0, question: "CON LA Q. Respuesta habitual a: ¿ conoces a un dragón, primero de los urulóki y considerado el «padre de los dragones»???"},
    { letter: "r", answer: "rivendel", status: 0, question: "CON LA R. ciudad-refugio habitada por Elfos y dirigida por Elrond"},
    { letter: "s", answer: "sauron", status: 0, question: "CON LA S. Señor oscuro, para destruirle deben destruir el anillo único."},
    { letter: "t", answer: "thurin", status: 0, question: "CON LA T. Enano del linaje de Durin. Conocido como escudo de roble."},
    { letter: "u", answer: "uruk-hai", status: 0, question: "CON LA U. Clase específica de orcos negros de gran fuerza, los cuales llamaban snaga (esclavo) a las demás clases."},
    { letter: "v", answer: "viejo", status: 0, question: "CON LA V. Es un árbol, pero inteligente y malvado, con varios poderes especiales, como una suerte de irresistible hipnosis, y la posibilidad de mover sus raíces y tronco, y agarrar y agredir con ellos. ... Hombre sauce"},
    { letter: "w", answer: "arwen", status: 0, question: "CONTIENE LA W. Elfa enamorada de Aragorn"},
    { letter: "x", answer: "explotar", status: 0, question: "CONTIENE LA X. Para que los enemigos entraran en el Abismo de Helm, hicieron ...  uno de sus muros"},
    { letter: "y", answer: "eowyn", status: 0, question: "CONTIENE LA Y. En el señor de los anillos: Hermana de Éomer, hija de Éomund y Théodwyn, la hermana del rey Théoden"},
    { letter: "z", answer: "azog", status: 0, question: "CONTIENE LA Z. En El hobbit, rey de los Orcos de Moria.Conocido como The pale orc. "},
];


function pregunta(){	
	for (let rosco of preguntas) {
		if(rosco.status === 0){
			let preguntaLetra =	prompt(`${rosco.question}`)
			preguntaLetra = preguntaLetra.toLowerCase()

			if(preguntaLetra === rosco.answer){
				rosco.status = 1;
				acertadas++;
				alert('Correcto!');
			}
			else if(preguntaLetra === 'pasapalabra') {
				rosco.status = 0;
			}
			else if (preguntaLetra === null || preguntaLetra === 'end' ){
				alert('Adios!');
				break;
			}
			else{
				rosco.status = 2;
				alert(`Fallaste!, la respuesta es: ${rosco.answer}`);
				falladas++;
			}
		}
			
	}
}
function compruebaSiAcabado(){
		if(preguntas.every(item => item.status !== 0 )){

			return false
		}
		else {
			return true
		}
	
}
function roscoAcabado(){
	do{
		pregunta()
	}

	while(compruebaSiAcabado() || pregunta() === 'bye' )
	

}  
function aciertosFallos(){
	if(preguntas.every(item => item.status === 1 )){

			alert(`MUY BIEN! HAS GANADO 1 MILLON DE EUROS`)
		}
	else{
		alert(`Has acertado ${acertadas}, y has fallado ${falladas} que lástima.`)
	}
}

function ranking() {
	let rankJugador = {nombre: concursante, puntuacion: acertadas}
	rankingPredefinido.push(rankJugador)
	let rankingOrdenado= rankingPredefinido.sort( ordenar )
	alert('El Ranking es :'+ '\n' + pintar().replace(/,/g,""))
}

function ordenar( a, b ) {
  if ( a.puntuacion < b.puntuacion ){
    return 1;
  }
  if ( a.puntuacion > b.puntuacion ){
    return -1;
  }
  return 0;
}


function welcome() {
	concursante = prompt('Bienvendo a PASAPALABRA TOLKIEN EDITION! Dime tu nombre!');
	let bienvenida = alert(`Hoy jugamos con ${concursante}, con un bote de 1 MILLON DE EUROS! VAMOS ALLÁ!!!!`);
}

function play(){
	welcome();
	roscoAcabado();
	aciertosFallos();
	ranking();
}

function pintar(){
    let arr = rankingPredefinido.map(item => {
   		return item.nombre + ' ' +item.puntuacion + '\n'
    })
    return arr.toString() 
} 


play()