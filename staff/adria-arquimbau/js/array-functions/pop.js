function pop(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');



    var last = array[array.length - 1];
    array.length = array.length - 1;
    return last;
    console.log(array);
}