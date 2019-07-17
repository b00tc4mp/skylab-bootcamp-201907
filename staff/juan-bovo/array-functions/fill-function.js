/**
 * Fill index positions with a given string, a number or an object.
 * 
 * @throws {TypeError} when first input is not an array.
 * @throws {TypeError}
 * @throws {TypeError}
 * @throws {TypeError}
 * 
 * @param {*} arr 
 * @param {*} value 
 * @param {*} start 
 * @param {*} end 
 * 
 * @version 3.0.0
 */

// array1 = [1, 2, 3, 4];

function filljuan(arr, value, start, end) {
    if (arguments.length === 0) throw TypeError('filljuan debe contener al menos un array y un caracter');
    if (!(arr instanceof Array)) throw TypeError('filljuan necesita que el primer parámetro sea un array');
    if (start && typeof start !== 'number') throw TypeError('la posición inicial debe ser un número entero válido');
    if (end && typeof end !== 'number') throw TypeError('la posición final debe ser un número entero válido');

    var newArray = arr;
    if (end) {
        for (var i = start; i < end; i++) {
            newArray[i] = value;
        }
    } else if (start) {
        for (var i = start; i < arr.length; i++){
            newArray[i] = value;
        }
    } else {
        for (i = 0; i< arr.length; i++){
            newArray[i] = value;
        }
    }
    return newArray;
}

// console.log(fill(array1, 0, 2, 4)); // expected output: [1, 2, 0, 0]
// console.log(fill(array1, 5, 1)); // expected output: [1, 5, 5, 5]
// console.log(fill(array1, 6)); // expected output: [6, 6, 6, 6]