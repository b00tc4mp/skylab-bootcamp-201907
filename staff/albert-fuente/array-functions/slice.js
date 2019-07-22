function slice(arr,begin,end){
  begin=Math.abs(begin);
  end=Math.abs(end);
  var result=[];
  for(var i=begin;i<end;i++){
    result.push(arr[i]);
  }
  return result;
}


// var nombres = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
// var masculinos = nombres.slice(1, 3);

// masculinos contiene ['Pedro','Miguel']
