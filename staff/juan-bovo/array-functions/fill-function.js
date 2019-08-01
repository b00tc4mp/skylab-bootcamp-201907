/**
 * Fill index positions with a given string, a number or an array-like object.
 * 
 * @param {Array} arr The array to be filled.
 * @param {*} value The given value to fill the array.
 * @param {number} start (optional) Array's index position to begin filling, default 0.
 * @param {number} end (optional) Array's index posistion to end filling, default array.length.
 * 
 * @throws {TypeError} when first input is not an array.
 * @throws {TypeError} when first parameter is not an array.
 * @throws {TypeError} when start parameter (optional) is not a natural number.
 * @throws {TypeError} when end parameter (optional) is not a natural number.
 * 
 * @returns new array.
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
