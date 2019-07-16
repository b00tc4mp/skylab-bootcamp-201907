function calculatorPro(){

    var resultSum, resultRest, resultMult, resultDiv;
    var results = [];
    var resultados= [];
    
        
    askNumbers();
    
  
    
    
    
     function calculator(){ 
     
     var args = [].slice.call(arguments);
     
       
     
      if (args.length === 1 && typeof args[0]==='number' ){
         console.log( Math.sqrt(args[0]));
      
     } else if (args.some(isNaN)){
         console.log('You need to pass a number');
      
     }   else {    
        
      
     
          resultSum = sum();
          resultRest= rest(); 
          resultMult= mult();
          resultDiv= div();
         
         
         function sum() {
             
           let acc=0;
           let acc2 = [];
           let acc3 = [];
         
             for (num in args) {
                     
                 acc += args[num];
                 acc2.push(args[num]);
                 acc3 = acc2.join('+');
             }    
             
             return  [`${acc3} = ${acc}`];
          } 
          function rest() {
     
             let acc = args[0] * 2;
             let acc2 = [];
             let acc3 = [];
             //Inicializo la variable al doble del pimer valor para que la primera vez que pase el bucle  por el primer valor
             // se reste la mitad a su doble para poder comenzar a restar los siguientes valores que se pasen como argumentos
             
              
             for (num in args) {
                   
                 acc -= args[num];
                 acc2.push(args[num]);
                 acc3 = acc2.join('-');
             }
         
             return  [`${acc3} = ${acc}`];
         } 
      
         function mult() {
             let acc = 1;
             let acc2 = [];
             let acc3 = [];
             //Inicializo la variable a 1 para que la primera vez que pase el bucle el primer valor se multiplique por si mismo
             //y así pueda "comenzar" a multiplicarse por los demás argumentos que reciba la función
         
             for (num in args) {
            
                 acc *= args[num];
                 acc2.push(args[num]);
                 acc3 = acc2.join('*');
             }
         
             return  [`${acc3} = ${acc}`];
         }
        function div() {
             let acc = args[0] * args[0];
             let acc2 = [];
             let acc3 = [];
             //Inicializo la variable al primer valor por si mismo, para que la primera vez que pase el bucle el primer valor 
             //se divida por si mismo y así pueda "comenzar" a dividirse por los demás argumentos que reciba la función
             
         
             for (num in args) {
                   
                 acc /= args[num];
                 acc2.push(args[num]);
                 acc3 = acc2.join('/');
    
            }
             acc = +acc.toFixed(3);
             return  [`${acc3} = ${acc}`];
            
         } 
     
       
       return   [resultSum, resultRest, resultMult,resultDiv];
      
      
  
     }    
     }
    
       //Función pide números con prompt
     
    function askNumbers (){
        let answer = prompt("New numbers? y/n");
     
         switch (answer) {
             
             case 'y':
            
             var arr=[];
             var input = prompt('Enter numbers separated by commas:');
             var values = input.split(',');
     
             for (var i = 0; i < values.length; i++){
                arr.push(Number(values[i]));
                
             }
             
            
          
            
            resultados = calculator.apply(null, arr);
            results.push(resultados);
            
            for (var i = 0; i < results.length; i++){
               for (var j=0; j < results[i].length; j++){
                console.log(results[i][j]);
               }
             }
            
            askNumbers();
    
    
             break;
             
         
             case 'n':
             console.log('Bye!');
             break;
         
         }
     
        
    }               
    
     
    
         
    
    }