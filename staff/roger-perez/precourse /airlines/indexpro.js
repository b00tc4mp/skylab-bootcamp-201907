let carton = [];
function rellenaCarton() {
    let aleat = 0;
    for (const i = 0; i < 15; i++) {
        do {
            aleat = randomNum();
        } while ( !carton.find( item => item === aleat) )
        carton.push(aleat);
    }
    console.log(carton);
}


function randomNum(){
   let numeroBombo = Math.floor((Math.random() * 50) + 1);
    return numeroBombo;
}

let random = randomNum();
let numSalidos = []
let fila1Mostrada = false; 
let fila2Mostrada = false;
let fila3Mostrada = false;
let continuar = false ;

function turno(){
    carton.forEach(function(item,index){
    if (item == random){
        carton[index] = "X"
        
        };
    })


    let mensaje = confirm(` Ha salido ${random}, tu cartón de momento va asi: ${carton}. Quieres seguir?`);

    if(mensaje == false){return false;
    }

let fila1 = carton.slice(0, 5);
let fila2 = carton.slice(5, 10);
let fila3 = carton.slice(10, 15);
let isLinea1 = fila1.every(checkNumero);
let isLinea2 = fila2.every(checkNumero);
let isLinea3 = fila3.every(checkNumero);
let isCarton = carton.every(checkNumero);
    
    if(isLinea1 && !fila1Mostrada){
        alert(`Linea! 1 ${carton}`);
         fila1Mostrada = true ;
    }
    if(isLinea2 && !fila2Mostrada){
        alert(`Linea! 2 ${carton}`);
         fila2Mostrada = true ;
    }
    if(isLinea3 && !fila3Mostrada){
        alert(`Linea! 3 ${carton}`);
         fila3Mostrada = true ;
    }
    if(isCarton){alert(`BINGO! ${carton}`) 
        return false ;
    } 
    random = randomNum();
}

function checkNumero(elemento){
    if(elemento !== "X"){
        return false;
    }
    else{
        return true;
    }
}

function partida(){
    do{
    continuar = turno();  }

    while(continuar != false);}

function checkNumeroSal(elemento){
    for(let i = 0 ; i < numSalidos.length ; i++){
        if(elemento === numSalidos[i]){
        return true
        }
    }
     return false
 
}

function añadirNumerosSalidos(){

    const random = randomNum();


    if(checkNumeroSal(random) === false){
        numSalidos.push(random);
        partida();

    } 
   else {
   random = randomNum();
    añadirNumerosSalidos();}
}

function play(){
    let nombre = prompt('dime tu nombre');
    rellenaCarton();
    alert(`Hola ${nombre}, binevenido al Bingo, tu cartón es: ${carton}`);
    añadirNumerosSalidos();
    let otra = confirm('Otra partida?');
    if (otra == true){
       carton = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
       carton = carton.sort(function() {return Math.random() - 0.5});
        play()}

    else{alert('Espero que te haya gustado la partida');} 
    }

play()