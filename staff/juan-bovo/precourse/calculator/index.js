var num1 = 10;
var num2 = 3;
var results = [];

function calculator(num1, num2){
  if(typeof num1 !== 'number' && typeof num2 !== 'number'){
    let response = confirm('Solo acepto números.');
    if(response === true){
      calculator(num1, num2)
    } if(response === false){
      alert('Oh, lo lamento... ¡es que solo funciono con números!')
    }
  } else if (typeof num1 === 'number' && typeof num2 !== 'number'){
    return results.push('La potencia de ' + num1 + ' es ' + (num1 * num1));
  } else if (typeof num1 !== 'number' && typeof num2 === 'number'){
    return results.push('La potencia de ' + num2 + ' es ' + (num2 * num2));
  }
  let sum = addition(num1, num2);
  let difference = substraction(num1, num2);
  let product = multiplication(num1, num2);
  let quotient = division(num1, num2);
  function addition(num1, num2){
    let add = num1 + num2;
    return results.push(add);
  };
  function substraction(num1, num2){
    let rest = num1 - num2;
    return results.push(rest);
  };
  function multiplication(num1, num2){
    let multi = num1 * num2;
    return results.push(multi);
  }
  function division(num1, num2){
    let dividendo = num1 / num2;
    return results.push(dividendo);
  }
  return sum, difference, product, quotient;
}

calculator(num1, num2);
if(results.length === 1){
  console.log(results[0])
} else {
console.log('Resultados:\n' + 
num1 + ' + ' + num2+ ' = ' + Math.round(results[0]*1000) / 1000+'\n'+
num1 + ' - ' + num2+ ' = ' + Math.round(results[1]*1000) / 1000+'\n'+
num1 + ' x ' + num2+ ' = ' + Math.round(results[2]*1000) / 1000+'\n'+
num1 + ' % ' + num2+ ' = ' + Math.round(results[3]*1000) / 1000)};