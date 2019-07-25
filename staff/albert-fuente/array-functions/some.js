// The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. 

function some(array, expression){
    var count=0;
    for(var i=0;i<array.length;i++){
        if(expression(array[i])){
            return true;
        }
    }
    for(var j=0;j<array.length;j++){
        if(!expression(array[j])){
            return false;
        }
    }


} 