function isArray(array) {
    if(arguments.length=== 0) throw TypeError ("No hay nada🤷‍")

    if(!(array instanceof Array)) throw TypeError ("Variable no definida");

    if (array && typeof array === 'object' && array.constructor === Array){
        return true;
    
    }else{
        return false;
    }

} 