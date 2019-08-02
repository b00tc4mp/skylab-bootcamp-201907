function forEach(array){
    for(i=0; i<array.length; i++){
      console.log(`The element of position ${[i]} is: ${array[i]}`)
    }
  }

function forEach2(array, expression){
  for (var i = 0; array.length; i++)
    expression(array[1]);
}


/* EXPRESSION equivale a una funcion, la que está aquí: 
  forEach(array2, console.log);
  equivalente a ...console.log... (console.log es una función)
*/

/* EXPRESSION equivale a una funcion, la que está aquí: 
  var result = 0;
  forEach2(array2, function(value){
  result += value;
  });
  equivalente a ...function(value){
                    result += value;}...
*/