
function filter(array, expression) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function filter');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  
var newarray=[];
var j=0;
    for(var i=0;i<array.length;i++) {

        if(expression(array[i])){
            
            newarray[j]=array[i];
            
            j++;

         }
    }  return newarray;
}


