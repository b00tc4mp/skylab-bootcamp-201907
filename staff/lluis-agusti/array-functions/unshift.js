var funshift = function(array, value) { 
    for (var i = array.length - 1; i >=0; i--) {
       array[i +1] = array[i];
    }
    array[0] = item;
};
funshift();