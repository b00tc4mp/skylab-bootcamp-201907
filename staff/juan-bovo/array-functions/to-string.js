//A string representing the elements of the array.

//var array1 = [1, 2, 'a', '1a'];
// expected output: "1,2,a,1a"

//array1 = [1, 2, 'a', '1a'];

function toStringo(arr){
    if (arr === undefined) throw TypeError('No se puede leer la propiedad "length" de undefined');
    if (arr === null) throw TypeError ('No se puede convertir a string un objeto null');
    newstring = '';
    if (typeof arr === 'string'){
        newstring = arr;
    } else {
        for (i = 0; i < arr.length; i++){
            newstring = newstring + arr[i] + ',';
        };
        newstring = newstring.substring(0, (newstring.length-1))
    }
    return newstring;
};