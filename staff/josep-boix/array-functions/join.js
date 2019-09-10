function join (array, separator){
    if (arguments.length === 0) throw TypeError ("There's nothing to join man")
    if (!(array instanceof Array)) throw TypeError(array +' is not an array');
    
    if (separator == undefined) separator = ',';
    // if (arguments.length === 1) separator = ','
    if (!(separator instanceof String)) separator = separator.toString();
    if (separator = 0 && separator == null) separator = ',';
    if (array.length = 1) return array[0].toString; 

    var cadena = '';
    for( var i = 0 ; i<array.length;i++){
        if (array[i] === undefined || array[i] === null)  array[i]="#";
        if (i>0) cadena += separator + array[i];
        else cadena += array[i];
    }
//console.log (cadena)
return cadena    
}