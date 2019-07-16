/* function forEach2(array){
  for(i=0; i<array.length; i++){
    console.log(`The element of position ${[i]} is: ${array[i]}`)
  }
}
 */
function forEach(array, expression) {
  for (var i = 0; i < array.length; i++)
      expression(array[i], i, array);
}