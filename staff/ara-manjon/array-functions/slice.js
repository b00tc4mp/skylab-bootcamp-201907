/**
 * Method returns a string representing the specified array and its elements
 * @param {*} arr The array to changes.
 * 
 */


function toString() {

    var result = '';
    for (var i = 0; i < this.length; i++){
        result = result + this[i] + ',';
    };
    result = result.substring(0, (result.length-1))

    return result;
};
