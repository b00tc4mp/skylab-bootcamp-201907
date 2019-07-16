function forEach(array){
  for(i=0; i<array.length; i++){
    console.log(`The element of position ${[i]} is: ${array[i]}`)
  }
}

function forEach2(array, expression){
  for(i=0; i<array.length; i++){
    expression(array[i])
  }
}