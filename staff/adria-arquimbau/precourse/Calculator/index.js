var result = ['Resultados: '];
function calculadora(num1,num2){
    if(typeof num1 === 'number' && typeof num2 === 'number'){
        let suma = num1 + num2;
            suma =+ suma.toFixed(3); 
        let resta = num1 - num2;
            resta =+ resta.toFixed(3); 
        let multiplicacio = num1 * num2;
            multiplicacio =+ multiplicacio.toFixed(3);
        let divisio = num1 / num2;
            divisio =+ divisio.toFixed(3);
            let resultSuma = `${num1}+${num2}=${suma}`
            let resultResta = `${num1}-${num2}=${resta}`
            let resultMultiplicacio = `${num1}*${num2}=${multiplicacio}`
            let resultDivisio = `${num1}/${num2}=${divisio}`   
        result[1] = resultSuma;
        result[2] = resultResta;
        result[3] = resultMultiplicacio;
        result[4] = resultDivisio;
                    return result;
        } else if (typeof num1 != 'number'){        
            let num2Raiz = Math.sqrt(num2);
            num2Raiz =+ num2Raiz.toFixed(3);
                return num2Raiz;
        } else if (typeof num2 != 'number'){
            let num1Raiz = Math.sqrt(num1);
            num1Raiz =+ num1Raiz.toFixed(3);
                alert('La raiz cuadrada de este numero es ' + num1Raiz);
                return num1Raiz;
        } else {
            alert('Tienes que introducir numeros dude!');
           // console.log('Tienes que introducir numeros dude!');
    }
}

calculadora()