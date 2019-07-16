
var rankingUsers= [];

function bingo(){


    var carton = [];
    var carton1 = [];
    var carton2 = [];
    var carton3 = []; 
    var diferentNumbersCarton;
    var randomNum = 0;
    var randomNumNew = [];
    var keepPlaying;
    var contBingos=0;
    var nextCarton;
    var numberTurns=0;
    var points= 0;
    var name;
    


    userName();
    
   
   
    
        function userName(){

            name = prompt('¿Cuál es tu nombre?');
           
            console.log(`¡Hola ${name}!`)

            //Sistema de puntos
            console.log(`El sistema de puntos es el siguiente: 
                    Hacer el cartón en menos de 50 turnos: 50 puntos
                    Hacer el cartón entre 50 y 100 turnos: 25 puntos
                    Hacer el cartón entre 100 y 150 turnos: 10 puntos
                    Hacer el cartón en más de 150 turnos: 5 puntos
                    `);
                    
             firstTurn();
             
            }
    
        function firstTurn(){
        
        //asigno los 99 números random al array carton
        carton = numberRandomCarton();
    
        //sacar los números diferentes de carton en array diferente 
        diferentNumbersCarton = [...(new Set(carton))];
         
        //asigno a randomNum un número entre 1 y 99 para el turno
        randomNum = numberRandom(1,99);
          
        //separo en tres arrays los 15 números para que tenga aspecto de cartón real de bingo y poder hacer lo de las líneas
        carton1 = diferentNumbersCarton.slice(0,5);
        carton2 = diferentNumbersCarton.slice(5,10);
        carton3 = diferentNumbersCarton.slice(10,15);
        
    
        console.log(`Tu carton es: \n ${carton1} \n ${carton2} \n ${carton3} `);
           
      

      
        agreeCarton();  


        
        
        }
        
      
        //prompt para cumplir el requisito del punto 1 de la parte pro
        function agreeCarton(){

            nextCarton= prompt('¿Quieres este cartón? yes/no')

            switch (nextCarton){
                case 'yes':
                newTurn();
                break;
                case 'no':
                carton = [];
                carton1 = [];
                carton2 = [];
                carton3 = []; 
                firstTurn();
                break;
                default:
                console.log('Tienes que poner yes o no');
                agreeCarton();
                break;
            }
        }
    
        // Generar Numero Random Bombo
        function numberRandom(min, max) {
            return Math.floor(Math.random() * (max-min) + min); 
            
        }
        
    
        //Generar un número random entre 0 y 99 y asignarlo a carton
        function numberRandomCarton(){
    
            //Añadir en un array 100 números. SE pasa 100 veces para que haya la posibilidad de que estén los primeros 15 números en el array
    
             for (var i= 0; i< 100 ; i ++){
                carton.push(numberRandom(1,99));
            }
           
            return carton; 
    
           
        }
    
    
        //Nuevo turno 
        function newTurn() {
    
          

            //guardo todos los números random en un array para comprobar que no se repita 
            randomNumNew.push(randomNum);

            //asigno a randomNum un número entre 1 y 99 para el turno
            randomNum = numberRandom(1,99);
             
            //función para comprobar si los 3 arrays todos tienen añadido el X para la línea   
             function isLine (currentValue){
                                    
                return currentValue === 'X';
                    
            }


           //comprobar que no se repita el número random. Si se repite, volver a llamar a la función newturn
                           
            if (randomNumNew.includes(randomNum)){
                newTurn();
            } else {
                
             console.log('El número que hemos sacado de la bolsa es: ' + randomNum);
                
             //si los tres arrays son X es bingo. Utilizo la función isLine para saber si son todos X
                if (carton1.every(isLine) && carton2.every(isLine) && carton3.every(isLine)){
                   
                    sumBingos();
                    
    
                }else {

                    numberTurns ++;

                    if (carton1.includes(randomNum)){
                        console.log(`El número ${randomNum} está en el cartón`);
                        
                        //Encontrar el índice del número random 
                        let index1 = carton1.findIndex(cartons => cartons === randomNum);
                        //console.log(index); 
    
                        //Sustituir el número encontrado por X
                        carton1[index1]= 'X';
                        console.log(`Tu carton es: \n ${carton1} \n ${carton2} \n ${carton3} `);
                        
                             if (carton1.every(isLine) && carton2.every(isLine) && carton3.every(isLine)){
                    
                                sumBingos();
                             } else{
                               if (!carton2.every(isLine) && !carton3.every(isLine)){
                                    if (carton1.every(isLine)){
                                        console.log('linea en la primera línea');
                                        askNewTurn();
                                        } else {
                                            askNewTurn();
                                        }
                                    } else {
                                        askNewTurn();
                                    }
                                } 
                            
                       // askNewTurn();
    
                    } else if (carton2.includes(randomNum)) {
    
                            console.log(`El número ${randomNum} está en el cartón`);
                            
                            //Encontrar el índice del número random 
                            let index2 = carton2.findIndex(cartons => cartons === randomNum);
                            //console.log(index); 
    
                            //Sustituir el número encontrado por X
                            carton2[index2]= 'X';
                            console.log(`Tu carton es: \n ${carton1} \n ${carton2} \n ${carton3} `);
                           
                            if (carton1.every(isLine) && carton2.every(isLine) && carton3.every(isLine)){
                    
                                sumBingos();
                            }else {
                                    if (!carton1.every(isLine) && !carton3.every(isLine)){
                                        if (carton2.every(isLine)){
                                            console.log('linea en la segunda línea');
                                            askNewTurn();
                                            } else {
                                                askNewTurn();
                                            }
                                        } else {
                                            askNewTurn();
                                        }
                                    }     
                            
    
                    } else if (carton3.includes(randomNum)){
    
                                console.log(`El número ${randomNum} está en el cartón`);
                                
                                //Encontrar el índice del número random 
                                let index3 = carton3.findIndex(cartons => cartons === randomNum);
                                //console.log(index); 
    
                                //Sustituir el número encontrado por X
                                carton3[index3]= 'X';
                                console.log(`Tu carton es: \n ${carton1} \n ${carton2} \n ${carton3} `);
                                
                                if (carton1.every(isLine) && carton2.every(isLine) && carton3.every(isLine)){
                    
                                    sumBingos();
                                } else {
                            
                                    if (!carton1.every(isLine) && !carton2.every(isLine)){
                                            if (carton3.every(isLine)){
                                                console.log('linea en la tercera línea');
                                                askNewTurn();
                                                } else {
                                                    askNewTurn();
                                                }
                                            } else {
                                                askNewTurn();
                                            }
                                        }
                    } 
                    else {
                        console.log('El número ' + randomNum + ' no está en tu cartón');
                        askNewTurn();
                    }
                }
             
            }
            
            
        }
    
        //Preguntar Nuevo Turno
        function askNewTurn() {
    
            var response= confirm ('¿Quieres seguir jugando?')
            
            if (response === true ) {
                console.log ('De acuerdo, sigamos');
                 newTurn();
                 
                 
                } else {
                    console.log('Bye!');
                
                }
               
           } 
    
    
           //función prompt para seguir jugando
           function keeping(){
            
            keepPlaying= prompt('¿Quieres seguir jugando ' + name + ' ? yes/no');

            switch(keepPlaying){
                case 'yes': 
               
                firstTurn();
                break;
    
                case  'no':
                rankingUsers.push({name, points});
                rankingUsers.forEach(function (elemento) {
                    console.log(elemento);
                });
                
                console.log('Bye! ' + name);
               
                break;
    
                default:
                console.log('Tienes que poner yes o no');
                keeping();
                break;
            }
        }
    
            function sumBingos(){
                
                console.log ('Bingo. Se acabó el juego!');
               
            
                contBingos++;
                console.log ('Has hecho ' + contBingos + ' Bingos');
                console.log('¡Has hecho el bingo en '+ numberTurns + ' turnos!');
                
                countBingos();
                numberTurns=0;
                randomNumNew=[];
                keeping();
                
            }
            
        
            function countBingos(){
                if (numberTurns < 50){
                    points +=50;
                    console.log('Acabas de sumar 50 puntos. Actualmente tienes ' + points + ' puntos');
                
                } else if (numberTurns > 50 && numberTurns < 100){
                    points +=25;
                    console.log('Acabas de sumar 25 puntos. Actualmente tienes ' + points + ' puntos');
                } else if (numberTurns >100 &&  numberTurns < 150){
                    points +=10;
                    console.log('Acabas de sumar 10 puntos. Actualmente tienes ' + points + ' puntos');
                } else {
                    points +=5;
                    console.log('Acabas de sumar 5 puntos. Actualmente tienes ' + points + ' puntos');
                } 

            }

    
    } 