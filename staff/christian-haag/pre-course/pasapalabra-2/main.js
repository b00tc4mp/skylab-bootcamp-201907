let questions = [{ letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
{ letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
{ letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
{ letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
{ letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
{ letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
{ letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
{ letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
{ letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
{ letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
{ letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
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
{ letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"}];


let score = [{names:'DoomGuy', points: 7 ,time: 'xxx', fails:20, status: 0},{names:'LaVaNe', points: 18 ,time: 'xxx', fails: 9, status: 0},{names:'Marvin', points: 25,time: 'xxx', fails: 2, status: 0},{names:'Mrs-Pots', points: 26 ,time: 'xxx', fails: 0, status: 0},{names:'El_Perchas', points: 19 ,time: 'xxx', fails: 8, status: 0},{names:'Anna', points: 13 ,time: 'xxx', fails: 14, status: 0},{names:'Splinter', points: 1,time: 'xxx', fails: 26, status: 0}];

window.user = 'user-name'; 
let arrCopy = Array.from(questions);
let countHits = 0;
let countFails = 0;
let counter = 0;  
let toogle = false;
let toggleTimer = false;
let allTrue = false;
//---------------------Timer variables----------------------//
let sec = 0;
let seconds = document.getElementById("seconds")
let minutes = document.getElementById("minutes")
let setTimer;
//---------------------------------------------------------//

function accesGame(){
    window.user = document.getElementById('box').value;
    let preload = document.getElementById('main')
    let loading = 0;
    let indexPage = document.getElementById('main-container')

    if(toogle == true){ //Si la seccion 'main' es cargada por segunda vez.
        preload.style.transition = 'none'
        preload.style.transform = 'none'
        preload.style.animation = 'none'
        indexPage.style.display = 'none'
        preload.style.display = 'block'
        document.getElementById('card').classList.remove('flipped')
        toogle = false
    }else{// si es la primera vez que se carga el juego.

        if(user == null || user == ''){
        alert('Debes introducir un nombre!')
        
        }else{
            let id = setInterval(frame, 30);
            document.getElementById('card').classList.add('flipped')
            loadingMessage();
            document.getElementById('user-name').innerHTML = user
            function frame(){
                if(loading == 100) {
                    clearInterval(id);   
                    indexPage.style.display = 'flex'
                    preload.style.display = 'none'
                    toogle = true
                    
                }else{
                    loading++;
                    if(loading == 80) {
                        resetGame();
                        preload.style.animation = 'fadeout 1s ease' 
                        indexPage.style.animation = 'fadein 1s ease'
                    }
                }
            }
        } 
    }
}


//------------------Timer-StackOverflow------------------------//
function pad (val){ 
    return val > 9 ? val : "0" + val; 
}

function startTimer(){
     setTimer = setInterval(function(){
        seconds.innerHTML = pad(++sec % 60);// el resto/modulo de 60 es 0
        minutes.innerHTML = pad(parseInt(sec/60,10))
       },1000);       
};

function stopTimer(){
    clearInterval(setTimer);
};
//------------------------------------------------//
//----------------Start-Game----------------------//
document.getElementById('start').onclick = function(){
    startTimer();
    document.getElementById('show-question').innerHTML = arrCopy[counter].question;
    document.getElementById('start').style.display = 'none'  
}
//-----------------------------------------------//

function generateCircles(arg){
    let numOfCircles = 27
    let degAngl = 360 / numOfCircles;
    let wrapper = document.querySelector('.circle-container');
    let currAngle = 266.66;

    if(arg === 'clear'){
        wrapper.innerHTML = '';
        generateCircles();
    } else {
        for(let i = 0; i < numOfCircles; i++){
            let letters = questions[i].letter
            setTimeout(function(){
                wrapper.innerHTML +=  `<div id="${letters}" class="circle" style="animation: circle-fadein 2s ease; transform: rotate(${currAngle}deg) translate(250px) rotate(-${currAngle}deg)">${letters.toUpperCase()}</div>`
                
                currAngle = currAngle + degAngl;
            }, 500) 
        }
    }
}; 

function loadingMessage(){
    let load = document.getElementById('loading');
    setTimeout(function(){
        load.innerHTML += 'Hago'
    },500)
    setTimeout(function(){
        load.innerHTML += ' ver'
    },1000)
    setTimeout(function(){
        load.innerHTML += ' que'
    },1500)
    setTimeout(function(){
        load.innerHTML += ' cargo'
    },2000)
}

function addToScore(names, points, time, fails){

    let userInfo = {
        names: names,
        points: points,
        time: time,
        fails: fails, 
        status: 1
    }
    score.push(userInfo);
}


function startGame(){
    document.getElementById('show-question').innerHTML = arrCopy[counter].question;
}



function checkAnswer(){
    let currentAnswer = document.getElementById('answerInn').value;
    let letters = document.getElementById(`${arrCopy[counter].letter}`);
    let result = document.getElementById('result');
    let showHits= document.getElementById('res-aciertos');
    let showFails= document.getElementById('res-fallidos');

    result.innerHTML = '';

    if(currentAnswer.toLowerCase() === arrCopy[counter].answer){
        arrCopy[counter].status = 1;
        result.innerHTML = 'Correcto!'
        letters.style.background = '#71d6c5'
        letters.style.color = '#0050b3'
        letters.style.fontWeight = 'bold'
        countHits++
        showHits.innerHTML = countHits;
        counter++
    } else {
        arrCopy[counter].status = 1
        result.innerHTML = 'Incorrecto!'
        letters.style.background = '#FF1654'
        letters.style.color = '#0050b3'
        letters.style.fontWeight = 'bold'
        countFails++
        showFails.innerHTML = countFails;
        counter++ 
    }
    document.getElementById('answerInn').value = '';


    if(Object.values(arrCopy).every(value => value.status == 1) == true){
        let modalResult = document.getElementById('modal-result');
        let message = document.getElementById('your-result')
        let userScore = document.getElementById('user-score')
        let winGif = document.getElementsByClassName('img-gif')[0];
        let lostGif = document.getElementsByClassName('img-gif')[1];
        let msg = `${countHits < 14 ? 'Esto no es lo tuyo...' : 'Que Máquina!'}`

        stopTimer();
        addToScore(window.user, countHits, [minutes.innerHTML+':'+seconds.innerHTML], countFails);
        allTrue = true;
        message.innerHTML = '';
        userScore.innerHTML = '';
        winGif.style.display = 'none';
        lostGif.style.display = 'none';
        
        setTimeout(function(){
            modalResult.style.display = 'block'
            if(countHits > 13){
                message.innerHTML = `Muy bien jugado!`;
                winGif.style.display = 'block';
            }else{
                message.innerHTML = `Otro día será!`
                lostGif.style.display = 'block';
            }
            userScore.innerHTML = `<p><span class="user-score-color">${window.user}</span>, has acertado un total de <span class="user-score-color">${countHits}</span> preguntas<br/>en <span class="user-score-color">${minutes.innerHTML}:${seconds.innerHTML}</span> min. <span class="user-score-color">${msg}</span></p>`
        },1000)
        
        console.log('all true')
        
    }else{
        console.log('false')
        startGame(); 
    }
    
}

document.getElementById('answerInn').addEventListener('keydown', () => {
    if(event.key === 'Enter'){
        checkAnswer();
    }
}) 


function pasapalabra(){
    
    let output = document.getElementById('result')
    let letters = document.getElementById(`${arrCopy[counter].letter}`)
    let changeValueDescription = {info:`Object index: ${counter} with letter: ${Object.values(arrCopy[counter].letter)} has been moved to the last position`, status: 1}
   
    
    let copyObj = Object.assign(arrCopy[counter]); //Copia la propiedad del objecto [x].
    arrCopy[counter] = changeValueDescription  //sustituyo el valor de [x]
    arrCopy.push(copyObj); //envio la copia de [x] al final del array
    console.log(JSON.stringify(changeValueDescription))

    letters.style.background = 'rgba(245, 245, 245, 0.3)';
    letters.style.color = '#0050b3'
    letters.style.fontWeight = 'bold';
    letters.style.borderColor = '#2ac2f9'
    output.innerHTML = 'Pasando'
    counter++
    startGame();
} 


function pause(){
    let output = document.getElementById('result')
    if(toggleTimer == false){
        stopTimer();
        document.getElementById('answerInn').disabled = true;
        document.getElementById('submit').disabled = true;
        document.getElementById('pasa').disabled = true;
        toggleTimer = true;
        output.innerHTML = 'En pausa!'
    }else{
        startTimer();
        document.getElementById('answerInn').disabled = false;
        document.getElementById('submit').disabled = false;
        document.getElementById('pasa').disabled = false;
        toggleTimer = false;
        output.innerHTML = ''
    }
};
    
function resetGame(){
    if(allTrue == true){
        score.pop(); 
        allTrue = false;
    }
    document.getElementById('loading').innerHTML = '';
    generateCircles('clear');
    document.getElementById('show-question').innerHTML = '<p>Dale al <b>Start</b> para empezar</p>'
    document.getElementById('start').style.display = 'block';
    arrCopy.length = 0;
    arrCopy = Array.from(questions); 
    arrCopy.map(value => value.status = 0 )
    score.map(value => value.status = 0)
    countHits = 0;
    countFails = 0;
    counter = 0;  
    document.getElementById('res-aciertos').innerHTML = countHits;
    document.getElementById('res-fallidos').innerHTML = countFails;
    document.getElementById('result').innerHTML = '';
    stopTimer();
    sec = 0
    seconds.innerHTML = '00';
    minutes.innerHTML = '00';
}

function showScore(){
    document.getElementById('modal-score').style.display = 'block'
    let result = Object.values(score).sort((a, b) => b.points - a.points);
    let userScore = document.querySelector('.user-info--row')
    result.forEach((value, index) => userScore.innerHTML += `<tr class=${index % 2 == 0 ? "even" : "odd"} id=${value.status == 1 ? "current-user" : "nothing"}><td>${index + 1}</td><td>${value.names}</td><td>${value.points}</td><td>${value.fails}</td><td>${value.time}</td></tr>` )
}


function endGame(){
    let gif = document.getElementById('hastaLaVista')
    document.getElementById('main-container').style.display = 'none'
    gif.style.display = 'block'
    document.getElementById('leaveGame').style.display = 'block'
   
    setTimeout(function(){
        gif.style.display = 'none'
    },5000)

}


/*-----------Modal--behaviour---------------*/
window.onclick = function(event) {
    if(event.target == document.getElementById('modal-box')){
        document.getElementById('modal-box').style.display = 'none';
    } else if(event.target == document.getElementById('modal-result')){
        document.getElementById('modal-result').style.display = 'none';
    } else if(event.target == document.getElementById('modal-score')){
        document.getElementById('modal-score').style.display = 'none';
        document.querySelector('.user-info--row').innerHTML = '';
    }
}

document.getElementById('newGame').onclick = function(){
    accesGame();
    document.getElementById('modal-box').style.display = 'none';
}
document.getElementById('menu').onclick = function() {
    document.getElementById('modal-box').style.display = 'block'
}
document.getElementById('showScore').onclick = function(){
    showScore();
    document.getElementById('modal-box').style.display = 'none';
}
document.getElementById('resetGame').onclick = function() {
    resetGame();
    document.getElementById('modal-box').style.display = 'none'
}
document.getElementById('endGame').onclick = function() {
    endGame();
    document.getElementById('modal-box').style.display = 'none'
}
/*---------------------------------------------------*/





  
