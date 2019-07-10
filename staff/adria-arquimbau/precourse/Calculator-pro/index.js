var result = ['Resultados: '];

function calculatorPro(nums){
    if(nums.length>1){
            let calculoSum = 0;
            for (num in nums){
                calculoSum += nums[num];  
            }
            let sum =+ calculoSum.toFixed(3); //perque es fica entre parentesis (calculoSum).toFixed(3);), e provat i funciona igual
            let sumFinal = ' La suma es ' + sum + ' '; 
            result[1] = sumFinal;

            let calculoRest = nums[0]; 
            for(let i=1; i<nums.length; i++){
                calculoRest -= nums[i];
            }
            let rest =+ calculoRest.toFixed(3);
            let restFinal = ' La resta es ' + rest + ' ';
            result[2] = restFinal;

            let calculoMult = 1;
            for (num in nums){
                calculoMult *= nums[num];
            }
            let mult =+ calculoMult.toFixed(3);
            let multFinal = ' La multiplicacion es ' + mult + ' ';
            result[3] = multFinal;

            let calculoDiv = nums[0];
            for (let j=1; j < nums.length; j++) {
                calculoDiv /= nums[j];
            }
            let div =+ calculoDiv.toFixed(3);
            let divFinal = ' La division es ' + div + ' ';
            result[4] = divFinal;
            alert(result);
           // console.log(result); // provar amb return result;

        } else if(nums.length === 1) {
            let numRaiz = Math.sqrt(nums);
            numRaiz =+ numRaiz.toFixed(3);
            alert(' La raiz cuadrada de ' + nums +' es ' + numRaiz); //amb el alert em funciona el return, sense te de ser el console.log wtf
                return numRaiz;
                //console.log(numRaiz);
        } else {
            alert('Tienes que introducir uno o más numeros');
        }
    }
                    
                    //un else per un NaN
                    

      function preguntaCalculator() { //Sense la pregunta no em funciona, i mirar de canviar i fer que reboti cada cop que acabem la operacio
        let num = prompt('Introduce los numeros que quieres calcular separados por comas');
            if(num.length === 0){
                alert('Tienes que introducir uno o más numeros');
                    preguntaCalculator();
            } else {
          num = num.split(",").map(Number);	
          calculatorPro(num);

        let response = confirm('Desea realizar otro calculo?');
        if (response === true){
            preguntaCalculator();
        } else {
            alert('Hasta luegito!');
        }
      }
      }
      
      preguntaCalculator();