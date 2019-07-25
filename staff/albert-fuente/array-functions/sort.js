function sort(arr,expression){
  for(var i=0;i<arr.length-1;i++){
    var a=arr[i];
    var b=arr[i+1];
    if(expression(a,b)>0|| expression(a,b)===1){
      arr[i]=b;
      arr[i+1]=a;
    }else{
      arr[i]=a;
      arr[i+1]=b;

    }
  }
  for (var i = 0; i < arr.length; i++) {
    var a = arr[i];
    var b = arr[i+1];
    if (expression(a,b) > 0 || expression(a,b) === 1) {
        arr.sort(expression)
    }
}

return arr;

}




// var frutas = ['guindas', 'manzanas', 'bananas'];
// frutas.sort(); // ['bananas', 'guindas', 'manzanas']
//
// var puntos = [1, 10, 2, 21];
// puntos.sort(); // [1, 10, 2, 21]
// // Tenga en cuenta que 10 viene antes que 2
// // porque '10' viene antes que '2' según la posición del valor Unicode.
