function isArray(array) {
    if (array && typeof array === 'object' && array.constructor === Array){
        return true;
    }else{
        return false;
    }
} 



//instanceof es como check el array.constructor