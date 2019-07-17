function flat(array){
    if(!(array instanceof Array)) throw TypeError(array + 'is not an array');

    var depth = arguments[1] || 1; /* si no es arguments[1] se queda con un depth de 1 */

    var result = [];

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        if (depth > 0)
            if (element instanceof Array) {
                for (let j = 0; j < element.length; j++) {
                    result.push(element[j]);
                    
                }
            }
        else result.push(element);
        
    }
    return result;
}