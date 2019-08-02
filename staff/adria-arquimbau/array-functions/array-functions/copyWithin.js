function arrayWithin(array, target, start) {

/*     if (arguments.length === 0) throw TypeError('missing argument 0 when calling function arrayWithin');

    if (!(array instanceof Array)) throw TypeError('1 is not an array'); */


        array[target] = array[start];

    return array;
} 