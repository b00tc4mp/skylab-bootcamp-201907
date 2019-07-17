function forEach(arr, expression){
    for(i = 0; i < arr.length; i++){
      expression(arr[i], i, arr);
    }
  }