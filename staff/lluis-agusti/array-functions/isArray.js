function isArray(array) {

    if (arguments.length === 0) throw TypeError ("esta empty, fistro!");

    if (!(array instanceof Array)) throw TypeError ("ne c'est pas un array, fistro!");


    if (array && typeof array === 'object' && array.constructor === Array){
        return true;
    }else{
        return false;
    }
}



//instanceof es como check el array.constructor