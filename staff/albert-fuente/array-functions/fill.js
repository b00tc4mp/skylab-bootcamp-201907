function fill(arr,numberWanted,fromFill,toFill){
  if(arr==undefined || numberWanted==undefined || fromFill==undefined || toFill==undefined)throw ReferenceError ("Faltan parametros")



  for(var i=fromFill;i<=toFill;i++){
    arr[i]=numberWanted;
  }
  return arr

}






// var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
// console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
// console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]
